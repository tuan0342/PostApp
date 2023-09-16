import React, {useEffect, useState} from 'react';
import {NavigationContainer, RouteProp} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';

import Welcome from '../welcome/WelcomeScreen';
import LoginScreen from '../account/LoginScreen';
import RegisterScreen from '../account/RegisterScreen';
import BottomTabScreen from './BottomTabs';
import CreatePostScreen from '../posts/CreatePostScreen';
import HashtagScreen from '../posts/HashtagScreen';
import SearchScreen from '../search/SearchScreen';

import {RootStackParamList, Routes} from '../base/types/navigation';
import {User} from '../base/types/user';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  // const [initializing, setInitializing] = useState<boolean>(true);
  // const [user, setUser] = useState<User>();

  // const onAuthStateChanged = (user: User) => {
  //   setUser(user);
  //   if (initializing) setInitializing(false);
  // };

  // useEffect(() => {
  //   //@ts-ignore
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber; // unsubscribe on unmount
  // }, []);

  // if(initializing) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={Routes.Welcome}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={Routes.Welcome} component={Welcome} />
        <Stack.Screen name={Routes.Login} component={LoginScreen} />
        <Stack.Screen name={Routes.Register} component={RegisterScreen} />
        <Stack.Screen name={Routes.BottomTab} component={BottomTabScreen} />
        <Stack.Screen name={Routes.CreatePost} component={CreatePostScreen} />
        <Stack.Screen name={Routes.Hashtag} component={HashtagScreen} />
        <Stack.Screen name={Routes.Search} component={SearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
