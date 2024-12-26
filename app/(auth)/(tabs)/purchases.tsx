import { usePurchaseList } from "@/hooks/api/purchase.hook";
import { PurchaseDto } from "@/types/purchase";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from "react-native";

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
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
                    <View style={{ flexDirection: 'column', justifyContent: 'flex-start' }}>
                        <Text>{item.event.name}</Text>
                        <Text>{"11.11.2024"}</Text>
                    </View>
                    <Ionicons name="chevron-forward-outline" size={20} />
                </TouchableOpacity>
            </Link>
        )
    }

    return (
        <SafeAreaView style={{ marginTop: 50 }}>
            <FlatList
                data={data?.pages.flatMap(page => page.data)}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={renderPurchaseItem}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
            />
        </SafeAreaView>
    )

}