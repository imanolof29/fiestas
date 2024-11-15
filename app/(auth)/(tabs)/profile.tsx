import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, SafeAreaView, Switch } from 'react-native';
import { Camera, ChevronRight, Bell, Moon, HelpCircle, FileText, LogOut } from 'lucide-react-native';
import { CustomButton } from '@/components/ButtonComponent';
import { CustomInput } from '@/components/InputComponent';

type IconProps = {
    size: number;
    color: string;
};

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
                trackColor={{ false: "#E5E5E5", true: "#B4E55C" }}
            />
        ) : (
            <ChevronRight size={24} color="#1A1D1E" />
        )}
    </TouchableOpacity>
);


export default function ProfileScreen() {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [darkModeEnabled, setDarkModeEnabled] = useState(false);

    const handleLogout = () => {
        // Implement logout logic here
    };

    const handleUpdatePhoto = () => {
        console.log('Update photo');
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
                    <TouchableOpacity style={styles.cameraButton} onPress={handleUpdatePhoto}>
                        <Camera size={24} color="#FFF" />
                    </TouchableOpacity>
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
        backgroundColor: '#B4E55C',
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