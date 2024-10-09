import { StyleSheet, View, Text, Image, Dimensions } from "react-native";

export default function EventCard(event: any) {
    return (
        <Text>{event.name}</Text>
    )
}