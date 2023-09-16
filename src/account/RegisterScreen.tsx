import React, {useState, useEffect, useRef} from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import colors from '../base/utils/colors';
import distances from '../base/utils/distances';
import {isValidEmail, isValidPassword} from '../base/utils/validation';
import images from '../base/utils/images';
import {useNavigation} from '@react-navigation/native';
import {
  RootNavigationProp,
  RootRouteProp,
  Routes,
} from '../base/types/navigation';
import auth from '@react-native-firebase/auth';
import database, {firebase} from '@react-native-firebase/database';
import {User} from '../base/types/user';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface RegisterScreenProps {
  navigation: RootNavigationProp<Routes.Register>;
  route: RootRouteProp<Routes.Register>;
}

const RegisterScreen: React.FC<RegisterScreenProps> = props => {
  const navigation = useNavigation<RootNavigationProp<Routes.Welcome>>();
  const [errorEmail, setErrorEmail] = useState<boolean>();
  const [errorPassword, setErrorPassword] = useState<boolean>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userRef = useRef<User>();

  const isValidationOK = () => {
    return (
      name.length > 0 &&
      email.length > 0 &&
      password.length > 0 &&
      errorEmail === false &&
      errorPassword === false
    );
  };

  const createUserToDatabase = async () => {
    try {
      const jsonValue = JSON.stringify(userRef.current);
      await AsyncStorage.setItem('infoUser', jsonValue);
      await firebase
        .app()
        .database('https://post-app-505ea-default-rtdb.firebaseio.com/')
        .ref(`/users/${userRef.current!.id}`)
        .set(userRef.current)
        .then(() => {
          Alert.alert('Đăng ký thành công', undefined, [
            {
              text: 'OK',
              onPress: () => {
                navigation.navigate(Routes.BottomTab, {});
              },
            },
          ]);
        });
    } catch (e) {}
  };

  const registerAccount = async () => {
    try {
      await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async userCredential => {
          await auth().currentUser?.updateProfile({displayName: name});
          userRef.current = {
            id: userCredential.user.uid,
            name: name,
            email: email,
            password: password,
            avatar:
              'https://hoatrinhnushojo.files.wordpress.com/2015/04/cac-nhan-vat-chinh-trong-truyen-va-phim-doraemon-cho-be-yeu-tham-khao.png?w=640',
          };
          createUserToDatabase();
        })
        .catch(error => {
          Alert.alert('Đăng ký thất bại', undefined, [
            {text: 'OK', onPress: undefined},
          ]);
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
      style={{flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Icon back */}
        <View style={styles.iconBackView}>
          <TouchableOpacity
            style={{width: 24, marginLeft: 30}}
            onPress={() => {
              navigation.goBack();
            }}>
            <Icon name="chevron-left" size={23} color={colors.marsBlack} />
          </TouchableOpacity>
        </View>

        {/* Register text */}
        <View style={styles.textRegisterView}>
          <Text
            style={{fontSize: 26, fontWeight: 'bold', color: colors.marsBlack}}>
            Register Account
          </Text>
          <Text style={{fontSize: 14, color: '#3D3D3D', marginTop: 5}}>
            Please register account to continue.
          </Text>
        </View>

        {/* Nhập dữ liệu */}
        <View style={styles.containerInputView}>
          {/* Name */}
          <View
            style={{marginTop: 30, flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="user" size={17} color={colors.marsBlack} />
            <Text style={{fontSize: 15, color: colors.marsBlack}}> Name</Text>
          </View>
          <TextInput
            onChangeText={text => {
              setName(text);
            }}
            placeholder="Enter your name!"
            placeholderTextColor={'#A3A3A3'}
            style={styles.textinput}
          />

          {/* Email */}
          <View
            style={{marginTop: 30, flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="envelope" size={17} color={colors.marsBlack} />
            <Text style={{fontSize: 15, color: colors.marsBlack}}> Email</Text>
          </View>
          <TextInput
            onChangeText={text => {
              setEmail(text);
            }}
            onEndEditing={nativeEvent => {
              if (isValidEmail(nativeEvent.nativeEvent.text) == false) {
                setErrorEmail(true);
              } else {
                setErrorEmail(false);
              }
            }}
            placeholder="Enter your email!"
            placeholderTextColor={'#A3A3A3'}
            style={styles.textinput}
          />
          {errorEmail === true && (
            <Text style={styles.error}>Email is not correct format</Text>
          )}

          {/* Password */}
          <View
            style={{marginTop: 30, flexDirection: 'row', alignItems: 'center'}}>
            <Image source={images.password} style={{height: 18}} />
            <Text style={{fontSize: 15, color: colors.marsBlack}}>
              {' '}
              Password
            </Text>
          </View>
          <TextInput
            onChangeText={text => {
              setPassword(text);
            }}
            onEndEditing={nativeEvent => {
              if (isValidPassword(nativeEvent.nativeEvent.text) == false) {
                setErrorPassword(true);
              } else {
                setErrorPassword(false);
              }
            }}
            value={password}
            placeholder="Enter your password!"
            placeholderTextColor={'#A3A3A3'}
            secureTextEntry={true}
            style={styles.textinput}
          />
          {errorPassword === true && (
            <Text style={styles.error}>
              Password must have at least 3 characters
            </Text>
          )}
        </View>

        {/* Thông báo đồng ý điều khoản */}
        <View style={styles.buttonForgetPasswordView}>
          <Text
            style={{fontSize: 14, fontWeight: '400', color: colors.marsBlack}}>
            By signing up you agree with our
          </Text>
          <Text
            style={{fontSize: 14, fontWeight: '600', color: colors.marsBlack}}>
            terms and conditions
          </Text>
        </View>

        {/* button Create account  */}
        <View style={styles.buttonContainerView}>
          <TouchableOpacity
            style={[
              styles.buttonLogin,
              {
                backgroundColor:
                  isValidationOK() == true ? colors.primary : colors.inactive,
              },
            ]}
            disabled={isValidationOK() == false}
            onPress={registerAccount}>
            <Icon
              style={{position: 'absolute', left: 10}}
              name="user-plus"
              size={25}
              color={isValidationOK() == true ? 'black' : '#4D4D4D'}
            />
            <Text
              style={{
                alignSelf: 'center',
                fontSize: 16,
                fontWeight: '600',
                color: isValidationOK() == true ? 'black' : '#4D4D4D',
              }}>
              Create Account
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  // Các container:
  iconBackView: {
    flex: 10,
    height: (distances.height * 10) / 100,
    justifyContent: 'center',
  },

  textRegisterView: {
    flex: 15,
    height: (distances.height * 15) / 100,
    marginLeft: 30,
    justifyContent: 'center',
  },

  containerInputView: {
    flex: 50,
    height: (distances.height * 50) / 100,
    marginLeft: 30,
    marginRight: 30,
  },

  buttonForgetPasswordView: {
    flex: 10,
    height: (distances.height * 10) / 100,
    marginLeft: 30,
    marginRight: 30,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  buttonContainerView: {
    flex: 15,
    height: (distances.height * 15) / 100,
    marginLeft: 30,
    marginRight: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Các element:
  textinput: {
    height: 50,
    borderColor: '#A3A3A3',
    borderWidth: 1,
    width: distances.width - 60,
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 20,
  },

  buttonLogin: {
    width: distances.width - 60,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 10,
  },

  buttonCreateAccount: {
    marginTop: 25,
    width: 150,
    alignItems: 'center',
  },

  error: {
    color: colors.primary,
  },
});

export default RegisterScreen;
