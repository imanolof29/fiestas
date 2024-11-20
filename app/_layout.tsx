import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from '@/provider/AuthProvider';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LocationProvider } from '@/provider/LocationProvider';
import * as Notifications from 'expo-notifications';
import { NotificationProvider } from '@/provider/NotificationProvider';

const queryClient = new QueryClient()

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  })
})

const InitialLayout = () => {
  const { session, isLoading } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();

    if (!isLoading) {
      const inAuthGroup = segments[0] === '(auth)';
      const inPublicGroup = segments[0] === '(public)';

      if (session && !inAuthGroup) {
        router.replace('/(auth)/(tabs)');
      } else if (!session && !inPublicGroup) {
        router.replace('/(public)/login');
      }

      SplashScreen.hideAsync();
    }
  }, [session, isLoading, segments]);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="(auth)/(tabs)"
        options={{
          headerShown: false
        }}
      />

      <Stack.Screen
        name="(auth)/place-details/[id]"
        options={{
          headerTransparent: true,
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons
                name="arrow-back"
                size={34}
                color="white"
              />
            </TouchableOpacity>
          )
        }}
      />

      <Stack.Screen
        name="(public)"
        options={{
          headerShown: false
        }}
      />
    </Stack>
  );
};

const RootLayoutNav = () => {
  return (
    <AuthProvider>
      <NotificationProvider>
        <LocationProvider>
          <QueryClientProvider client={queryClient}>
            <InitialLayout />
          </QueryClientProvider>
        </LocationProvider>
      </NotificationProvider>
    </AuthProvider>
  );
};

export default RootLayoutNav;
