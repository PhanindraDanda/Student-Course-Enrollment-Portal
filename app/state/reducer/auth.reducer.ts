
import { createReducer, on } from '@ngrx/store';
import * as actions from '../action/auth.action';

export interface AuthState{
    token: string;
}

export const initialState : AuthState = {
    token: ""
}

export const newState = (state:any,newData:any)=>{

    return Object.assign({},state,newData);
}

export const AuthReducer = createReducer(
    initialState,
    on(actions.getToken, (state) => ({ 
        ...state
    })),

    on(actions.AddToken, (state,{token}) => (
     console.log(token),   
     {
     ...state,
     token:token

    })),

    on(actions.deleteToken, (state) => ({ 
        ...state,
        token:""
    })),

);
