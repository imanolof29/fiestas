import React from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface InputProps {
    label?: string;
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
    keyboardType?: 'default' | 'email-address' | 'numeric';
    rightIcon?: string;
    onRightIconPress?: () => void;
}

export const Input = (properties: InputProps) => {
    return (
        <View style={styles.container}>
            {properties.label && <Text style={styles.label}>{properties.label}</Text>}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder={properties.placeholder}
                    placeholderTextColor="#999"
                    value={properties.value}
                    onChangeText={properties.onChangeText}
                    secureTextEntry={properties.secureTextEntry}
                    keyboardType={properties.keyboardType}
                    autoCapitalize="none"
                    cursorColor={"#FF4500"}
                />
                {properties.rightIcon && (
                    <TouchableOpacity onPress={properties.onRightIconPress} style={styles.iconContainer}>
                        <Ionicons name={properties.rightIcon as any} size={20} color="#999" />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
        width: '100%',
    },
    label: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: 12,
        backgroundColor: '#FFF',
    },
    input: {
        flex: 1,
        height: 48,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#333',
    },
    iconContainer: {
        padding: 12,
    },
});