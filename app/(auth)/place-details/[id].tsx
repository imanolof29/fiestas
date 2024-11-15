import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { Clock, Music, Star } from "lucide-react-native";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Linking } from "react-native"
import MapView, { Marker } from "react-native-maps";

const PlaceDetails = () => {

    const navigation = useNavigation()

    const comments = [
        { id: 1, author: 'Juan Pérez', text: '¡Gran ambiente! Música increíble y atención excelente.', date: '2024-11-10' },
        { id: 2, author: 'Maria López', text: 'La pista de baile es muy grande, pero podría mejorar la acústica.', date: '2024-11-12' },
        { id: 3, author: 'Carlos García', text: 'Recomiendo las horas después de medianoche, el ambiente se vuelve mucho mejor.', date: '2024-11-14' },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.headerImageContainer}>
                <Image source={{ uri: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=500&q=60' }} style={styles.headerImage} />
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => { navigation.goBack(); }}
                >
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.detailsContainer}>
                <Text style={styles.title}>{'Fever Club Bilbao'}</Text>
                <Text style={styles.subtitle}>{'Calle Particular de Allende 2, Bilbao'}</Text>
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
                    </View>
                </View>
                <View style={styles.commentsContainer}>
                    <Text style={styles.commentsTitle}>Comentarios</Text>
                    {comments.length > 0 ? (
                        comments.map((comment) => (
                            <View key={comment.id} style={styles.comment}>
                                <Text style={styles.commentAuthor}>{comment.author}</Text>
                                <Text style={styles.commentDate}>{comment.date}</Text>
                                <Text style={styles.commentText}>{comment.text}</Text>
                            </View>
                        ))
                    ) : (
                        <Text style={styles.noComments}>No hay comentarios aún.</Text>
                    )}
                </View>
            </ScrollView>
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
    backButton: {
        position: 'absolute',
        top: 40,
        left: 16,
        zIndex: 1,
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