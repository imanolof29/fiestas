import { useLocation } from "@/provider/LocationProvider";
import Slider from "@react-native-community/slider"
import { useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"

const Page = () => {

    const router = useRouter()

    const { t } = useTranslation()

    const { radius, setRadius } = useLocation();

    const [tempRadius, setTempRadius] = useState(Math.round(radius))

    const handleRadiusChange = (distance: number) => {
        setTempRadius(Math.round(distance))
    };

    const applyRadiusChange = () => {
        setRadius(tempRadius)
        router.back()
    }

    return (
        <View style={styles.contentContainer}>
            <View style={{ flex: 1, padding: 16 }}>
                <Text style={styles.title}>Filtrar por distancia</Text>
                <View style={styles.filterSection}>
                    <Text style={styles.sectionTitle}>Distancia: {tempRadius / 1000} km</Text>
                    <Slider
                        value={tempRadius}
                        onValueChange={handleRadiusChange}
                        minimumValue={1000}
                        maximumValue={200000}
                        step={1}
                    />
                </View>
                <TouchableOpacity onPress={applyRadiusChange} style={styles.filterButton}>
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: '600', textAlign: 'center' }}>{t('filter.apply')}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Page

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 16,
    },
    filterSection: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
    },
    filterButton: {
        padding: 10,
        backgroundColor: '#FF4500',
        borderRadius: 10,
        color: 'white',
    },
})