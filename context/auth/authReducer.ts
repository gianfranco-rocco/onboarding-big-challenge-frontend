import { IUser } from '../../interfaces';
import { AuthState } from './';

type AuthActionType =
    | { type: 'Login', payload: IUser }

export const authReducer = (state: AuthState, action: AuthActionType): AuthState => {
    switch (action.type) {
       case 'Login':
           return {
               ...state,
               user: action.payload
           }
       default:
           return state;
    }
}