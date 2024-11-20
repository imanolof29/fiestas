import { StatusBar } from "expo-status-bar";
import { Bell, ChevronDown, Filter, Menu, Search } from "lucide-react-native";
import { View, StyleSheet, Text, TouchableOpacity, SafeAreaView } from "react-native"
import { TextInput } from "react-native";

interface HeaderProperties {
    onFilterClick: () => void
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: '#111',
    },
    headerContainer: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#111',
        gap: 10,
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
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchInput: {
        flex: 1,
        color: 'white',
        fontSize: 16,
        paddingVertical: 4,
        paddingHorizontal: 8,
    },
    filterButton: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export const Header = (properties: HeaderProperties) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="light" />
            <View style={styles.headerContainer}>
                <View style={styles.header}>
                    <View style={styles.locationContainer}>
                        <Text style={styles.locationLabel}>Tu ubicación</Text>
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
                    <Search size={20} color="#FFF" style={{ marginRight: 8 }} />
                    <TextInput
                        placeholder="Buscar cerca de ti"
                        placeholderTextColor="white"
                        style={styles.searchInput}
                    />
                    <TouchableOpacity onPress={properties.onFilterClick} style={styles.filterButton}>
                        <Filter size={20} color="#FFF" />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};