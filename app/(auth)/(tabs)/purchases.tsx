import { usePurchaseList } from "@/hooks/api/purchase.hook";
import { FlatList, Text } from "react-native";

export default function PurchasesScreen() {
    const { data, isLoading, error, hasNextPage, fetchNextPage } = usePurchaseList()

    const handleLoadMore = () => {
        if (hasNextPage) {
            fetchNextPage()
        }
    }

    return (
        <FlatList
            data={data?.pages.flatMap(page => page.data)}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Text>{item.eventId}</Text>}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
        />
    )

}