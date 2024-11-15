import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Bell, ChevronDown, Filter, Menu, Search } from "lucide-react-native";
import { View, StyleSheet, Text, TouchableOpacity, SafeAreaView } from "react-native"
import { TextInput } from "react-native";

export const Header = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="light" />
            <View style={styles.headerContainer}>
                <View style={styles.header}>
                    <View style={styles.locationContainer}>
                        <Text style={styles.locationLabel}>Tu ubicacion</Text>
                        <TouchableOpacity style={styles.locationSelector}>
                            <Text style={styles.locationText}>Irun, Gipuzkoa</Text>
                            <ChevronDown size={20} color="#FF4500" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.actions}>
                        <TouchableOpacity style={styles.iconButton}>
                            <Bell size={24} color="#FFF" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.searchContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <Search size={20} color="#FFF" />
                        <TextInput placeholder="Buscar cerca de ti" placeholderTextColor="white" style={styles.searchInput} />
                    </View>
                    <Filter size={20} color="#FFF" />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: '#111',
    },
    headerContainer: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#111',
        gap: 10
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    searchContainer: {
        backgroundColor: '#333',
        padding: 10,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    searchInput: {
        color: 'white'
    }
});