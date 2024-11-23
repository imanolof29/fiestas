import { useEffect, useMemo, useRef } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapSearchBar from "@/components/MapSearchBar";
import FilterButton from "@/components/FilterButton";
import { Ionicons } from "@expo/vector-icons";
import { usePlaceList } from "@/api/places";
import { PlaceDto } from "@/types/place";
import { useLocation } from "@/provider/LocationProvider";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";


export default function FiestaMap() {

    const { location, radius, getCurrentLocation } = useLocation();

    const snapPoints = useMemo(() => [80, '50%', '90%'], []);

    const bottomSheetRef = useRef<BottomSheet>(null);


    useEffect(() => {
        getCurrentLocation();
    }, []);

    const { data, isLoading, error } = usePlaceList(
        location?.coords.latitude ?? 0,
        location?.coords.longitude ?? 0,
        radius
    );

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
                        {data?.data && data.data.map((place: PlaceDto) => {
                            const [latitude, longitude] = place.position.coordinates
                            return (
                                <Marker key={place.id} coordinate={{ latitude, longitude }} title={place.name}>
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
            <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints}>
                <BottomSheetView style={{ flex: 1 }}>
                    <Text>Este es mi bottom sheet</Text>
                </BottomSheetView>
            </BottomSheet>
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