import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomNav} from '../components';

import {
  StartScreen,
  LogIn,
  Register,
  Home,
  Search,
  Cart,
  Profile,
  Category,
  ProductDetail,
  OrderShipment,
  Favorite,
  Bio,
  Order,
  Splash,
  ChangeAddress,
  OrderDetail,
  Comment,
  Account,
} from '../stacks';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const forFade = ({current}) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const MainApp = () => {
  return (
    <Tab.Navigator tabBar={props => <BottomNav {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Favorite" component={Favorite} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Start Screen"
        component={StartScreen}
        options={{
          cardStyleInterpolator: forFade,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Log In"
        component={LogIn}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{
          cardStyleInterpolator: forFade,
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="Category"
        component={Category}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="Product Detail"
        component={ProductDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Order Shipment"
        component={OrderShipment}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Bio" component={Bio} options={{headerShown: false}} />
      <Stack.Screen
        name="Order"
        component={Order}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChangeAddress"
        component={ChangeAddress}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OrderDetail"
        component={OrderDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Comment"
        component={Comment}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Account"
        component={Account}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
