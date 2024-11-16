import { Slot, Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from '@/provider/AuthProvider';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const queryClient = new QueryClient()

const InitialLayout = () => {

  const { session, initialized } = useAuth()
  const router = useRouter()
  const segments = useSegments();

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
      <QueryClientProvider client={queryClient}>
        <InitialLayout />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default RootLayoutNav
