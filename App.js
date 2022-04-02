import React, { useEffect, useContext, useMemo, useState } from 'react';

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native'
import { useFonts } from 'expo-font';
import { Restaurant, Login, Product } from './screens'
import Tabs from './navigation/tabs'
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import AppContext from './components/AppContext'; 
import { ethers } from "ethers";
import { Fresa__factory } from "./types";

const Stack = createStackNavigator();

const App = () => {
    const connector = useWalletConnect();
    const [balance, setBalance] = useState("Loading ...")
    const appContext = useContext(AppContext);

    const [loaded] = useFonts({
      "Roboto-Black" : require('./assets/fonts/Roboto-Black.ttf'),
      "Roboto-Bold" : require('./assets/fonts/Roboto-Bold.ttf'),
      "Roboto-Regular" : require('./assets/fonts/Roboto-Regular.ttf'),

    })

    const provider = useMemo(
      () => new ethers.providers.JsonRpcProvider(appContext.NETWORK),
        []
    );

    const contract = useMemo(
      () => new Fresa__factory().attach(appContext.CONTRACT_ADDRESS).connect(provider),
      [provider]
    );
    useEffect(async() => {
      // if login & valid chainId then set attribute
      if (connector.connected && connector.chainId == appContext.chainId) {
        appContext.address = connector.accounts[0];
        appContext.provider = provider;
        appContext.contract = contract;
        const none = await appContext.provider.getBalance(appContext.cUSD_ADDRESS)
        let q = await ethers.utils.formatEther(none)
        setBalance((+q).toFixed(2))
      }
    }, [connector])
    
    if(!loaded){
      return null;
    }

    return (
        <AppContext.Provider value={{
          ...appContext,
          balance: balance
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
                        <Stack.Screen name="Product" component={Product} />
                        <Stack.Screen name="Restaurant" component={Restaurant} />
                        </>)}
                </Stack.Navigator>
            </NavigationContainer>
        </AppContext.Provider>
      )
    
}

export default App;