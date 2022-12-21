import {View, Text} from 'react-native';
import React from 'react';
import {Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

import HomeStack from './screens/HomeStack';
import SearchStack from './screens/SearchStack';
import Order from './screens/Payments';
import ProfileStack from './screens/ProfileStack';
import OrderStack from './screens/OrderStack';

import {createStackNavigator} from '@react-navigation/stack';

import ProfileInfomation from '../users/screens/ProfileInfomation';
import ChangePassword from '../users/screens/ChangePassword';

const ProductNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarActiveTintColor: '#22A45D',
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 88,
          borderWidth: 1,
          borderColor: '#010F07',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        },

        tabBarIcon: ({focused, color, size}) => {
          if (route.name == 'Home') {
            return (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  source={require('../../../assets/images/home.png')}
                  resizeMode="contain"
                  style={{
                    tintColor: focused ? '#22A45D' : '#868686',
                    width: 34,
                    height: 34,
                  }}
                />
                <Text
                  style={{
                    color: focused ? '#22A45D' : '#868686',
                    fontSize: 14,
                  }}>
                  Home
                </Text>
              </View>
            );
          } else if (route.name == 'Search') {
            return (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  source={require('../../../assets/images/search.png')}
                  resizeMode="contain"
                  style={{
                    tintColor: focused ? '#22A45D' : '#868686',
                    width: 34,
                    height: 34,
                  }}
                />
                <Text
                  style={{
                    color: focused ? '#22A45D' : '#868686',
                    fontSize: 14,
                  }}>
                  Search
                </Text>
              </View>
            );
          } else if (route.name == 'Order') {
            return (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  source={require('../../../assets/images/orders.png')}
                  resizeMode="contain"
                  style={{
                    tintColor: focused ? '#22A45D' : '#868686',
                    width: 34,
                    height: 34,
                  }}
                />
                <Text
                  style={{
                    color: focused ? '#22A45D' : '#868686',
                    fontSize: 14,
                  }}>
                  Orders
                </Text>
              </View>
            );
          } else if (route.name == 'Profile') {
            return (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  source={require('../../../assets/images/user.png')}
                  resizeMode="contain"
                  style={{
                    tintColor: focused ? '#22A45D' : '#868686',
                    width: 34,
                    height: 34,
                  }}
                />
                <Text
                  style={{
                    color: focused ? '#22A45D' : '#868686',
                    fontSize: 14,
                  }}>
                  Profile
                </Text>
              </View>
            );
          }
        },
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Search" component={SearchStack} />
      <Tab.Screen name="Order" component={OrderStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
};

export default ProductNavigation;
