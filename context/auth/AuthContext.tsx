import { createContext } from 'react';
import { RegisterFormValues } from '../../app/auth/register/page';
import { IUser } from '../../interfaces';

export interface LoginRegisterResponse {
  success: boolean;
  message: string;
  user?: IUser;
}

interface ContextProps {
  user?: IUser;
  login: (email: string, password: string) => Promise<LoginRegisterResponse>;
  register: (data: RegisterFormValues) => Promise<LoginRegisterResponse>;
}

export const AuthContext = createContext({} as ContextProps);