import useCachedResources from './hooks/useCachedResources';
import { NavigationContainer } from '@react-navigation/native'
import Routes from './navigation/routes';
import { AppProvider } from './components/AppContext'; 


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
      </AppProvider>
    );
  }
}
