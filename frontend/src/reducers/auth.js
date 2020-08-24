import { SOCIALAUTH_ERROR, CONVERT_TOKEN, GET_SOCIAL, USER_LOADING, USER_LOADED, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS } from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null,
    socialProv: null,
    socialToken: null,
    accessToken: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case SOCIALAUTH_ERROR:
            return{
                ...state,
                isAuthenticated: false,
                isLoading: false,
                socialProv: null,
                socialToken: null,
                accessToken: null,
            }
        case CONVERT_TOKEN:
            return {
                ...state,
                isAuthenticated: true,
                accessToken: action.payload,
            }
        case GET_SOCIAL:
            return {
                ...state,
                socialProv: action.payload.provider,
                socialToken: action.payload.access_token,
                user: action.payload.userInfo,
            }
        case USER_LOADING:
            return{
                ...state,
                isLoading: true
            };
        case USER_LOADED:
            return{
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            };
        case AUTH_ERROR:
            localStorage.removeItem('token');
            return{
                ...state,
                token: null,
                isAuthenticated: false,
                isLoading: false,
            };
        case LOGIN_FAIL:
            localStorage.removeItem('token');
            return{
                ...state,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                user: null
            };
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return{
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
            };
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token');
            return{
                ...state,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                user: null,
                socialProv: null,
                socialToken: null,
                accessToken: null,
            };
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return{
                ...state,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                user: null
            };
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return{
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
            };
    
        
        default:
            return state;
    }
}