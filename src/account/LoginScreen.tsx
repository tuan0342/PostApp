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
import {firebase} from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {User} from '../base/types/user';

interface LoginScreenProps {
  navigation: RootNavigationProp<Routes.Login>;
  route: RootRouteProp<Routes.Login>;
}

const LoginScreen: React.FC<LoginScreenProps> = props => {
  const navigation = useNavigation<RootNavigationProp<Routes.Login>>();
  const [errorEmail, setErrorEmail] = useState<boolean>();
  const [errorPassword, setErrorPassword] = useState<boolean>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userRef = useRef<User>();

  const isValidationOK = () => {
    return (
      email.length > 0 &&
      password.length > 0 &&
      errorEmail === false &&
      errorPassword === false
    );
  };

  const getInfoUser = async () => {
    try {
      await firebase
        .app()
        .database('https://post-app-505ea-default-rtdb.firebaseio.com/')
        .ref(`/users/${userRef.current!.id}`)
        .once('value')
        .then(async snapshot => {
          await AsyncStorage.setItem(
            'infoUser',
            JSON.stringify(snapshot.val()),
          );
          navigation.navigate(Routes.BottomTab, {});
        });
    } catch (e) {}
  };

  const signInAccount = async () => {
    try {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(userCredential => {
          userRef.current = {
            id: userCredential.user.uid,
            name:
              userCredential.user.displayName === null
                ? undefined
                : userCredential.user.displayName,
            email: email,
            password: password,
            avatar:
              'https://hoatrinhnushojo.files.wordpress.com/2015/04/cac-nhan-vat-chinh-trong-truyen-va-phim-doraemon-cho-be-yeu-tham-khao.png?w=640',
          };
          getInfoUser();
        })
        .catch(error => {
          Alert.alert('Đăng nhập thất bại', 'Sai tên đăng nhập hoặc mật khẩu', [
            {text: 'OK', onPress: undefined},
          ]);
        });
    } catch (e) {}
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
      style={{flex: 1, backgroundColor: colors.background}}>
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

        {/* Login text */}
        <View style={styles.textLoginView}>
          <Text
            style={{fontSize: 26, fontWeight: 'bold', color: colors.marsBlack}}>
            Login
          </Text>
          <Text style={{fontSize: 14, color: '#3D3D3D', marginTop: 5}}>
            Please sign in to continue.
          </Text>
        </View>

        {/* Nhập dữ liệu */}
        <View style={styles.containerInputView}>
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
            // value={email}
            style={styles.input}
          />
          {errorEmail === true && (
            <Text style={styles.error}>Email is not correct format</Text>
          )}

          {/* Password */}
          <View
            style={{marginTop: 20, flexDirection: 'row', alignItems: 'center'}}>
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
            // value={password}
            placeholder="Enter your password!"
            placeholderTextColor={'#A3A3A3'}
            secureTextEntry={true}
            style={styles.input}
          />
          {errorPassword === true && (
            <Text style={styles.error}>
              Password must have at least 3 characters
            </Text>
          )}
        </View>

        {/* forget password */}
        <View style={styles.buttonForgetPasswordView}>
          <TouchableOpacity style={{width: 120, alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '600',
                color: colors.marsBlack,
              }}>
              Forgot Password
            </Text>
          </TouchableOpacity>
        </View>

        {/* các button login, register */}
        <View style={styles.buttonContainerView}>
          {/* Login */}
          <TouchableOpacity
            style={[
              styles.buttonLogin,
              {
                backgroundColor:
                  isValidationOK() == true ? colors.primary : colors.inactive,
              },
            ]}
            disabled={isValidationOK() == false}
            onPress={signInAccount}>
            <Icon
              style={{position: 'absolute', left: 10}}
              name="sign-in-alt"
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
              Get In
            </Text>
          </TouchableOpacity>

          {/* Register */}
          <TouchableOpacity
            onPress={() => {}}
            style={styles.buttonCreateAccount}>
            <Text style={{fontSize: 16, fontWeight: '600', color: 'black'}}>
              Create an Account
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

  textLoginView: {
    flex: 15,
    height: (distances.height * 15) / 100,
    marginLeft: 30,
    justifyContent: 'center',
  },

  containerInputView: {
    flex: 33,
    height: (distances.height * 33) / 100,
    marginLeft: 30,
    marginRight: 30,
  },

  buttonForgetPasswordView: {
    flex: 22,
    height: (distances.height * 22) / 100,
    marginLeft: 30,
    marginRight: 30,
    alignItems: 'flex-end',
  },

  buttonContainerView: {
    flex: 20,
    height: (distances.height * 20) / 100,
    marginLeft: 30,
    marginRight: 30,
    alignItems: 'center',
  },

  // Các element:
  input: {
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

export default LoginScreen;
