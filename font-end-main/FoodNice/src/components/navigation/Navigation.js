import React from 'react';
import ProductNavigation from '../products/ProductNavigation';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';

const Navigation = () => {
  return (
    <NavigationContainer>
      <ProductNavigation />
    </NavigationContainer>
  );
};

export default Navigation;
