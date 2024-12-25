import { usePurchaseDetail } from '@/hooks/api/purchase.hook'
import { useLocalSearchParams } from 'expo-router'
import { View, Text, Image } from 'react-native'

const PurchaseDetail = () => {

    const { id } = useLocalSearchParams<{ id: string }>()

    const { data, isLoading } = usePurchaseDetail(id)

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {data && <Image
                style={{ borderRadius: 20 }}
                width={300}
                height={300}
                source={{ uri: data.qrCode }}
            />}
            <Text>Detalles</Text>
        </View>
    )
}

export default PurchaseDetail