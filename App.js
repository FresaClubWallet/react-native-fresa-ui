import React, { useEffect, useContext, useMemo } from 'react';

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native'
import { useFonts } from 'expo-font';
import { Restaurant, Login, Vendor } from './screens'
import Tabs from './navigation/tabs'
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import AppContext from './components/AppContext'; 

const Stack = createStackNavigator();

const App = () => {
    const connector = useWalletConnect();
    const appContext = useContext(AppContext);

    const [loaded] = useFonts({
      "Roboto-Black" : require('./assets/fonts/Roboto-Black.ttf'),
      "Roboto-Bold" : require('./assets/fonts/Roboto-Bold.ttf'),
      "Roboto-Regular" : require('./assets/fonts/Roboto-Regular.ttf'),

    })

    useEffect(() => {
      // if login & valid chainId then set attribute
      if (connector.connected && connector.chainId == appContext.chainId) {
        appContext.address = connector.accounts[0];
      }
    }, [connector])
    
    
    if(!loaded){
      return null;
    }
    // disConnectWallet()
      return (
        <AppContext.Provider value={{
          ...appContext
        }}>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}
                    initialRouteName={'Login'}
                >       
                    {!connector.connected || connector.chainId != appContext.chainId? ( // check valid connection & chainId
                        <Stack.Screen name="Login" component={Login} />
                    ) :(<>
                        <Stack.Screen name="Home" component={Tabs} />
                        <Stack.Screen name="Vendor" component={Tabs} />
                        <Stack.Screen name="Restaurant" component={Restaurant} />
                        </>)}
                </Stack.Navigator>
            </NavigationContainer>
        </AppContext.Provider>
      )
    
}

export default App;