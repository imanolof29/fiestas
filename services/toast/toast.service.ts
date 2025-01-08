import Toast from "react-native-toast-message";
import { ToastOptions } from "./toast.type";

export const showToast = (properties: ToastOptions) => {
    Toast.show({
        type: properties.type,
        text1: properties.title,
        text2: properties.message,
        position: "top"
    })
}