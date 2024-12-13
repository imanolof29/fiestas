import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, SafeAreaView, Switch } from 'react-native';
import { Camera, ChevronRight, Bell, Moon, HelpCircle, FileText, LogOut } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '@/provider/AuthProvider';
import axiosInstance from '@/api';

type IconProps = {
    size: number;
    color: string;
};

interface ImageAsset {
    uri: string;
    type: string;
    fileName?: string;
}

type ProfileOptionProps = {
    icon: React.ComponentType<IconProps>;
    label: string;
    onPress: () => void;
    showToggle?: boolean;
    toggleValue?: boolean;
    onToggle?: (value: boolean) => void;
};

const ProfileOption: React.FC<ProfileOptionProps> = ({
    icon: Icon,
    label,
    onPress,
    showToggle = false,
    toggleValue = false,
    onToggle = () => { },
}) => (
    <TouchableOpacity style={styles.profileOption} onPress={onPress}>
        <View style={styles.profileOptionLeft}>
            <Icon size={24} color="#1A1D1E" />
            <Text style={styles.profileOptionLabel}>{label}</Text>
        </View>
        {showToggle ? (
            <Switch
                value={toggleValue}
                onValueChange={onToggle}
                trackColor={{ false: "#E5E5E5", true: "#FF4500" }}
            />
        ) : (
            <ChevronRight size={24} color="#1A1D1E" />
        )}
    </TouchableOpacity>
);


export default function ProfileScreen() {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [darkModeEnabled, setDarkModeEnabled] = useState(false);

    const { session, logout } = useAuth()

    const pickImage = async (): Promise<void> => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            const selectedPhoto = result.assets[0];
            await uploadPhoto({
                uri: selectedPhoto.uri,
                type: selectedPhoto.type || 'image/jpeg',
                fileName: selectedPhoto.fileName || 'profile.jpg',
            });
        }
    };

    const uploadPhoto = async (photo: ImageAsset): Promise<void> => {
        const formData = new FormData();
        formData.append('file', {
            uri: photo.uri,
            type: photo.type,
            name: photo.fileName,
        } as any);

        try {
            const response = await axiosInstance.post(`/users/profile-picture`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Imagen subida con éxito:', response.data);
        } catch (error) {
            console.error('Error al subir la imagen:', error);
        }
    };

    const handleLogout = () => {
        logout()
    };


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Perfil</Text>
                </View>

                <View style={styles.profileImageContainer}>
                    <Image
                        source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
                        style={styles.profileImage}
                    />
                    <TouchableOpacity style={styles.cameraButton} onPress={async () => pickImage()}>
                        <Camera size={24} color="#FFF" />
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 1, alignItems: "center", paddingVertical: 20 }}>
                    <Text>{session?.email}</Text>
                </View>

                <View style={styles.optionsContainer}>
                    <ProfileOption
                        icon={Bell as any}
                        label="Notifications"
                        showToggle={true}
                        toggleValue={notificationsEnabled}
                        onToggle={setNotificationsEnabled} onPress={() => { }} />
                    <ProfileOption
                        icon={Moon as any}
                        label="Dark Mode"
                        showToggle={true}
                        toggleValue={darkModeEnabled}
                        onToggle={setDarkModeEnabled} onPress={() => { }} />
                    <ProfileOption
                        icon={HelpCircle as any}
                        label="Help Center"
                        onPress={() => { }}
                    />
                    <ProfileOption
                        icon={FileText as any}
                        label="Terms and Conditions"
                        onPress={() => { }}
                    />
                    <ProfileOption
                        icon={LogOut as any}
                        label="Logout"
                        onPress={handleLogout}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    scrollContent: {
        padding: 16,
    },
    header: {
        marginBottom: 36,
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1A1D1E',
    },
    profileImageContainer: {
        alignItems: 'center',
        marginBottom: 36,
    },
    profileImage: {
        width: 160,
        height: 160,
        borderRadius: 80,
    },
    cameraButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#FF4500',
        borderRadius: 20,
        padding: 8,
    },
    userInfoContainer: {
        marginBottom: 24,
    },
    optionsContainer: {
        backgroundColor: '#F0F0F0',
        borderRadius: 12,
        overflow: 'hidden',
    },
    profileOption: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    profileOptionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileOptionLabel: {
        marginLeft: 16,
        fontSize: 16,
        color: '#1A1D1E',
    },
});