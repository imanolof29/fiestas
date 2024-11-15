// app/(public)/login.tsx

import React, { useState } from 'react';
import { View, Alert, StyleSheet, Text, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useAuth } from '@/provider/AuthProvider';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { PrimaryButton } from '@/components/button/Button';
import { Input } from '@/components/input/Input';

export default function LoginScreen() {
  const { onLogin } = useAuth(); // Usamos handleLogin desde el contexto
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
      <View style={styles.header}>
        <SafeAreaView />
        <Text style={styles.title}>Sign in to your{'\n'}Account</Text>
        <Text style={styles.subtitle}>Sign in to your Account</Text>
      </View>

      <View style={styles.form}>
        <Input
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Input
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          rightIcon={showPassword ? 'eye-off' : 'eye'}
          onRightIconPress={() => setShowPassword(!showPassword)}
        />

        <TouchableOpacity
          onPress={() => { }}
          style={styles.forgotPassword}
        >
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <PrimaryButton title="Login" onPress={onLoginPress} />

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>Or login with</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.socialButtons}>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => { }}
          >
            <Image
              source={{ uri: 'https://developers.google.com/identity/images/g-logo.png' }}
              style={styles.socialIcon}
            />
            <Text style={styles.socialButtonText}>Google</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => { }}
          >
            <Ionicons name="logo-facebook" size={24} color="#1877F2" />
            <Text style={styles.socialButtonText}>Facebook</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => { }}>
            <Text style={styles.footerLink}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    backgroundColor: '#1A1D1E',
    padding: 24,
    paddingTop: 48,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#999',
  },
  form: {
    flex: 1,
    padding: 24,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 16,
  },
  forgotPasswordText: {
    color: '#B4E55C',
    fontSize: 14,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E5E5',
  },
  dividerText: {
    color: '#999',
    paddingHorizontal: 16,
    fontSize: 14,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    gap: 8,
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
  socialButtonText: {
    fontSize: 14,
    color: '#333',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  footerText: {
    color: '#666',
    fontSize: 14,
  },
  footerLink: {
    color: '#B4E55C',
    fontSize: 14,
    fontWeight: '600',
  },
});
