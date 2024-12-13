import axiosInstance from ".."

export const uploadUserProfileImage = async (file: Blob) => {
    const formdata = new FormData()
    formdata.append('file', file)
    const response = await axiosInstance.post('/users/profile-picture', formdata)
    return response.data
}