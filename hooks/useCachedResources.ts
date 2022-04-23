import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          "Roboto-Black" : require('../assets/fonts/Roboto-Black.ttf'),
          "Roboto-Bold" : require('../assets/fonts/Roboto-Bold.ttf'),
          "Roboto-Regular" : require('../assets/fonts/Roboto-Regular.ttf'),
          "Cera-Pro-Black" : require('../assets/fonts/Cera-Pro-Black.ttf'),
          "Cera-Pro-Bold" : require('../assets/fonts/Cera-Pro-Bold.ttf'),
          "Cera-Pro-Medium" : require('../assets/fonts/Cera-Pro-Medium.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
