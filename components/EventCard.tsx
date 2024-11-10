import { EventDto } from "@/types/event";
import { Link } from "expo-router";
import { Text } from "react-native";

export default function EventCard(properties: { event: EventDto }) {
    return (
        <Link href={`/(auth)/event-details/${properties.event.id}`}>
            <Text>{properties.event.name}</Text>
        </Link>
    )
}