import { PostDto } from "@/types/post";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
    Dimensions,
    View,
    Image,
    TouchableOpacity,
    FlatList,
    Text,
    StyleSheet
} from "react-native";

type ImageCarouselProps = {
    posts?: PostDto[]
    onAddPress: () => void
}

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.35;

export const ImageCarousel = (properties: ImageCarouselProps) => {
    const renderPhoto = ({ item }: { item: PostDto }) => (
        <TouchableOpacity style={styles.imageContainer}>
            <Image
                source={{ uri: item.photo }}
                style={styles.image}
                resizeMode="cover"
            />
        </TouchableOpacity>
    );

    const renderAddButton = () => (
        <TouchableOpacity style={styles.actionButton} onPress={properties.onAddPress}>
            <MaterialIcons name="add-a-photo" size={32} color="#666" />
            <Text style={styles.actionButtonText}>Añadir foto</Text>
        </TouchableOpacity>
    );

    const renderMoreButton = () => (
        <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="images-outline" size={32} color="#666" />
            <Text style={styles.actionButtonText}>Más fotos</Text>
        </TouchableOpacity>
    );

    return (
        <FlatList
            data={properties.posts}
            renderItem={renderPhoto}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.container}
            ListFooterComponent={() => (
                <View style={styles.footerContainer}>
                    {renderAddButton()}
                    {renderMoreButton()}
                </View>
            )}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 8,
    },
    imageContainer: {
        width: ITEM_WIDTH,
        height: ITEM_WIDTH,
        marginRight: 8,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    footerContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    actionButton: {
        width: ITEM_WIDTH,
        height: ITEM_WIDTH,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionButtonText: {
        marginTop: 8,
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
});