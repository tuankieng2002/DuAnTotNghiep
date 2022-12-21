import {View, Text} from 'react-native';
import React, {useContext} from 'react';
import {UserContext} from '../users/UserContext';
import {NavigationContainer} from '@react-navigation/native';
import ProductNavigation from '../products/ProductNavigation';
import UserNavigation from '../users/UserNavigation';

const AppNavigation = () => {
  const {isLoggedIn} = useContext(UserContext);

  // console.log('isLoggedIn', isLoggedIn);
  return (
    <NavigationContainer>
      {isLoggedIn ? <ProductNavigation /> : <UserNavigation />}
    </NavigationContainer>
  );
};

export default AppNavigation;
