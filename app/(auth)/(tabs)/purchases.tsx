import { usePurchaseList } from "@/hooks/api/purchase.hook";
import { PurchaseDto } from "@/types/purchase";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { FlatList, StyleSheet, SafeAreaView, Text, TouchableOpacity, View } from "react-native";

export default function PurchasesScreen() {
    const { data, isLoading, error, hasNextPage, fetchNextPage } = usePurchaseList()

    const handleLoadMore = () => {
        if (hasNextPage) {
            fetchNextPage()
        }
    }

    const renderPurchaseItem = ({ item }: { item: PurchaseDto }) => {
        return (
            <Link href={`/(auth)/purchase-details/${item.id}`} asChild>
                <TouchableOpacity style={styles.purchaseContainer}>
                    <View style={styles.eventInfo}>
                        <Text style={styles.eventName}>{item.event.name}</Text>
                        <Text style={styles.eventDescription}>{item.event.description}</Text>
                    </View>
                    <View style={styles.purchaseInfo}>
                        <Text style={styles.date}>
                            {new Date(item.purchaseDate).toLocaleDateString()}
                        </Text>
                        <Text style={styles.quantity}>Cantidad: {item.quantity}</Text>
                        <Text style={styles.price}>
                            Precio: ${(item.event.price || 0) * item.quantity}
                        </Text>
                    </View>
                </TouchableOpacity>
            </Link>
        )
    }

    return (
        <SafeAreaView style={{ marginTop: 50 }}>
            <Text style={styles.title}>Mis Compras</Text>
            <FlatList
                data={data?.pages.flatMap(page => page.data)}
                renderItem={renderPurchaseItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
            />
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        padding: 20,
        textAlign: 'center',
    },
    listContent: {
        paddingHorizontal: 15,
    },
    purchaseContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    eventInfo: {
        marginBottom: 10,
    },
    eventName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    eventDescription: {
        fontSize: 14,
        color: '#666',
    },
    purchaseInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    date: {
        fontSize: 12,
        color: '#888',
    },
    quantity: {
        fontSize: 12,
        color: '#888',
    },
    price: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#2ecc71',
    },
    qrCode: {
        fontSize: 12,
        color: '#3498db',
    },
});