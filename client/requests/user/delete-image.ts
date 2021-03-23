import axios from "axios";
import config from "../../config";
import { profileImageType } from "../../types/Profile";

export const deleteImage = async (formData: FormData, token: string, type: profileImageType) => {
    try {
        const request = `${config.serverURL}/user/delete-${type}`;
        const response = await axios.post(request, formData, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}