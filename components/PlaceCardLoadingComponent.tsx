import { View, StyleSheet } from 'react-native'

export const PlaceCardLoadingComponent = () => {
    return (
        <View style={styles.skeletonContainer}>
            <View style={styles.skeletonImage} />
            <View style={styles.skeletonInfo}>
                <View style={styles.skeletonHeader}>
                    <View style={styles.skeletonText} />
                    <View style={styles.skeletonRating} />
                </View>
                <View style={styles.skeletonDetails}>
                    <View style={styles.skeletonText} />
                </View>
                <View style={styles.skeletonFeatures}>
                    <View style={styles.skeletonFeature} />
                    <View style={styles.skeletonFeature} />
                    <View style={styles.skeletonFeature} />
                </View>
            </View>
        </View>
    )
}

export const styles = StyleSheet.create({
    skeletonContainer: {
        flexDirection: 'row',
        padding: 16,
        margin: 4,
        borderRadius: 4,
        backgroundColor: '#f0f0f0',
    },
    skeletonImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        backgroundColor: '#e0e0e0',
    },
    skeletonInfo: {
        flex: 1,
    },
    skeletonHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    skeletonText: {
        width: '60%',
        height: 14,
        backgroundColor: '#e0e0e0',
        borderRadius: 4,
    },
    skeletonRating: {
        width: '30%',
        height: 14,
        backgroundColor: '#e0e0e0',
        borderRadius: 4,
    },
    skeletonDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    skeletonFeatures: {
        flexDirection: 'row',
        gap: 12,
    },
    skeletonFeature: {
        width: '30%',
        height: 14,
        backgroundColor: '#e0e0e0',
        borderRadius: 4,
    },
})