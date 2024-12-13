import MapView, { Marker } from "react-native-maps"
import { StyleSheet, View } from "react-native"

interface MapComponentProps {
    lat: number
    lon: number
}

export const MapComponent = (props: MapComponentProps) => {

    return (
        <View style={styles.container}>
            <MapView style={styles.container} initialRegion={{
                latitude: props.lat,
                longitude: props.lon,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
            }}>
                <Marker coordinate={{ latitude: props.lat, longitude: props.lon }} />
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 200,
        width: "100%",
        borderRadius: 10
    }
})