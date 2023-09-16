import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import images from '../base/utils/images';
import colors from '../base/utils/colors';
import distances from '../base/utils/distances';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {
  RootNavigationProp,
  RootRouteProp,
  Routes,
} from '../base/types/navigation';

// type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

interface WelcomeScreenProps {
  navigation: RootNavigationProp<Routes.Welcome>;
  route: RootRouteProp<Routes.Welcome>;
}

const Welcome: React.FC<WelcomeScreenProps> = props => {
  const navigation = useNavigation<RootNavigationProp<Routes.Welcome>>();
  useEffect(() => {}, []);

  return (
    <View style={{flex: 1}}>
      {/* Block ảnh */}
      <View style={{height: '50%', alignItems: 'center'}}>
        <Image source={images.welcome} style={styles.img} />
      </View>

      {/* Block khẩu hiểu */}
      <View style={{height: '30%', alignItems: 'center', paddingTop: 20}}>
        <Text style={{fontSize: 14, color: colors.marsBlack}}>Wellcome to</Text>
        <Text
          style={{fontSize: 20, fontWeight: 'bold', color: colors.marsBlack}}>
          ANIME SOCIAL NETWORK !
        </Text>
        <Text style={{fontSize: 14, color: colors.lightgray, marginTop: 10}}>
          Start to connect with anime community
        </Text>
      </View>

      {/* Block button */}
      <View style={{height: '20%'}}>
        <TouchableOpacity
          style={styles.getIn}
          onPress={() => {
            navigation.navigate(Routes.Login, {});
          }}>
          <Icon
            style={{position: 'absolute', left: 10}}
            name="sign-in"
            size={25}
            color="black"
          />
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 16,
              fontWeight: '600',
              color: 'black',
            }}>
            Get In
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.createAccount}
          onPress={() => {
            navigation.navigate(Routes.Register, {});
          }}>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 16,
              fontWeight: '600',
              color: 'black',
            }}>
            Create an Account
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    width: distances.width - 30,
    resizeMode: 'contain',
    height: '80%',
    marginTop: '20%',
  },

  getIn: {
    backgroundColor: colors.primary,
    width: distances.width - 60,
    marginLeft: 30,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 10,
  },

  createAccount: {
    marginTop: 25,
    width: distances.width - 200,
    marginLeft: 100,
  },
});

export default Welcome;
