import { usePurchaseDetail } from '@/hooks/api/purchase.hook'
import { useLocalSearchParams } from 'expo-router'
import { View, Image, ActivityIndicator } from 'react-native'

const PurchaseDetail = () => {

    const { id } = useLocalSearchParams<{ id: string }>()

    const { data, isLoading } = usePurchaseDetail(id)

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {isLoading && <ActivityIndicator />}
            {data && <Image
                style={{ borderRadius: 20 }}
                width={300}
                height={300}
                source={{ uri: data.qrCode }}
            />}
        </View>
    )
}

export default PurchaseDetail