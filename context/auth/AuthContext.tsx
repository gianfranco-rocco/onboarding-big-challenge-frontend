import { createContext } from 'react';
import { IUser } from '../../interfaces';

export interface LoginResponse {
  success: boolean;
  message: string;
  user?: IUser;
}

interface ContextProps {
  user?: IUser;
  login: (email: string, password: string) => Promise<LoginResponse>;
}

export const AuthContext = createContext({} as ContextProps);