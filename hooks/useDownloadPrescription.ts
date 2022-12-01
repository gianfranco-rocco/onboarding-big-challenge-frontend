import Cookies from "js-cookie";
import { api } from "../api";

export const useDownloadPrescription = (submissionId: number) => {
    api.get(`/download/${submissionId}`, {
        headers: {
            'Authorization': `Bearer ${Cookies.get('XSRF-TOKEN')}`
        }
    })
    .then(res => {
        const binaryData = [res.data]

        // create file link in browser's memory
        const href = URL.createObjectURL(new Blob(binaryData, { type: 'application/plain' }));

        // create "a" HTML element with href to file & click
        const link = document.createElement('a');
        link.href = href;
        link.setAttribute('download', 'file.txt'); //or any other extension
        document.body.appendChild(link);
        link.click();

        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
    })
}