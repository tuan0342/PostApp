import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import React from 'react';
import {Hashtag} from '../base/types/post';
import Icon from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import colors from '../base/utils/colors';

export type HashtagRecommendItemProps = {
  hashtag: Hashtag;
  onPress: any;
};

const HashtagRecommendItem: React.FC<HashtagRecommendItemProps> = ({
  hashtag,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.iconHashtag}>
          <Icon name="hashtag" size={26} color={'#ffffff'} />
        </View>
        <View style={{marginVertical: 10}}>
          <Text style={styles.hashtag}>{hashtag.hashtag}</Text>
          <Text style={styles.count}>
            Thảo luận mới 7 ngày qua: {hashtag.count}
          </Text>
        </View>
      </View>
      <View style={styles.timestampContainer}>
        <Text>Cập nhật vào: {moment(hashtag.lastTimestamp).fromNow()}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default HashtagRecommendItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    height: 110,
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 14,
  },
  iconHashtag: {
    height: 40,
    aspectRatio: 1,
    borderRadius: 25,
    backgroundColor: '#4d61dc',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
    marginVertical: 15,
  },
  count: {},
  hashtag: {fontSize: 22, fontWeight: '700', color: colors.marsBlack},
  timestampContainer: {
    marginHorizontal: 20,
    backgroundColor: '#f5f6fb',
    height: 30,
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 10,
  },
});
