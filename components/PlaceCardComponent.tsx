import { PlaceDto } from "@/types/place";
import { Link } from "expo-router";
import { Clock, MapPin, Music, Star } from "lucide-react-native";
import { TouchableOpacity, StyleSheet, View, Image, Text } from "react-native";

type PlaceCardProperties = {
    place: PlaceDto
}

export const PlaceCard = (properties: PlaceCardProperties) => (
    <Link href={`/(auth)/place-details/1`} asChild>
        <TouchableOpacity style={styles.discoCard}>
            <Image source={{ uri: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=500&q=60' }} style={styles.discoImage} />
            <View style={styles.discoInfo}>
                <View style={styles.discoHeader}>
                    <Text style={styles.discoName}>{properties.place.name}</Text>
                    <View style={styles.ratingContainer}>
                        <Star size={16} color="#FF5A36" fill="#FF5A36" />
                        <Text style={styles.ratingText}>{"4.6"}</Text>
                    </View>
                </View>
                <View style={styles.discoDetails}>
                    <MapPin size={16} color="#666" />
                    <Text style={styles.discoAddress}>{"Calle Particular de Allende 2, Bilbao"}</Text>
                </View>
                <View style={styles.discoFeatures}>
                    <View style={styles.feature}>
                        <Clock size={14} color="#666" />
                        <Text style={styles.featureText}>{"00:00 - 06:30"}</Text>
                    </View>
                    <View style={styles.feature}>
                        <Music size={14} color="#666" />
                        <Text style={styles.featureText}>{"Electronic / Techno"}</Text>
                    </View>
                    <View style={styles.feature}>
                        <Text style={styles.featureText}>{"€€€"}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    </Link>
);

const styles = StyleSheet.create({
    discoCard: {
        flexDirection: 'row',
        padding: 16,
        margin: 4,
        borderRadius: 4,
        backgroundColor: 'white'
    },
    discoImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 12,
    },
    discoInfo: {
        flex: 1,
    },
    discoHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    discoName: {
        fontSize: 16,
        fontWeight: '600',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        marginLeft: 4,
        color: '#FF5A36',
        fontWeight: '600',
    },
    discoDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    discoAddress: {
        marginLeft: 4,
        color: '#666',
        fontSize: 14,
    },
    discoFeatures: {
        flexDirection: 'row',
        gap: 12,
    },
    feature: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    featureText: {
        fontSize: 12,
        color: '#666',
    },
});
