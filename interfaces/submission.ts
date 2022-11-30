import { IPaginationLinks, IPaginationMeta } from "../components/ui/tables";
import { SubmissionStatus } from "../types";
import { IUser } from "./user";

export interface ISubmission {
    id: number;
    title: string;
    doctor: IUser | null;
    symptoms?: string;
    status: SubmissionStatus;
    patient: IUser;
    created_at: string;
    prescription: string | null;
}

export interface GetSubmissionsResponse {
    data: ISubmission[];
    links: IPaginationLinks;
    meta: IPaginationMeta;
}