import React, {useState, useEffect, memo} from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Comment, Post, UserPost} from '../base/types/post';
import colors from '../base/utils/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import distances from '../base/utils/distances';
import {hashtagHotList} from '../data/Posts';
import {Hashtag} from '../base/types/post';

export type PostProps = {
  post: Post;
};
export type InfoOwnerProps = {
  avatar: string;
  name: string;
  timestamp: number;
};
export type CaptionProps = {
  caption: string;
};
export type HashtagProps = {
  hashtags: string[];
};
export type InteractProps = {
  like: UserPost[];
  comment: Comment[];
};

const PostItem: React.FC<PostProps> = ({post}) => {
  const width =
    post.images!.length > 3
      ? (distances.width - 50) / 3
      : (distances.width - 50) / post.images!.length;

  const renderImage = (image: string, index: number) => {
    return (
      <TouchableOpacity
        key={index}
        style={{
          width: width,
          height: '100%',
          marginRight: index !== 3 ? 5 : 0,
        }}>
        <Image
          source={{uri: image}}
          style={{
            width: width,
            height: '100%',
            borderTopLeftRadius: index === 0 ? 10 : 0,
            borderBottomLeftRadius: index === 0 ? 10 : 0,
            borderTopRightRadius:
              post.images!.length === index + 1 || index === 2 ? 10 : 0,
            borderBottomRightRadius:
              post.images!.length === index + 1 || index === 2 ? 10 : 0,
          }}
          resizeMode="cover"
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <InfoOwner
          avatar={post.owner.avatar}
          name={post.owner.name}
          timestamp={post.timestamp}
        />
        <TouchableOpacity style={styles.buttonFollow}>
          <Text style={styles.textFollow}>Follow</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonOption}>
          <Icon
            style={{}}
            name="ellipsis-v"
            size={20}
            color={colors.lightgray}
          />
        </TouchableOpacity>
      </View>

      {post.cap.length > 0 && <Caption caption={post.cap} />}

      {post.images.length > 0 && (
        <View style={styles.listImage}>
          {post.images!.slice(0, 3).map(renderImage)}
          <View></View>
        </View>
      )}

      {post.hashtag.length > 0 && <HashtagInPost hashtags={post.hashtag} />}

      <Interact like={post.like} comment={post.comment} />
    </View>
  );
};

const InfoOwner: React.FC<InfoOwnerProps> = ({avatar, name, timestamp}) => {
  return (
    <TouchableOpacity style={{flexDirection: 'row'}}>
      <Image
        source={{uri: avatar}}
        style={styles.avatarOwner}
        resizeMode="contain"
      />
      <View style={{justifyContent: 'center'}}>
        <Text style={styles.name}>
          {name.length > 15 ? name.substring(0, 16) + '...' : name}
        </Text>
        <Text style={styles.timestamp}>
          {moment().valueOf() - timestamp <= 86400000
            ? moment(timestamp).fromNow()
            : moment(timestamp).format('DD/MM/YYYY')}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const Caption: React.FC<CaptionProps> = ({caption}) => {
  return (
    <View style={styles.caption}>
      <Text style={styles.captionText}>{caption}</Text>
    </View>
  );
};

const HashtagInPost: React.FC<HashtagProps> = ({hashtags}) => {
  const renderHashtag = (hashtag: string, index: number) => {
    return (
      <TouchableOpacity key={index}>
        <Text style={styles.hashtagText}>{`#` + hashtag} </Text>
      </TouchableOpacity>
    );
  };

  return <View style={styles.hashtag}>{hashtags.map(renderHashtag)}</View>;
};

const Interact: React.FC<InteractProps> = ({like, comment}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <View style={styles.interactContainer}>
        <TouchableOpacity style={styles.interactButton}>
          <Icon style={{}} name="heart" size={20} color={colors.lightgray} />
        </TouchableOpacity>
        <Text>{like.length}</Text>
      </View>
      <View style={styles.interactContainer}>
        <TouchableOpacity style={styles.interactButton}>
          <Icon style={{}} name="comment" size={20} color={colors.lightgray} />
        </TouchableOpacity>
        <Text>{comment.length}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderBottomColor: '#F0F0F0',
    borderBottomWidth: 1,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarOwner: {
    height: 45,
    width: 45,
    borderRadius: 50,
    marginRight: 10,
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.marsBlack,
  },
  timestamp: {
    fontSize: 13,
    fontWeight: '400',
    color: colors.lightgray,
  },
  buttonOption: {
    width: 10,
    position: 'absolute',
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
  buttonFollow: {
    width: 85,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    right: 30,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: colors.primary,
  },
  textFollow: {
    fontSize: 15,
    color: colors.primary,
    fontWeight: '700',
  },
  caption: {
    marginTop: 10,
  },
  captionText: {
    fontSize: 14,
    color: colors.marsBlack,
  },
  listImage: {
    marginTop: 10,
    height: 170,
    width: '100%',
    flexDirection: 'row',
  },
  hashtag: {
    flexDirection: 'row',
    marginVertical: 5,
    width: '100%',
    flexWrap: 'wrap',
  },
  hashtagText: {
    fontSize: 14,
    color: '#3b5998',
    fontWeight: '600',
  },
  interactContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 30,
    marginTop: 5,
  },
  interactButton: {
    paddingHorizontal: 2,
    marginRight: 3,
  },
});

export default memo(PostItem);
