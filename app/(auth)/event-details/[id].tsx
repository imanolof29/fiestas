import { useEventDetail } from "@/api/events"
import { useLocalSearchParams } from "expo-router"
import { ActivityIndicator, Text, View } from "react-native"

const EventDetails = () => {

    const { id } = useLocalSearchParams<{ id: string }>();

    const { data, isLoading, error } = useEventDetail(id)

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
            <Text>{data?.name}</Text>
        </View>
    )
}

export default EventDetails