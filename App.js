import React, { useEffect } from 'react';

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native'
import { useFonts } from 'expo-font';
import { Restaurant, Login, Vendor } from './screens'
import Tabs from './navigation/tabs'
import { useWalletConnect } from '@walletconnect/react-native-dapp';

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
                        <Stack.Screen name="Vendor" component={Tabs} />
                        <Stack.Screen name="Restaurant" component={Restaurant} />
                        </>)}
                </Stack.Navigator>
            </NavigationContainer>
      )
    
}

export default App;