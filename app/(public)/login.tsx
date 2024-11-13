// app/(public)/login.tsx

import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
import { useAuth } from '@/provider/AuthProvider';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const { onLogin } = useAuth(); // Usamos handleLogin desde el contexto
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLoginPress = async () => {
    try {
      await onLogin?.(email, password);
      // ir a la parge de sesion iniciada
      router.replace('/(tabs)/');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Correo electrónico o contraseña incorrectos.');
    }
  };
  
  return (
    <View style={styles.container}>
      <Text>Email</Text>
      <TextInput
        //placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        onFocus={() => setEmail('')} 
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
/>
      <Text>Contraseña</Text>
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        onFocus={() => setPassword('')}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Iniciar sesión" onPress={onLoginPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 100,
    backgroundColor: '#fff',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});
