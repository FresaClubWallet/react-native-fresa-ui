import React from 'react';
import { Platform } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native'
import { useFonts } from 'expo-font';
import { Restaurant, OrderDelivery, Login } from './screens'
import Tabs from './navigation/tabs'
import WalletConnectProvider, { useWalletConnect } from '@walletconnect/react-native-dapp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import "@ethersproject/shims";
const { scheme } = require('expo');

const Stack = createStackNavigator();

const App = () => {
    const connector = useWalletConnect();

    const [loaded] = useFonts({
      "Roboto-Black" : require('./assets/fonts/Roboto-Black.ttf'),
      "Roboto-Bold" : require('./assets/fonts/Roboto-Bold.ttf'),
      "Roboto-Regular" : require('./assets/fonts/Roboto-Regular.ttf'),

    })
    
    if(!loaded){
      return null;
    }
    
      return (
        <WalletConnectProvider
            clientMeta={{
                name: 'FresaWallet',
            }}
            redirectUrl={Platform.OS === 'web' ? window.location.origin : `${scheme}://`}
            storageOptions= {{
                asyncStorage: AsyncStorage,
            }}>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}
                    initialRouteName={'Login'}
                >
                    {!connector.connected ? (
                        <Stack.Screen name="Login" component={Login} />
                    ) :(<>
                        <Stack.Screen name="Home" component={Tabs} />
                        <Stack.Screen name="Restaurant" component={Restaurant} />
                        <Stack.Screen name="OrderDelivery" component={OrderDelivery} />
                        </>)}
                </Stack.Navigator>
            </NavigationContainer>
        </WalletConnectProvider>
      )
    
}

export default App;