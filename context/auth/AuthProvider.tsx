import { FC, ReactNode, useReducer } from 'react';
import { api } from '../../api';
import { IUser } from '../../interfaces';
import { AuthContext, authReducer } from './';
import Cookies from 'js-cookie'
import { LoginRegisterResponse, LogoutResponse } from './AuthContext'
import axios from 'axios'
import { RegisterFormValues } from '../../app/auth/register/page';

export interface AuthState {
  user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
  user: undefined
}

interface ProviderProps {
  children: ReactNode;
}

interface ApiLoginRegisterResponse {
  message: string;
  token: string;
  user: IUser;
}

interface ApiLogoutResponse {
  message: string;
}

const getErrorMessage = (err: unknown, fallback: string = 'Something went wrong.'): string => {
  let message = fallback

  if (axios.isAxiosError(err)) {
    message = err?.response?.data.message || message
  }

  return message
}

export const AuthProvider: FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE)

  const login = async (email: string, password: string): Promise<LoginRegisterResponse> => {
    try {
      const { data } = await api.post<ApiLoginRegisterResponse>('/login', {
        email,
        password
      })

      const {
        message,
        token,
        user,
      } = data

      dispatch({ type: 'Login', payload: user })

      Cookies.set('XSRF-TOKEN', token)

      return {
        success: true,
        message,
        user
      }
    } catch (err) {
      return {
        success: false,
        message: getErrorMessage(err, 'Something went wrong while attempting to login.')
      }
    }
  }

  const register = async (data: RegisterFormValues): Promise<LoginRegisterResponse> => {
    try {
      const { data: resData } = await api.post<ApiLoginRegisterResponse>('/register', data)

      const {
        message,
        token,
        user,
      } = resData

      dispatch({ type: 'Register', payload: user })

      Cookies.set('XSRF-TOKEN', token)

      return {
        success: true,
        message,
        user
      }
    } catch (err) {
      return {
        success: false,
        message: getErrorMessage(err, 'Something went wrong while attempting to register.')
      }
    }
  }

  const logout = async (): Promise<LogoutResponse> => {
    try {
      const { data } = await api.post<ApiLogoutResponse>('/logout', undefined, {
        headers: {
          'Authorization': `Bearer ${Cookies.get('XSRF-TOKEN')}`
        }
      })

      Cookies.remove('XSRF-TOKEN')

      dispatch({ type: 'Logout' })

      return {
        success: true,
        message: data.message
      }
    } catch (err) {
      return {
        success: false,
        message: getErrorMessage(err, 'Something went wrong while attempting to log out.')
      }
    }
  }
  
  return (
    <AuthContext.Provider value={{
      ...state,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}