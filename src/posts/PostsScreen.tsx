import React, {useState, useEffect, useCallback} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';

import PostItem from './PostItem';
import {hashtagHotList, postCommunity, postFollowing} from '../data/Posts';
import colors from '../base/utils/colors';
import {Post} from '../base/types/post';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  BottomTabNavigationProp,
  BottomTabRouteProp,
  RootNavigationProp,
  Routes,
} from '../base/types/navigation';
import {useNavigation} from '@react-navigation/native';
import {Hashtag} from '../base/types/post';
import {firebase} from '@react-native-firebase/database';
import PostImageList from './PostImageList';

interface PostScreenProps {
  navigation: BottomTabNavigationProp<Routes.Posts>;
  route: BottomTabRouteProp<Routes.Posts>;
}

export type OptionComponentProps = {
  option: Option;
  setOption: React.Dispatch<React.SetStateAction<Option>>;
};

export type HashtagHotProps = {
  hashtagsHot: Hashtag[];
  navigation: RootNavigationProp<Routes.BottomTab>;
  postsCommunity: Post[];
};

enum Option {
  FOLLOWING = 'Following',
  COMMUNITY = 'Community',
}

const PostsScreen: React.FC<PostScreenProps> = props => {
  const navigation = useNavigation<RootNavigationProp<Routes.BottomTab>>();
  const [option, setOption] = useState(Option.COMMUNITY);
  const [postsCommunity, setPostsCommunity] = useState<Post[]>();
  const [postsFollowing, setPostsFollowing] = useState<Post[]>();
  const [refreshing, setRefreshing] = React.useState(false);
  const [hotHashtags, setHotHashtag] = useState<Hashtag[]>([]);

  const getHashtag = useCallback(async () => {
    try {
      await firebase
        .app()
        .database('https://post-app-505ea-default-rtdb.firebaseio.com/')
        .ref(`/hashtag`)
        .limitToFirst(6)
        .once('value')
        .then(async snapshot => {
          const hashtagObject = snapshot.val();
          const hashtagArray: Hashtag[] = Object.keys(hashtagObject).map(
            eachKey => {
              let eachObject = hashtagObject[eachKey];
              return {
                hashtag: eachObject.hashtag,
                count: eachObject.count,
                lastTimestamp: eachObject.lastTimestamp,
              };
            },
          );
          setHotHashtag(hashtagArray);
        });
    } catch (e) {}
  }, []);

  const getPostCommunity = useCallback(async () => {
    try {
      await firebase
        .app()
        .database('https://post-app-505ea-default-rtdb.firebaseio.com/')
        .ref(`allPosts`)
        .once('value')
        .then(async snapshot => {
          const postsObject = snapshot.val();
          const postsArray: Post[] = Object.keys(postsObject)
            .map(eachKey => {
              let eachObject = postsObject[eachKey];
              return {
                id: eachObject.id,
                title: eachObject.title,
                cap: eachObject.cap,
                images: eachObject.images,
                hashtag: eachObject.hashtag,
                classification: eachObject.classification,
                timestamp: eachObject.timestamp,
                like: eachObject.like === undefined ? [] : eachObject.like,
                comment:
                  eachObject.comment === undefined ? [] : eachObject.comment,
                owner: eachObject.owner,
              };
            })
            .sort((item1, item2) => -item1.timestamp + item2.timestamp);
          setPostsCommunity(postsArray);
          setRefreshing(false);
        });
    } catch (e) {}
  }, []);

  const getPostFollowing = useCallback(() => {
    setPostsFollowing(postFollowing);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const refreshDataCommunity = React.useCallback(() => {
    setPostsCommunity([]);
    setRefreshing(true);
    getPostCommunity();
  }, []);

  const refreshDataFollowing = React.useCallback(() => {
    setPostsFollowing([]);
    setRefreshing(true);
    getPostFollowing();
  }, []);

  const renderRefreshCommunityControl = () => {
    return (
      <RefreshControl
        refreshing={refreshing}
        onRefresh={refreshDataCommunity}
      />
    );
  };

  const renderRefreshFollowingControl = () => {
    return (
      <RefreshControl
        refreshing={refreshing}
        onRefresh={refreshDataFollowing}
      />
    );
  };

  useEffect(() => {
    getHashtag();
    if (option === Option.COMMUNITY) {
      getPostCommunity();
    } else {
      getPostFollowing();
    }
  }, [option, getPostCommunity, getPostFollowing, getHashtag]);

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <OptionComponent option={option} setOption={setOption} />

      <HashtagHot
        hashtagsHot={hotHashtags}
        navigation={navigation}
        postsCommunity={postsCommunity!}
      />

      {option === Option.COMMUNITY && (
        <FlatList
          data={postsCommunity}
          renderItem={({item}) => <PostItem post={item} />}
          keyExtractor={item => item.id}
          refreshControl={renderRefreshCommunityControl()}
          showsVerticalScrollIndicator={false}
        />
      )}
      {option === Option.FOLLOWING && (
        <FlatList
          data={postsFollowing}
          renderItem={({item}) => <PostItem post={item} />}
          keyExtractor={item => item.id}
          refreshControl={renderRefreshFollowingControl()}
          showsVerticalScrollIndicator={false}
        />
      )}
      <TouchableOpacity
        style={[styles.addPostContainer]}
        onPress={() => {
          navigation.navigate(Routes.CreatePost, {});
        }}>
        <Icon name="plus" size={25} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const HashtagHot: React.FC<HashtagHotProps> = ({
  hashtagsHot,
  navigation,
  postsCommunity,
}) => {
  const onPressHashtag = (item: string) => {
    navigation.navigate(Routes.Search, {
      hashtagSearch: item,
      posts: postsCommunity,
    });
  };
  const renderHashtagHotItem = ({item}: {item: Hashtag}) => {
    return (
      <TouchableOpacity
        style={styles.hashtagContainer}
        onPress={() => onPressHashtag(item.hashtag)}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.iconHashtag}>
            <Icon name="hashtag" size={18} color={'#647ef7'} />
          </View>
          <View>
            <Text style={styles.hashtagText}>{item.hashtag}</Text>
            <Text style={{marginBottom: 6}}>{item.count} bài viết</Text>
          </View>
        </View>
        <View></View>
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <View style={{paddingHorizontal: 25}}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '700',
            marginTop: 20,
            marginBottom: 10,
            color: colors.marsBlack,
          }}>
          Chủ đề Hot
        </Text>
        <FlatList
          data={hashtagsHot}
          renderItem={renderHashtagHotItem}
          horizontal
        />
      </View>
      <View style={{height: 1, backgroundColor: '#F1F1F1', marginTop: 20}} />
    </View>
  );
};

const OptionComponent: React.FC<OptionComponentProps> = ({
  option,
  setOption,
}) => {
  return (
    <View style={styles.option}>
      <TouchableOpacity
        style={styles.buttonOption}
        onPress={() => {
          setOption(Option.FOLLOWING);
        }}
        disabled={option === Option.FOLLOWING}
        activeOpacity={0.8}>
        {option === Option.FOLLOWING ? (
          <Text style={styles.textOptionSelected}>Following</Text>
        ) : (
          <Text style={styles.textOption}>Following</Text>
        )}
        {option === Option.FOLLOWING && <View style={styles.underlineSelect} />}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonOption}
        onPress={() => {
          setOption(Option.COMMUNITY);
        }}
        disabled={option === Option.COMMUNITY}
        activeOpacity={0.8}>
        {option === Option.COMMUNITY ? (
          <Text style={styles.textOptionSelected}>Community</Text>
        ) : (
          <Text style={styles.textOption}>Community</Text>
        )}
        {option === Option.COMMUNITY && <View style={styles.underlineSelect} />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  option: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
  },

  buttonOption: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textOption: {
    fontSize: 16,
    fontWeight: '600',
  },
  textOptionSelected: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.marsBlack,
  },
  underlineSelect: {
    height: 2,
    width: '70%',
    backgroundColor: colors.inactive,
    position: 'absolute',
    bottom: 0,
  },
  addPostContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 50,
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  elevation: {
    elevation: 20,
    shadowColor: '#52006A',
  },
  addPostIcon: {
    fontSize: 50,
    fontWeight: '600',
    alignContent: 'center',
  },
  hashtagContainer: {
    backgroundColor: '#f6f7fb',
    paddingVertical: 5,
    paddingRight: 15,
    paddingLeft: 10,
    marginRight: 10,
    borderRadius: 12,
  },
  iconHashtag: {
    height: 25,
    aspectRatio: 1,
    borderRadius: 25,
    backgroundColor: '#f6f7fb',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  hashtagText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.marsBlack,
  },
});

export default PostsScreen;
