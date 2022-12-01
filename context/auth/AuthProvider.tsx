import { FC, ReactNode, useEffect, useReducer } from 'react';
import { api } from '../../api';
import { IPatientInfo, IUser } from '../../interfaces';
import { AuthContext, authReducer } from './';
import Cookies from 'js-cookie'
import { LoginRegisterResponse, Response } from './AuthContext'
import { RegisterFormValues } from '../../app/auth/register/page';
import { api as apiUtils } from '../../utils'

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
        message: apiUtils.getErrorMessage(err, 'Something went wrong while attempting to login.')
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
        message: apiUtils.getErrorMessage(err, 'Something went wrong while attempting to register.')
      }
    }
  }

  const logout = async (): Promise<Response> => {
    try {
      const { data } = await api.post<ApiLogoutResponse>('/logout')

      Cookies.remove('XSRF-TOKEN')

      dispatch({ type: 'Logout' })

      return {
        success: true,
        message: data.message
      }
    } catch (err) {
      return {
        success: false,
        message: apiUtils.getErrorMessage(err, 'Something went wrong while attempting to log out.')
      }
    }
  }

  const updatePatientInfo = async (data: IPatientInfo): Promise<Response> => {
    try {
      await api.post('/info', data)

      dispatch({ type: 'Update patient info', payload: data })

      return {
        success: true,
      }
    } catch (err) {
      return {
        success: false,
        message: apiUtils.getErrorMessage(err, 'Something went wrong while attempting to update your profile information.')
      }
    }
  }

  useEffect(() => {
    const token = Cookies.get('XSRF-TOKEN')

    const authenticateUserByToken = async () => {
      try {
        const { data } = await api.get<IUser>('/user')
  
        dispatch({ type: 'Login', payload: data })
      } catch (err) {}
    }

    if (token) {
      authenticateUserByToken()
    }
  }, [])
  
  
  return (
    <AuthContext.Provider value={{
      ...state,
      login,
      register,
      logout,
      updatePatientInfo,
    }}>
      {children}
    </AuthContext.Provider>
  )
}