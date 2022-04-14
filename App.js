import useCachedResources from './hooks/useCachedResources';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native'
import Routes from './navigation/routes';
import { AppProvider } from './components/AppContext'; 

const Stack = createStackNavigator();

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
