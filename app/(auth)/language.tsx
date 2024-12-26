import { Button, View } from 'react-native'
import * as SecureStore from 'expo-secure-store';

const Page = () => {

    const setLanguage = (lang: string) => {
        SecureStore.setItem("languge", lang)
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button title='Euskera' onPress={() => setLanguage("eu")} />
            <Button title='Español' onPress={() => setLanguage("es")} />
        </View>
    )
}

export default Page