import React from 'react';
import {Text, View} from 'react-native';

export type HomeScreenProps = {};

const HomeScreen: React.FC<HomeScreenProps> = () => {
  return (
    <View>
      <Text>This is Home Screen</Text>
    </View>
  );
};

export default HomeScreen;
