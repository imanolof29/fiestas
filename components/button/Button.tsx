import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary';
    loading?: boolean;
    disabled?: boolean;
}

export const PrimaryButton = (properties: ButtonProps) => {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                properties.variant === 'secondary' && styles.secondaryButton,
                properties.disabled && styles.disabledButton,
            ]}
            onPress={properties.onPress}
            disabled={properties.disabled || properties.loading}
        >
            {properties.loading ? (
                <ActivityIndicator color="#FFF" />
            ) : (
                <Text style={[styles.buttonText, properties.variant === 'secondary' && styles.secondaryButtonText]}>
                    {properties.title}
                </Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        height: 48,
        borderRadius: 12,
        backgroundColor: '#B4E55C',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginVertical: 8,
    },
    buttonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: '600',
    },
    secondaryButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#E5E5E5',
    },
    secondaryButtonText: {
        color: '#666',
    },
    disabledButton: {
        opacity: 0.5,
    },
});