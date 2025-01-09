import axiosInstance from "@/api"

export const uploadUserProfileImage = async (file: Blob) => {
    const formdata = new FormData()
    formdata.append('file', file)
    const response = await axiosInstance.post('/users/profile-picture', formdata)
    return response.data
}

export const registerPushNotificationToken = async (token: string) => {
    const response = await axiosInstance.post('/users/push-notification-token', { token })
    return response.data
}