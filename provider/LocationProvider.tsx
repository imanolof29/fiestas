import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import * as Location from 'expo-location';
import { LocationPermission } from "@/types/location-permission";
import { Alert } from "react-native";

interface LocationContextType {
    location: Location.LocationObject | null;
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
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [radius, setRadius] = useState<number>(5000)

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

    return (
        <LocationContext.Provider value={{ location, errorMsg, getCurrentLocation, radius, setRadius, checkLocationPermission, requestLocationPermission, manualPermissionRequest }}>
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