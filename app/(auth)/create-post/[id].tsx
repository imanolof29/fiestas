import { CameraCapturedPicture, CameraType, CameraView, useCameraPermissions } from "expo-camera"
import { useEffect, useRef, useState } from "react"
import { View, StyleSheet, Text, Button, TouchableOpacity, Alert } from "react-native"

import { Ionicons } from "@expo/vector-icons"

import { PhotoPreview } from "@/components/camera/PhotoPreview"
import { useLocalSearchParams, useRouter } from "expo-router"
import { showToast } from "@/services/toast/toast.service"
import { useCreatePlacePost } from "@/hooks/api/post.hook"

const Page = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [photo, setPhoto] = useState<CameraCapturedPicture | undefined>();
    const cameraRef = useRef<CameraView | null>(null);

    const navigation = useRouter()

    const { handleSubmit, error } = useCreatePlacePost()

    useEffect(() => {
        if (error) {
            showToast({ type: "error", title: "Algo fue mal" })
        }
    }, [error])

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    const handleTakePhoto = async () => {
        if (cameraRef.current) {
            const options = {
                quality: 1,
                base64: true,
                exif: false,
            };
            const takedPhoto = await cameraRef.current.takePictureAsync(options);

            setPhoto(takedPhoto);
        }
    };

    const handleRetakePhoto = () => setPhoto(undefined);

    if (photo) return <PhotoPreview photo={photo} handleRetakePhoto={handleRetakePhoto} handleSend={async () => {
        try {
            const response = await fetch(photo.uri)
            const blob = await response.blob()
            handleSubmit(id, { uri: photo.uri, base64: photo.base64!, type: blob.type, name: "" })
            navigation.back()
        } catch (e) {
            Alert.alert("Algo fue mal")
        }
    }} />

    return (
        <View style={styles.container}>
            <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
                <View style={styles.topContainer}>
                    <TouchableOpacity onPress={toggleCameraFacing}>
                        <Ionicons name="camera-reverse-outline" size={24} color={"white"} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="flash-outline" size={24} color={"white"} />
                    </TouchableOpacity>
                </View>
                <View style={styles.bottomContainer}>
                    <View style={styles.photoButtonContainer}>
                        <TouchableOpacity style={styles.photoButton} onPress={handleTakePhoto} />
                    </View>
                </View>
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
    },
    topContainer: {
        position: "absolute",
        flexDirection: "row",
        justifyContent: "space-between",
        top: 75,
        left: 0,
        right: 0,
        paddingHorizontal: 20
    },
    bottomContainer: {
        position: "absolute",
        bottom: 75,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    photoButtonContainer: {
        width: 85,
        height: 85,
        borderWidth: 2,
        borderColor: '#eee',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },

    photoButton: {
        width: 75,
        height: 75,
        backgroundColor: '#eee',
        borderRadius: 100,
    },
});

export default Page