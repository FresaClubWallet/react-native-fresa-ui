import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { AppProvider } from './components/AppContext'; 
import Routes from './navigation/routes';
import { useFonts } from 'expo-font';

export default function App() {
    const [loaded] = useFonts({
        "Roboto-Black" : require('./assets/fonts/Roboto-Black.ttf'),
        "Roboto-Bold" : require('./assets/fonts/Roboto-Bold.ttf'),
        "Roboto-Regular" : require('./assets/fonts/Roboto-Regular.ttf'),
    })

    if(!loaded){
        return null;
    }
    return (
        <AppProvider>
            <NavigationContainer>
                <Routes />
            </NavigationContainer>
        </AppProvider>
    );
}