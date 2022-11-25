import { FC, ReactNode, useReducer } from 'react';
import { api } from '../../api';
import { IUser } from '../../interfaces';
import { AuthContext, authReducer } from './';
import Cookies from 'js-cookie'
import { LoginResponse } from './AuthContext'
import axios from 'axios'

export interface AuthState {
  user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
  user: undefined
}

interface ProviderProps {
  children: ReactNode;
}

interface ApiLoginResponse {
  message: string,
  token: string,
  user: IUser
}

export const AuthProvider: FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE)

  const login = async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const { data } = await api.post<ApiLoginResponse>('/login', {
        email,
        password
      })

      const {
        message,
        token,
        user,
      } = data

      dispatch({ type: 'Login', payload: user })

      Cookies.set('token', token)

      return {
        success: true,
        message,
        user
      }
    } catch (err) {
      let message = 'Something went wrong while attempting to login.'

      if (axios.isAxiosError(err)) {
        message = err?.response?.data.message || message
      }

      return {
        success: false,
        message
      }
    }
  }
  
  return (
    <AuthContext.Provider value={{
      ...state,
      login,
    }}>
      {children}
    </AuthContext.Provider>
  )
}