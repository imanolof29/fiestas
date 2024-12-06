import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useRegisterUser } from '../../api/register/index'; 
import { useRouter } from 'expo-router';

const RegisterScreen = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Obtenemos la mutación para registrar el usuario
    const { mutate: registerUser, isLoading } = useRegisterUser();

    // Obtenemos el router para navegar entre pantallas
    const router = useRouter();

    const handleRegister = () => {
        // Verificamos que las contraseñas coincidan
        if (password !== confirmPassword) {
            setErrorMessage('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
            return;
        }

        setErrorMessage('');

        
        registerUser(
            { firstName, lastName, username, email, password },
            {
                onSuccess: (data) => {
                    Alert.alert('Éxito', 'El usuario ha sido registrado con éxito.', [
                        {
                            text: 'OK',
                            onPress: () => {
                           
                                router.replace('/(public)/login');
                            }
                        }
                    ]);
                },
                onError: (err) => {
                    Alert.alert('Error', 'No se pudo registrar el usuario.');
                }
            }
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registro</Text>

            {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

            <Text style={styles.label}>Nombre</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={firstName}
                onChangeText={setFirstName}
            />

            <Text style={styles.label}>Apellido</Text>
            <TextInput
                style={styles.input}
                placeholder="Apellido"
                value={lastName}
                onChangeText={setLastName}
            />

            <Text style={styles.label}>Nombre de usuario</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre de usuario"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
            />

            <Text style={styles.label}>Correo electrónico</Text>
            <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />

            <Text style={styles.label}>Contraseña</Text>
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <Text style={styles.label}>Repite la contraseña</Text>
            <TextInput
                style={styles.input}
                placeholder="Repite la contraseña"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />

            <Button title={isLoading ? "Registrando..." : "Registrarse"} onPress={handleRegister} disabled={isLoading} />

            {/* Enlace para volver al Login */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>¿Ya tienes una cuenta? </Text>
                <TouchableOpacity onPress={() => router.replace('/(public)/login')}>
                    <Text style={styles.footerLink}>Inicia sesión</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 100,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center'
    },
    error: {
        color: 'red',
        marginBottom: 12,
        textAlign: 'center'
    },
    label: {
        fontSize: 14,
        marginBottom: 4,
        color: '#333',
        fontWeight: '500'
    },
    input: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 10,
        borderRadius: 5
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
        marginLeft: 4
    }
});

export default RegisterScreen;
