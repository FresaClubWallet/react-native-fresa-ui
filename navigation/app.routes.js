import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Restaurant, Product } from '../screens'
import Tabs from '../navigation/tabs'


const Stack = createStackNavigator();

const AppRoutes = () => (
    <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}
        initialRouteName={'Home'}
    >
        <Stack.Screen name="Home" component={Tabs} />
        <Stack.Screen name="Vendor" component={Tabs} />
        <Stack.Screen name="Product" component={Product} />
        <Stack.Screen name="Restaurant" component={Restaurant} />
    </Stack.Navigator>
)

export default AppRoutes;