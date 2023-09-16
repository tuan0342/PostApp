import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import colors from '../base/utils/colors';

export type HashtagItemProps = {
  hashtag: string;
  onPress: any;
};

const HashtagItem: React.FC<HashtagItemProps> = ({hashtag, onPress}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{hashtag}</Text>
      <TouchableOpacity style={styles.iconContainer} onPress={onPress}>
        <Icon name="times" size={14} color={'#ffffff'} />
      </TouchableOpacity>
    </View>
  );
};

export default HashtagItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f4f9',
    marginTop: 10,
    marginLeft: 20,
    height: 40,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  iconContainer: {
    height: 18,
    width: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#b3bfcf',
    marginLeft: 'auto',
    marginRight: 15,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.marsBlack,
    marginLeft: 15,
    marginRight: 15,
  },
});
