import { usePurchaseList } from "@/hooks/api/purchase.hook";
import { Link } from "expo-router";
import { FlatList, SafeAreaView, Text } from "react-native";

export default function PurchasesScreen() {
    const { data, isLoading, error, hasNextPage, fetchNextPage } = usePurchaseList()

    const handleLoadMore = () => {
        if (hasNextPage) {
            fetchNextPage()
        }
    }

    return (
        <SafeAreaView>
            <FlatList
                data={data?.pages.flatMap(page => page.data)}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <Link href={`/(auth)/purchase-details/${item.id}`} asChild><Text>{item.eventId}</Text></Link>}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
            />
        </SafeAreaView>
    )

}