import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View, Text } from "react-native";

export default function MapSearchBar() {
    return (
        <View style={styles.container}>
            <Ionicons size={20} name="search" style={styles.greyColor} />
            <Text style={[styles.searchHint, styles.greyColor]}>Buscar...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    searchHint: {
        fontSize: 18
    },
    greyColor: {
        color: 'grey'
    }
})