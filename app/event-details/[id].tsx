import { useEventDetail } from "@/api/events"
import { useLocalSearchParams } from "expo-router"
import { ActivityIndicator, Text, View } from "react-native"

const EventDetails = () => {

    const { id: idString } = useLocalSearchParams();
    const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);

    const { data, isLoading, error } = useEventDetail("9e207495-fa1b-4614-a2a1-d9252959a3e6")

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator />
            </View>
        )
    }

    if (error) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Error al cargar</Text>
            </View>
        )
    }

    return (
        <View>
            <Text>{data.name}</Text>
        </View>
    )
}

export default EventDetails