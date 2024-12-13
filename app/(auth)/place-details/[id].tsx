import axiosInstance from "@/api";
import { MapComponent } from "@/components/MapComponent";
import { useCommentList } from "@/hooks/api/comment.hook";
import { usePlaceDetail } from "@/hooks/api/place.hook";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router/build/hooks";
import { Clock, Music, Send, Star } from "lucide-react-native";
import { View, Text, Image, StyleSheet, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from "react-native"

const PlaceDetails = () => {

    const router = useRouter()

    const { id } = useLocalSearchParams<{ id: string }>()

    const { data: placeDetail, isLoading: isPlaceLoading } = usePlaceDetail(id)

    const { data: commentList, isLoading: isCommentListLoading } = useCommentList(id)

    return (
        <View style={styles.container}>
            <View style={styles.headerImageContainer}>
                <Image source={{ uri: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=500&q=60' }} style={styles.headerImage} />
            </View>
            {placeDetail ? (
                <ScrollView contentContainerStyle={styles.detailsContainer}>
                    <Text style={styles.title}>{placeDetail?.name}</Text>
                    <Text style={styles.subtitle}>{placeDetail.city}</Text>
                    <View style={styles.infoContainer}>
                        <View style={styles.ratingContainer}>
                            <Star size={16} color="#FF5A36" fill="#FF5A36" />
                            <Text style={styles.ratingText}>Rating: {"4.8"}</Text>
                        </View>
                        <View style={styles.featuresContainer}>
                            <View style={styles.feature}>
                                <Clock size={16} color="#666" />
                                <Text style={styles.featureText}>{'23:30 - 06:00'}</Text>
                            </View>
                            <View style={styles.feature}>
                                <Music size={16} color="#666" />
                                <Text style={styles.featureText}>{'House / EDM'}</Text>
                            </View>
                            <TouchableOpacity onPress={() => router.push({
                                pathname: "/(auth)/(modals)/comments/[id]",
                                params: {
                                    id
                                }
                            })}>
                                <Ionicons name="chatbubble-outline" size={24} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.commentsContainer}>
                        <Text style={styles.commentsTitle}>Ubicacion</Text>
                        <MapComponent lat={placeDetail.position.coordinates[0]} lon={placeDetail.position.coordinates[1]} />
                    </View>
                </ScrollView>
            ) : (<ActivityIndicator />)}
        </View>
    );
}

export default PlaceDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    headerImageContainer: {
        width: '100%',
        height: 300,
        position: 'relative',
    },
    headerImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    detailsContainer: {
        padding: 16,
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
    map: {
        width: '100%',
        height: 250,
        marginBottom: 16,
    },
    infoContainer: {
        marginBottom: 16,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginBottom: 8,
    },
    ratingText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FF5A36',
    },
    featuresContainer: {
        marginTop: 16,
    },
    feature: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    featureText: {
        fontSize: 14,
        color: '#666',
        marginLeft: 8,
    },
    button: {
        backgroundColor: '#FF5A36',
        paddingVertical: 12,
        borderRadius: 4,
        marginTop: 16,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    commentsContainer: {
        marginTop: 24,
        marginBottom: 16,
    },
    commentsTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
    },
    comment: {
        marginBottom: 16,
    },
    commentAuthor: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    commentDate: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
    },
    commentText: {
        fontSize: 14,
        color: '#333',
    },
    noComments: {
        fontSize: 14,
        color: '#666',
    },
});