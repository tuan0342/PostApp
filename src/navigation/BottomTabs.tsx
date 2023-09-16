import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import colors from '../base/utils/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

import PostsScreen from '../posts/PostsScreen';
import SearchScreen from '../search/SearchScreen';
import {
  BottomTabNavigatorParamList,
  RootNavigationProp,
  RootRouteProp,
  Routes,
} from '../base/types/navigation';

interface BottomTabScreenProps {
  navigation: RootNavigationProp<Routes.BottomTab>;
  route: RootRouteProp<Routes.BottomTab>;
}

const BottomTab = createBottomTabNavigator<BottomTabNavigatorParamList>();

// @ts-ignore
const screenOption = ({route}) => ({
  headerShown: false,
  tabBarActiveTintColor: colors.primary,
  tabBarInactiveTintColor: '#989898',
  tabBarStyle: {
    height: 65,
    paddingHorizontal: 5,
    paddingTop: 0,
    paddingBottom: 5,
    backgroundColor: 'white',
  },
  // @ts-ignore
  tabBarIcon: ({focused, color, size}) => {
    let iconName;

    if (route.name === Routes.Posts) {
      iconName = 'home';
      size = 35;
    } else if (route.name === Routes.Search) {
      iconName = 'search';
      size = 28;
    }
    return (
      <Icon
        name={iconName!}
        size={size}
        color={focused ? colors.primary : '#989898'}
      />
    );
  },
});

const BottomTabScreen: React.FC<BottomTabScreenProps> = props => {
  return (
    <BottomTab.Navigator screenOptions={screenOption}>
      <BottomTab.Screen
        name={Routes.Posts}
        component={PostsScreen}
        options={{tabBarLabel: 'Home', tabBarShowLabel: false}}
      />
      <BottomTab.Screen
        name={Routes.Search}
        component={SearchScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarShowLabel: false,
          unmountOnBlur: true,
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabScreen;
