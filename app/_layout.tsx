import { Slot, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from '@/provider/AuthProvider';

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

  return <Slot />

}

export default function RootLayout() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <InitialLayout />
      </QueryClientProvider>
    </AuthProvider>
  )
}
