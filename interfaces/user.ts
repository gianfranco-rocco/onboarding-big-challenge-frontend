import { IRole } from '@interfaces'

export interface IPatientInfo {
    phone: string;
    weight: string;
    height: string;
    info: string;
}

export interface IUser {
    id: number;
    name: string;
    email: string;
    info?: IPatientInfo | null;
    roles: IRole[];
}

export type UserType = 'patient' | 'doctor'
