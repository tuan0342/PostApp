import {
  FlatList,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputSubmitEditingEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  BottomTabNavigationProp,
  BottomTabRouteProp,
  Routes,
} from '../base/types/navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import distances from '../base/utils/distances';
import colors from '../base/utils/colors';
import {hashtagHotList} from '../data/Posts';
import HashtagRecommendItem from './HashtagRecommendItem';
import {Hashtag, Post} from '../base/types/post';
import {postCommunity} from '../data/Posts';
import PostItem from '../posts/PostItem';

interface SearchScreenProps {
  navigation: BottomTabNavigationProp<Routes.Search>;
  route: BottomTabRouteProp<Routes.Search>;
}

const SearchScreen: React.FC<SearchScreenProps> = props => {
  const [textSearch, setTextSearch] = useState<string>('');
  const [searching, setSearching] = useState<boolean>();
  const [dataSearch, setDataSearch] = useState<Post[]>([]);

  useEffect(() => {
    if (props.route.params !== undefined) {
      setTextSearch(props.route.params.hashtagSearch!);
      filteredPosts(props.route.params.hashtagSearch!);
      setSearching(true);
    }
  }, []);

  const filteredPosts = async (text: string) => {
    setDataSearch([]);
    let posts: Post[] = postCommunity.filter(eachPost => {
      const exist = eachPost.hashtag.some((eachHashtag, index) => {
        return eachHashtag.toLowerCase().includes(text.toLowerCase());
      });
      if (exist === true) {
        return {...eachPost};
      }
    });
    setDataSearch(posts);
  };

  const renderHashtagRecommendItem = ({item}: {item: Hashtag}) => {
    const onPressHashtagRecommend = async (hashtag: Hashtag) => {
      setTextSearch(item.hashtag);
      filteredPosts(hashtag.hashtag);
      setSearching(true);
    };
    return (
      <HashtagRecommendItem
        hashtag={item}
        onPress={() => onPressHashtagRecommend(item)}
      />
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#f5f6fb'}}>
      <View style={styles.headerContainer}>
        <View style={styles.searchContainer}>
          <View style={styles.iconSearch}>
            <Icon name="border-all" size={18} color={'white'} />
          </View>
          <View style={{width: 1, height: 20, backgroundColor: '#A3A3A3'}} />
          <TextInput
            onChangeText={text => {
              setTextSearch(text);
            }}
            onSubmitEditing={(
              nativeEvent: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
            ) => {
              setSearching(true);
              // filteredPosts();
              filteredPosts(nativeEvent.nativeEvent.text);
            }}
            placeholder="Tìm kiếm bài đăng"
            placeholderTextColor={'#A3A3A3'}
            style={styles.textInput}
            value={textSearch}
          />
        </View>
        <TouchableOpacity
          style={styles.buttonCancel}
          onPress={() => {
            setSearching(false);
            setTextSearch('');
          }}>
          <Text style={{fontSize: 18, color: colors.primary}}>Hủy</Text>
        </TouchableOpacity>
      </View>

      {searching ? (
        <View>
          {dataSearch.length > 0 ? (
            <FlatList
              data={dataSearch}
              renderItem={({item}) => <PostItem post={item} />}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View style={{alignItems: 'center', marginTop: 20}}>
              <Text style={{fontSize: 16}}>Không tìm thấy kết quả</Text>
            </View>
          )}
        </View>
      ) : (
        <View>
          <Text style={styles.textHashtagRecommend}>Chủ Đề Đề Xuất</Text>
          <FlatList
            data={hashtagHotList}
            renderItem={renderHashtagRecommendItem}
          />
        </View>
      )}
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  headerContainer: {
    height: 60,
    width: distances.width,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
  },
  searchContainer: {
    height: 45,
    flexDirection: 'row',
    width: distances.width - 80,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
  },
  textInput: {
    marginLeft: 10,
    width: distances.width - 140,
    fontSize: 18,
    paddingRight: 15,
  },
  iconSearch: {
    height: 30,
    aspectRatio: 1,
    borderRadius: 25,
    backgroundColor: '#667df6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginLeft: 8,
  },
  buttonCancel: {
    marginLeft: 'auto',
    right: 10,
    height: 40,
    paddingHorizontal: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textHashtagRecommend: {
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 20,
    marginBottom: 20,
    marginTop: 30,
    color: colors.marsBlack,
  },
});
