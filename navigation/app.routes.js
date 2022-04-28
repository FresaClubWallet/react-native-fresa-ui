import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Restaurant, Product, StoreQrScanner, Favourites,ProductDetail } from '../screens'
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
        <Stack.Screen name="MyStore" component={Tabs} />
        <Stack.Screen name="VendorQr" component={Tabs} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
        <Stack.Screen name="Product" component={Product} />
        <Stack.Screen name="Restaurant" component={Restaurant} />
        <Stack.Screen name="StoreQrScanner" component={StoreQrScanner} />
        <Stack.Screen name="Favourites" component={Favourites} />

    </Stack.Navigator>
)

export default AppRoutes;