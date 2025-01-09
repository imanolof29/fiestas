import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import * as Location from 'expo-location';
import { LocationPermission } from "@/types/location-permission";
import { Alert } from "react-native";
import axiosInstance from "@/services/api";


interface LocationContextType {
    location: Location.LocationObject | null;
    locationName: string
    errorMsg: string | null;
    radius: number
    setRadius: (value: number) => void
    getCurrentLocation: () => Promise<void>;
    requestLocationPermission: () => Promise<LocationPermission>;
    checkLocationPermission: () => Promise<LocationPermission>;
    manualPermissionRequest: () => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider = ({ children }: PropsWithChildren) => {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [locationName, setLocationName] = useState<string>("")
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [radius, setRadius] = useState<number>(5000)

    useEffect(() => {
        geoCoding()
    }, [location])

    const requestLocationPermission = async (): Promise<LocationPermission> => {
        const { status } = await Location.requestBackgroundPermissionsAsync();
        if (status === 'granted') {
            if (status === 'granted') {

            }
            return LocationPermission.DENIED
        }
        return LocationPermission.GRANTED
    }

    const checkLocationPermission = async (): Promise<LocationPermission> => {
        const { status } = await Location.getBackgroundPermissionsAsync();
        switch (status) {
            case 'granted':
                return LocationPermission.GRANTED
            case 'denied':
                return LocationPermission.DENIED
            default:
                return LocationPermission.UNDETERMINED
        }
    }

    const manualPermissionRequest = async () => {
        Alert.alert(
            'Permisos de ubicación',
            'Para poder utilizar la aplicación necesitamos acceder a tu ubicación',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
            ]
        )
    }

    const getCurrentLocation = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation);
            setErrorMsg(null);
        } catch (error) {
            setErrorMsg('Failed to fetch location');
            console.error(error);
        }
    };

    const geoCoding = async () => {
        if (!location) return
        const response = await axiosInstance.get("places/geocoding", {
            params: {
                lat: location.coords.latitude,
                lon: location.coords.longitude
            }
        })
        setLocationName(response.data.name)
    }

    return (
        <LocationContext.Provider value={{ location, errorMsg, getCurrentLocation, radius, setRadius, checkLocationPermission, requestLocationPermission, manualPermissionRequest, locationName }}>
            {children}
        </LocationContext.Provider>
    );
};

export const useLocation = (): LocationContextType => {
    const context = useContext(LocationContext);
    if (!context) {
        throw new Error('useLocation must be used within a LocationProvider');
    }
    return context;
};