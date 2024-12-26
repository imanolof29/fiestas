import { Button, View, Text } from 'react-native'
import * as SecureStore from 'expo-secure-store';
import { useState } from 'react';

const Page = () => {

    const [language, setLanguage] = useState(SecureStore.getItem("language"))

    const setCurrentLanguage = (lang: string) => {
        SecureStore.setItem("languge", lang)
        setLanguage(lang)
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{language}</Text>
            <Button title='Euskera' onPress={() => setCurrentLanguage("eu")} />
            <Button title='Español' onPress={() => setCurrentLanguage("es")} />
        </View>
    )
}

export default Page