import { IUser } from '../../interfaces';
import { AuthState } from './';

type AuthActionType =
    | { type: 'Login', payload: IUser }
    | { type: 'Register', payload: IUser }

export const authReducer = (state: AuthState, action: AuthActionType): AuthState => {
    switch (action.type) {
       case 'Login':
       case 'Register':
           return {
               ...state,
               user: action.payload
           }
       default:
           return state;
    }
}