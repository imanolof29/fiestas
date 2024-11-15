import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

interface CustomButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary';
    loading?: boolean;
    disabled?: boolean;
}

export const CustomButton = ({
    title,
    onPress,
    variant = 'primary',
    loading = false,
    disabled = false,
}: CustomButtonProps) => {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                variant === 'secondary' && styles.secondaryButton,
                disabled && styles.disabledButton,
            ]}
            onPress={onPress}
            disabled={disabled || loading}
        >
            {loading ? (
                <ActivityIndicator color="#FFF" />
            ) : (
                <Text style={[styles.buttonText, variant === 'secondary' && styles.secondaryButtonText]}>
                    {title}
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