import { createContext } from 'react';
import { RegisterFormValues } from '../../app/auth/register/page';
import { IUser } from '../../interfaces';

export interface LoginRegisterResponse {
  success: boolean;
  message: string;
  user?: IUser;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

interface ContextProps {
  user?: IUser;
  login: (email: string, password: string) => Promise<LoginRegisterResponse>;
  register: (data: RegisterFormValues) => Promise<LoginRegisterResponse>;
  logout: () => Promise<LogoutResponse>;
}

export const AuthContext = createContext({} as ContextProps);