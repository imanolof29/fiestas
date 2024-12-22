import { useAuth } from "@/provider/AuthProvider"
import { Link } from "expo-router"
import { useState } from "react"
import { StyleSheet, View, TextInput, Text, TouchableOpacity } from "react-native"
import * as WebBrowser from "expo-web-browser"
import * as Google from "expo-auth-session/providers/google"

WebBrowser.maybeCompleteAuthSession()

const Page = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [loading, setLoading] = useState(false)

    const { login } = useAuth()

    const config = {
        webClientId: "",
        iosClientId: "",
        androidClientId: "",
    }

    const [response, request, promptAsync] = Google.useIdTokenAuthRequest({
        webClientId: config.webClientId,
        iosClientId: config.iosClientId,
        androidClientId: config.androidClientId,
    })

    const handleSubmit = () => {
        login(email, password)
    }

    return (
        <View style={styles.container}>
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.inputField} />
            <TextInput secureTextEntry placeholder="Contraseña" value={password} onChangeText={setPassword} style={styles.inputField} />
            <TouchableOpacity onPress={handleSubmit}>
                <Text>Iniciar sesion</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => promptAsync()}>
                <Text>Iniciar sesion con google</Text>
            </TouchableOpacity>
            <Link href={"/(public)/register"} style={styles.button} asChild>
                <Text>Crear cuenta</Text>
            </Link>
        </View>
    )
}

export default Page

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20
    },
    inputField: {
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        marginVertical: 10
    },
    button: {
        marginTop: 20,
        alignItems: 'center'
    }
})