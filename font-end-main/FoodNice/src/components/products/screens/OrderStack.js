import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Order from './Order';
import Payments from './Payments';

const OrderStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Order" component={Order} />
            <Stack.Screen name="Payments" component={Payments} />
        </Stack.Navigator>
    )
}

export default OrderStack;

