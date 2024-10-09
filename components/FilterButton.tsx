import { Ionicons } from "@expo/vector-icons"
import { StyleSheet, TouchableOpacity } from "react-native"

export interface FilterButtonProperties {
    onPress: () => void
}

export default function FilterButton(properties: FilterButtonProperties) {
    return (
        <TouchableOpacity onPress={properties.onPress} style={styles.container}>
            <Ionicons size={20} name="filter" />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20
    }
})