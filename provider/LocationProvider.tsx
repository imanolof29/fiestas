import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import * as Location from 'expo-location';

interface LocationContextType {
    location: Location.LocationObject | null;
    errorMsg: string | null;
    radius: number
    setRadius: (value: number) => void
    getCurrentLocation: () => Promise<void>;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider = ({ children }: PropsWithChildren) => {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [radius, setRadius] = useState<number>(5000)

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
        <LocationContext.Provider value={{ location, errorMsg, getCurrentLocation, radius, setRadius }}>
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