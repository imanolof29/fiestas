import { useEffect, useState } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from 'expo-location';
import { useEventList } from "@/api/events";
import MapSearchBar from "@/components/MapSearchBar";
import FilterButton from "@/components/FilterButton";
import { Ionicons } from "@expo/vector-icons";

export default function FiestaMap() {

    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const { data, isLoading, error } = useEventList()

    useEffect(() => {
        (async () => {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('Permission to access location was denied');
                    return;
                }

                let currentLocation = await Location.getCurrentPositionAsync({});
                setLocation(currentLocation);
            } catch (error) {
                setErrorMsg('Error obtaining location');
            }
        })();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = `Lat: ${location.coords.latitude}, Lon: ${location.coords.longitude}`;
    }

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
        <View style={styles.container}>
            {location ? (
                <View>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                            latitudeDelta: 0.005,
                            longitudeDelta: 0.005,
                        }}
                        showsUserLocation={true}
                    >
                        {data && data.map((event: any) => {
                            const [latitude, longitude] = event.position.coordinates
                            return (
                                <Marker key={event.id} coordinate={{ latitude, longitude }} title={event.name}>
                                    <Ionicons style={{ color: 'red' }} size={40} name="location" />
                                </Marker>
                            )
                        })}
                    </MapView>
                    <View style={{ position: 'absolute', top: 50, left: 20, right: 20, flexDirection: 'row', gap: 10 }}>
                        <MapSearchBar />
                        <FilterButton onPress={() => { }} />
                    </View>
                </View>
            ) : (
                <Text>Waiting for location...</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        width: '100%',
        height: '100%'
    }
})