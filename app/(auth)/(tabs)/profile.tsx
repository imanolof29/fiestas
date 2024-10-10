import { useAuth } from "@/provider/AuthProvider";
import { View, Text, TouchableOpacity } from "react-native";

export default function Profile() {

    const { session, onLogout } = useAuth()

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{session?.email}</Text>
            <TouchableOpacity onPress={onLogout}>
                <Text>Cerrar sesion</Text>
            </TouchableOpacity>
        </View>
    )
}