import { useAuth } from "@/provider/AuthProvider"
import { Link } from "expo-router"
import { useState } from "react"
import { StyleSheet, View, TextInput, Text, TouchableOpacity } from "react-native"
import * as WebBrowser from "expo-web-browser"
import { GoogleSignin, GoogleSigninButton } from "@react-native-google-signin/google-signin"

WebBrowser.maybeCompleteAuthSession()

GoogleSignin.configure({
    webClientId: "1011914220034-g1i51hc2l26qjjltppqopb2cu63ti10p.apps.googleusercontent.com",
    scopes: ['profile', 'email'],
    offlineAccess: true,
    forceCodeForRefreshToken: false,
    iosClientId: "1011914220034-g6hp7vcv2e3vjoa4bcqpfueqa2fh687j.apps.googleusercontent.com"
})

const Page = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [loading, setLoading] = useState(false)

    const { login, signInWithGoogle } = useAuth()

    const googleSignIn = async () => {
        try {
            await GoogleSignin.hasPlayServices()
            const user = await GoogleSignin.signIn()
            if (user.data?.idToken) {
                signInWithGoogle(user.data.idToken)
            }
        } catch (e) {
            console.log(e)
        }
    }

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
            <GoogleSigninButton
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={googleSignIn}
            />
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