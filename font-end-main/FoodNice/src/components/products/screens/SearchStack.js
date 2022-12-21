import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Search from './Search';
import Detail from './Detail';

const OrderStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="Detail" component={Detail} />
        </Stack.Navigator>
    )
}

export default OrderStack;

