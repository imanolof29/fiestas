import { EventDto } from "@/types/event";
import { StyleSheet, View, Text, Image, Dimensions } from "react-native";

export default function EventCard(properties: { event: EventDto }) {
    return (
        <Text>{properties.event.name}</Text>
    )
}