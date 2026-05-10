import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { registerRootComponent } from 'expo';
import React, { useContext } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthContext, AuthProvider } from './src/context/AuthContext';
import { EventProvider } from './src/context/EventContext';
import { ThemeProvider } from './src/context/ThemeContext';

import DetailScreen from './src/screens/EditScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isLoggedIn ? (
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        ) : (
          <>
            <Stack.Screen name="Feed" component={HomeScreen} options={{ title: 'EventHub' }} />
            <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Etkinlik Detayı' }} />
            <Stack.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'Favoriler' }} />
            <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profil' }} />
            <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Ayarlar' }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ThemeProvider>
          <EventProvider>
            <AppNavigator />
          </EventProvider>
        </ThemeProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

registerRootComponent(App);
export default App;