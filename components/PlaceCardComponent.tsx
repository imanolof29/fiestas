import { Clock, MapPin, Music, Star } from "lucide-react-native";
import { TouchableOpacity, StyleSheet, View, Image, Text } from "react-native";

export const DiscoCard = ({ disco }: any) => (
    <TouchableOpacity style={styles.discoCard}>
        <Image source={{ uri: disco.image }} style={styles.discoImage} />
        <View style={styles.discoInfo}>
            <View style={styles.discoHeader}>
                <Text style={styles.discoName}>{disco.name}</Text>
                <View style={styles.ratingContainer}>
                    <Star size={16} color="#FF5A36" fill="#FF5A36" />
                    <Text style={styles.ratingText}>{disco.rating}</Text>
                </View>
            </View>
            <View style={styles.discoDetails}>
                <MapPin size={16} color="#666" />
                <Text style={styles.discoAddress}>{disco.address}</Text>
            </View>
            <View style={styles.discoFeatures}>
                <View style={styles.feature}>
                    <Clock size={14} color="#666" />
                    <Text style={styles.featureText}>{disco.openHours}</Text>
                </View>
                <View style={styles.feature}>
                    <Music size={14} color="#666" />
                    <Text style={styles.featureText}>{disco.musicType}</Text>
                </View>
                <View style={styles.feature}>
                    <Text style={styles.featureText}>{disco.price}</Text>
                </View>
            </View>
        </View>
    </TouchableOpacity>
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
