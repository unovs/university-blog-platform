import axios from "axios";
import config from "../../config";
import { IProfileList } from "../../types/Profile";

export const getListSubscriptions = async (userId: number, count: number = 10, offset: number = 0): Promise<IProfileList> => {
    try {
        const request = `${config.serverURL}/user/subscriptions/users?count=${count}&offset=${offset}&userId=${userId}`;
        const response = await axios.get(request);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

