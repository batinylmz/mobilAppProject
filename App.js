import AppHeader from './src/components/AppHeader';
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

// Kendi oluşturduğun dosyaların yolları (src klasörünü işaret ediyor)
import { EventProvider } from './src/context/EventContext';
import { COLORS } from './src/constants/theme';
import Feed from './src/screens/Feed';
import Favorites from './src/screens/Favorites';

const Tab = createBottomTabNavigator();

const App = () => {
    return (
        <EventProvider>
            {/* StatusBar'ı bordo yaparak bütünlük sağlıyoruz */}
            <StatusBar barStyle="light-content" backgroundColor={COLORS.header} />

            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        header: () => <AppHeader />,
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;

                            if (route.name === 'Feed') {
                                iconName = focused ? 'home' : 'home-outline';
                            } else if (route.name === 'Favorites') {
                                iconName = focused ? 'heart' : 'heart-outline';
                            }

                            return <Icon name={iconName} size={size} color={color} />;
                        },
                        // Aktif tab rengini senin bordo rengin yapıyoruz
                        tabBarActiveTintColor: COLORS.header,
                        tabBarInactiveTintColor: 'gray',
                        tabBarStyle: {
                            backgroundColor: '#FFFFFF',
                            borderTopWidth: 1,
                            borderTopColor: '#EEEEEE',
                            height: 60,
                            paddingBottom: 8,
                        },
                        headerShown: true, // Kendi özel header'ımızı Feed.js içinde yaptık
                    })}
                >
                    <Tab.Screen
                        name="Feed"
                        component={Feed}
                        options={{ title: 'Ana Sayfa' }}
                    />
                    <Tab.Screen
                        name="Favorites"
                        component={Favorites}
                        options={{ title: 'Favorilerim' }}
                    />
                    <Tab.Screen name="Profile" component={ProfileScreen} />
                    <Tab.Screen name="Settings" component={SettingsScreen} />
                </Tab.Navigator>
            </NavigationContainer>
        </EventProvider>
    );
};

export default App;