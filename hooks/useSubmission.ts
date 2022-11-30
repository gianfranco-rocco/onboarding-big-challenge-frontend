import Cookies from "js-cookie";
import { api } from "../api";
import { ISubmission } from "../interfaces";

export const useSubmission = async (id: number): Promise<ISubmission> => {
    const { data } = await api.get<ISubmission>(`/submissions/${id}`, {
        headers: {
            'Authorization': `Bearer ${Cookies.get('XSRF-TOKEN')}`
        }
    });

    return data;
}