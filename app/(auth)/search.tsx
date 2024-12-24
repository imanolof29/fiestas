import { useRouter } from "expo-router"
import { ArrowLeft, Search } from "lucide-react-native"
import { useState } from "react"
import { View, StyleSheet, SafeAreaView, TouchableOpacity, TextInput } from "react-native"

const Page = () => {

    const [searchQuery, setSearchQuery] = useState('')

    const navigation = useRouter()

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchContainer}>
                <TouchableOpacity onPress={() => navigation.back()}>
                    <ArrowLeft size={24} color="#FFF" />
                </TouchableOpacity>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar cerca de ti"
                    placeholderTextColor="#999"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    autoFocus
                />
                <Search size={24} color="#FFF" />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#333',
        padding: 10,
        margin: 10,
        borderRadius: 8,
    },
    searchInput: {
        flex: 1,
        color: 'white',
        fontSize: 16,
        marginLeft: 10,
    },
    resultItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    resultText: {
        color: 'white',
        fontSize: 16,
    },
});

export default Page