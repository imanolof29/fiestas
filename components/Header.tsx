import { StatusBar } from "expo-status-bar";
import { Bell, ChevronDown, Menu } from "lucide-react-native";
import { View, StyleSheet, Text, TouchableOpacity, SafeAreaView } from "react-native"

export const Header = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="light" />
            <View style={styles.header}>
                <View style={styles.locationContainer}>
                    <Text style={styles.locationLabel}>Your location</Text>
                    <TouchableOpacity style={styles.locationSelector}>
                        <Text style={styles.locationText}>New York, Los Olivos</Text>
                        <ChevronDown size={20} color="#FF4500" />
                    </TouchableOpacity>
                </View>
                <View style={styles.actions}>
                    <TouchableOpacity style={styles.iconButton}>
                        <Bell size={24} color="#FFF" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <Menu size={24} color="#FFF" />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: '#111',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#111',
    },
    locationContainer: {
        flex: 1,
    },
    locationLabel: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
    },
    locationSelector: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFF',
        marginRight: 4,
    },
    actions: {
        flexDirection: 'row',
        gap: 16,
    },
    iconButton: {
        padding: 4,
    },
});