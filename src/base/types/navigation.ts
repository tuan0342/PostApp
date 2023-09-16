import {RouteProp} from '@react-navigation/native';
import {
  BottomTabScreenProps,
  LoginScreenProps,
  PostsScreenProps,
  RegisterScreenProps,
  WelcomeScreenProps,
  CreatePostScreenProps,
  SearchScreenProps,
  HashtagScreenProps,
} from './screens';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

// config routes
export enum Routes {
  Welcome = 'Welcome',
  Login = 'Login',
  Register = 'Register',
  Posts = 'Posts',
  BottomTab = 'BottomTabScreen',
  CreatePost = 'CreatePost',
  Search = 'Search',
  Hashtag = 'Hashtag',
}

// param
export type RootStackParamList = {
  [Routes.Welcome]: WelcomeScreenProps;
  [Routes.Login]: LoginScreenProps;
  [Routes.Register]: RegisterScreenProps;
  [Routes.BottomTab]: BottomTabScreenProps;
  [Routes.CreatePost]: CreatePostScreenProps;
  [Routes.Hashtag]: HashtagScreenProps;
  [Routes.Search]: SearchScreenProps;
};
export type BottomTabNavigatorParamList = {
  [Routes.Posts]: PostsScreenProps;
  [Routes.Search]: SearchScreenProps;
};

// props of root
export type RootRouteProp<RouteName extends keyof RootStackParamList> =
  RouteProp<RootStackParamList, RouteName>;
export type BottomTabRouteProp<
  RouteName extends keyof BottomTabNavigatorParamList,
> = RouteProp<BottomTabNavigatorParamList, RouteName>;

// props of bottom tab
export type RootNavigationProp<RouteName extends keyof RootStackParamList> =
  NativeStackNavigationProp<RootStackParamList, RouteName>;
export type BottomTabNavigationProp<
  RouteName extends keyof BottomTabNavigatorParamList,
> = NativeStackNavigationProp<BottomTabNavigatorParamList, RouteName>;
