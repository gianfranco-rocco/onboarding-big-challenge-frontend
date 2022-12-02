import { createContext } from 'react';
import { RegisterFormValues } from '@app/auth/register/page';
import { IUser, IPatientInfo } from '@interfaces';

export interface Response {
  success: boolean;
  message?: string;
}

export type LoginRegisterResponse = Response & { user?: IUser }

interface ContextProps {
  user?: IUser;
  login: (email: string, password: string) => Promise<LoginRegisterResponse>;
  register: (data: RegisterFormValues) => Promise<LoginRegisterResponse>;
  logout: () => Promise<Response>;
  updatePatientInfo: (data: IPatientInfo) => Promise<Response>;
}

export const AuthContext = createContext({} as ContextProps);