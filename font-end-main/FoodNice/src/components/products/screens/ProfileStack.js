import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import ProfileInformation from '../../users/screens/ProfileInfomation';
import Profile from './Profile';
import ChangePassword from '../../users/screens/ChangePassword';
import FAQ from './FAQ';
import Locations from './Locations';

const ProfileStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="ProfileInformation" component={ProfileInformation} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} />
            <Stack.Screen name="FAQ" component={FAQ} />
            <Stack.Screen name="Locations" component={Locations} />
        </Stack.Navigator>
    )
}

export default ProfileStack;