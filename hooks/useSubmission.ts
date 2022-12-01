import Cookies from "js-cookie";
import { api } from "../api";
import { ISubmission } from "../interfaces";

export const useSubmission = async (id: number): Promise<ISubmission> => {
    const { data } = await api.get<ISubmission>(`/submissions/${id}`, {
        headers: {
            'Authorization': `Bearer ${Cookies.get('XSRF-TOKEN')}`
        }
    });

    if (data.prescription) {
        const formattedPrescription = data
        .prescription
        .replace('text/plain', 'txt')
        .split('/')
        .at(-1)

        data.prescription = formattedPrescription!
    }

    return data;
}