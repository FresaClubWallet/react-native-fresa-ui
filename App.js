import useCachedResources from './hooks/useCachedResources';
import { NavigationContainer } from '@react-navigation/native'
import Routes from './navigation/routes';
import { AppProvider } from './components/AppContext'; 
import Toast from 'react-native-toast-message';


export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <AppProvider>
          <NavigationContainer>
            <Routes />
          </NavigationContainer>
          <Toast />
      </AppProvider>
    );
  }
}
