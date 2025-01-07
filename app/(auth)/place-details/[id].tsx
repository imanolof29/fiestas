import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Dimensions, Button, FlatList } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Clock, Music, Star, DollarSign, Users, Camera } from "lucide-react-native";
import { usePlaceDetail } from "@/hooks/api/place.hook";
import { useCommentList } from "@/hooks/api/comment.hook";
import { MapComponent } from "@/components/MapComponent";
import { useTranslation } from 'react-i18next';
import { usePostList } from '@/hooks/api/post.hook';
import { PostDto } from '@/types/post';
import { ImageCarousel } from '@/components/ImageCarousel';

const { width } = Dimensions.get('window');

const PlaceDetails = () => {
    const { t } = useTranslation()
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();
    const { data: placeDetail, isLoading: isPlaceLoading } = usePlaceDetail(id);
    const { data: commentList, isLoading: isCommentListLoading } = useCommentList(id);
    const { data: postList, isLoading: isPostListLoading } = usePostList(id)
    const [showFullDescription, setShowFullDescription] = useState(false);

    if (isPlaceLoading || !placeDetail) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#FF5A36" />
            </View>
        );
    }

    const truncatedDescription = placeDetail.description?.slice(0, 100) + "...";

    const handleCreateClick = () => {
        router.push({
            pathname: "/(auth)/create-post/[id]",
            params: { id }
        })
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.headerImageContainer}>
                <Image source={{ uri: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=500&q=60' }} style={styles.headerImage} />
                <View style={styles.imageOverlay}>
                    <Text style={styles.overlayText}>{placeDetail.name}</Text>
                    <Text style={styles.overlaySubtext}>{placeDetail.city}</Text>
                </View>
            </View>

            <View style={styles.detailsContainer}>
                <View style={styles.infoContainer}>
                    <View style={styles.ratingContainer}>
                        <Star size={20} color="#FF5A36" fill="#FF5A36" />
                        <Text style={styles.ratingText}>4.8 (234 reviews)</Text>
                    </View>
                    <View style={styles.featuresContainer}>
                        <FeatureItem icon={<Clock size={16} color="#666" />} text="23:30 - 06:00" />
                        <FeatureItem icon={<Music size={16} color="#666" />} text="House / EDM" />
                        <FeatureItem icon={<DollarSign size={16} color="#666" />} text="$$$" />
                        <FeatureItem icon={<Users size={16} color="#666" />} text="500+ capacity" />
                    </View>
                </View>

                <Text style={styles.sectionTitle}>{t('placeDetail.about')}</Text>
                <Text style={styles.description}>
                    {showFullDescription ? placeDetail.description : truncatedDescription}
                </Text>
                {!showFullDescription && (
                    <TouchableOpacity onPress={() => setShowFullDescription(true)}>
                        <Text style={styles.readMore}>{t('placeDetail.readMore')}</Text>
                    </TouchableOpacity>
                )}

                <Text style={styles.sectionTitle}>{t('placeDetail.location')}</Text>
                <View style={styles.mapContainer}>
                    <MapComponent lat={placeDetail.position.coordinates[0]} lon={placeDetail.position.coordinates[1]} />
                </View>

                <Text style={styles.sectionTitle}>Fotos</Text>


                <ImageCarousel posts={postList?.data} onAddPress={handleCreateClick} />

                <View style={styles.commentsContainer}>
                    <View style={styles.commentHeader}>
                        <Text style={styles.sectionTitle}>{t('placeDetail.photos')}</Text>
                        <TouchableOpacity
                            style={styles.viewAllButton}
                            onPress={() => router.push({
                                pathname: "/(auth)/(modals)/comments/[id]",
                                params: { id }
                            })}
                        >
                            <Text style={styles.viewAllText}>Ver todos</Text>
                            <Ionicons name="arrow-forward" size={16} color="#FF5A36" />
                        </TouchableOpacity>
                    </View>
                    {isCommentListLoading ? (
                        <ActivityIndicator size="small" color="#FF5A36" />
                    ) : commentList && commentList.data.length > 0 ? (
                        commentList.data.slice(0, 2).map((comment) => (
                            <View key={comment.id} style={styles.comment}>
                                <Text style={styles.commentAuthor}>{comment.user.username}</Text>
                                <Text style={styles.commentDate}>{new Date(comment.created).toLocaleDateString()}</Text>
                                <Text style={styles.commentText}>{comment.content}</Text>
                            </View>
                        ))
                    ) : (
                        <Text style={styles.noComments}>{t('placeDetail.noComments')}</Text>
                    )}
                </View>
            </View>
        </ScrollView>
    );
}

const FeatureItem = ({ icon, text }: { icon: any, text: string }) => (
    <View style={styles.feature}>
        {icon}
        <Text style={styles.featureText}>{text}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        left: 20,
        zIndex: 10,
    },
    imageOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 16,
    },
    overlayText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    overlaySubtext: {
        color: 'white',
        fontSize: 16,
    },
    detailsContainer: {
        padding: 16,
    },
    infoContainer: {
        marginBottom: 24,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    ratingText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FF5A36',
        marginLeft: 8,
    },
    featuresContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    feature: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '48%',
        marginBottom: 12,
    },
    featureText: {
        fontSize: 14,
        color: '#666',
        marginLeft: 8,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
    },
    description: {
        fontSize: 14,
        color: '#333',
        lineHeight: 20,
        marginBottom: 8,
    },
    readMore: {
        color: '#FF5A36',
        fontWeight: '600',
    },
    mapContainer: {
        marginBottom: 24,
    },
    addressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    addressText: {
        fontSize: 14,
        color: '#666',
        marginLeft: 8,
    },
    photoScroll: {
        marginBottom: 24,
    },
    photo: {
        width: width * 0.7,
        height: 200,
        borderRadius: 8,
        marginRight: 12,
    },
    commentsContainer: {
        marginBottom: 24,
    },
    commentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    viewAllButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    viewAllText: {
        color: '#FF5A36',
        fontWeight: '600',
        marginRight: 4,
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

export default PlaceDetails;

