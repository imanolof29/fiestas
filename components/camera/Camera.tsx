import { CameraType, CameraView, useCameraPermissions } from "expo-camera"
import { useRef, useState } from "react"
import { View, StyleSheet, Text, Button, TouchableOpacity } from "react-native"
import { PhotoPreview } from "./PhotoPreview"
import { AntDesign } from "@expo/vector-icons"

export const Camera = () => {

    const [facing, setFacing] = useState<CameraType>("front")
    const [permission, requestPermission] = useCameraPermissions()
    const [photo, setPhoto] = useState<any>(null)
    const cameraRef = useRef<CameraView | null>(null)

    const toggleCameraFacing = () => {
        setFacing(current => (current === 'back' ? 'front' : 'back'))
    }

    const handleTakePhoto = async () => {
        if (cameraRef.current) {
            const options = {
                quality: 1,
                base64: true,
                exit: true
            }
            const takenPhoto = await cameraRef.current.takePictureAsync(options)
            setPhoto(takenPhoto)
        }
    }

    if (!permission) {
        return <View />
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>Necesitamos permiso para acceder a la camara</Text>
                <Button onPress={requestPermission} title="Pedir permisos" />
            </View>
        )
    }

    if (photo) return <PhotoPreview photo={photo} handleRetakePhoto={handleTakePhoto} />

    return (
        <View style={styles.container}>
            <CameraView style={styles.camera} facing={facing}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                        <AntDesign name='retweet' size={44} color='black' />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
                        <AntDesign name='camera' size={44} color='black' />
                    </TouchableOpacity>
                </View>
            </CameraView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
        marginHorizontal: 10,
        backgroundColor: 'gray',
        borderRadius: 10,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});