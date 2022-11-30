import { IUser } from '../../interfaces';
import { AuthState } from './';
import { IPatientInfo } from '../../interfaces/user';

type AuthActionType =
    | { type: 'Login', payload: IUser }
    | { type: 'Register', payload: IUser }
    | { type: 'Logout' }
    | { type: 'Update patient info', payload: IPatientInfo }

export const authReducer = (state: AuthState, action: AuthActionType): AuthState => {
    switch (action.type) {
       case 'Login':
       case 'Register':
           return {
               ...state,
               user: action.payload
           }
        case 'Logout':
            return {
                ...state,
                user: undefined
            }
        case 'Update patient info':
            return {
                ...state,
                user: {
                    ...state.user!,
                    info: action.payload
                }
            }
       default:
           return state;
    }
}