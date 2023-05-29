import {StyleSheet, useColorScheme} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ChatUI from '../screens/ChatUI';
import AllChats from '../screens/AllChats';
import SplashScreen from '../screens/SplashScreen';
import PreviewImage from '../screens/PreviewImage';
import StatusPlay from '../screens/StatusPlay';
import {useDispatch, useSelector} from 'react-redux';
import {SetTheme} from '../Redux/Action';
import StatusScreen from '../screens/StatusScreen';
import {TabBarIndicator} from 'react-native-tab-view';
import {Dimensions} from 'react-native';
const {height, width} = Dimensions.get('screen');
import Icon from 'react-native-vector-icons/FontAwesome';
const Tab = createMaterialTopTabNavigator();
function MyTabs() {
  const check = useSelector(state => state.theme);
  return (
    <Tab.Navigator
      initialRouteName="AllChats"
      tabBarPosition="top"
      screenOptions={{
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: check === 'light' ? '#000' : '#fff',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '800',
          textTransform: 'uppercase',
        },
        tabBarStyle: {
          backgroundColor: check === 'light' ? '#fff' : '#000',
        },
        tabBarShowLabel: true,
        tabBarItemStyle: {alignSelf: 'center'},
        tabBarShowIcon: true,
        // tabBarPressColor: check === 'light' ? '#000' : '#fff',
        // tabBarPressOpacity: 0.1,
        tabBarIndicatorStyle: {
          backgroundColor: 'green',
          height: 3,
        },
        tabBarGap: 10,
        swipeEnabled: true,
      }}>
      <Tab.Screen
        name="AllChats"
        options={{
          tabBarLabel: 'Chats',
          // tabBarIcon: () => {
          //   return <Icon name="user" size={16} color="#fff" />;
          // },
        }}
        component={AllChats}
      />
      <Tab.Screen
        name="StatusScreen"
        component={StatusScreen}
        options={{
          tabBarLabel: 'Status',
        }}
      />
    </Tab.Navigator>
  );
}
const MainNavigation = () => {
  const Stack = createStackNavigator();
  const theme = useColorScheme();
  const dispatch = useDispatch();
  dispatch(SetTheme(theme));
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="SplashScreen">
        <Stack.Screen component={SplashScreen} name="SplashScreen" />
        <Stack.Screen component={MyTabs} name="MyTabs" />
        <Stack.Screen component={ChatUI} name="ChatUI" />
        <Stack.Screen component={PreviewImage} name="PreviewImage" />
        <Stack.Screen component={StatusPlay} name="StatusPlay" />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MainNavigation;
