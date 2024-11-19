import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useRef, useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from '@/provider/AuthProvider';
import { Platform, TouchableOpacity } from 'react-native';
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

  const { session, initialized } = useAuth()
  const router = useRouter()
  const segments = useSegments();

  //NOTIFICATIONS
  const [expoPushToken, setExpoPushToken] = useState('');
  const [channels, setChannels] = useState<Notifications.NotificationChannel[]>([]);
  const [notification, setNotification] = useState<Notifications.Notification | undefined>(
    undefined
  );
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => token && setExpoPushToken(token));

    if (Platform.OS === 'android') {
      Notifications.getNotificationChannelsAsync().then(value => setChannels(value ?? []));
    }
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(notificationListener.current);
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    if (!initialized) return

    SplashScreen.preventAutoHideAsync();

    const inAuthGroup = segments[0] === '(tabs)'

    if (session && !inAuthGroup) {
      router.replace('/(tabs)/')
    } else if (!session && inAuthGroup) {
      router.replace('/(public)/login')
    }

  }, [session, initialized])

  return (
    <Stack>
      <Stack.Screen name="(auth)/(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(auth)/place-details/[id]"
        options={{
          headerTransparent: true,
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="arrow-back" size={34} color={"white"} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="(public)" options={{ headerShown: false }} />
    </Stack>
  )
}

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
  )
}

export default RootLayoutNav
