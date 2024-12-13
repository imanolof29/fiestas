import { useAuth } from "@/provider/AuthProvider"
import { Link } from "expo-router"
import { useState } from "react"
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native"

const Page = () => {

    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [username, setUsername] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const { register } = useAuth()

    const handleSubmit = () => {
        register(firstName, lastName, username, email, password)
    }

    return (
        <View style={styles.container}>
            <TextInput placeholder="Nombre" value={firstName} onChangeText={setFirstName} style={styles.inputField} />
            <TextInput placeholder="Apellido" value={lastName} onChangeText={setLastName} style={styles.inputField} />
            <TextInput placeholder="Nombre de usuario" value={username} onChangeText={setUsername} style={styles.inputField} />
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.inputField} />
            <TextInput secureTextEntry placeholder="Contraseña" value={password} onChangeText={setPassword} style={styles.inputField} />
            <TouchableOpacity onPress={handleSubmit}>
                <Text>Iniciar sesion</Text>
            </TouchableOpacity>
            <Link href={"/(public)/login"} style={styles.button} asChild>
                <Text>Crear cuenta</Text>
            </Link>
        </View>
    )
}

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

export default Page