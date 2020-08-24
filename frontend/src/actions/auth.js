import axios from 'axios';
import { returnErrors } from './messages';
import { SOCIALAUTH_ERROR, CONVERT_TOKEN, GET_SOCIAL, USER_LOADING, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS} from './types';

export const convertToken = () => (dispatch, getState) => {
    const token = getState().auth.socialToken
    const backend = getState().auth.socialProv
    const bodyFormData = new FormData()

    bodyFormData.set('grant_type', 'convert_token')
    bodyFormData.set('client_id', "ITYfHcRPm9GLu50DlgZzOa6XiikLr0bC9adnjk6T")
    bodyFormData.set('client_secret', "rnAm3a2vNCyspU9S2501FTjZZIlADR4nOSErCXjQ9kDOilyqUMwNlrOlGocudgHu6rSPReoesyJrkwXIsn3c8yzTFBT7jt2Vg5JlTl8V0C1njhuPFun5uQO4Knc7iEOs")
    bodyFormData.set('backend', backend)
    bodyFormData.set('token', token)

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    };

    axios.post('/auth/convert-token', bodyFormData, config).then(res => {
        dispatch({
            type: CONVERT_TOKEN,
            payload: res.data
        })
    }).catch(err => {dispatch(returnErrors(err.response.data, err.response.status))})


}

export const getSocial = () => dispatch => {

    dispatch({
        type: USER_LOADING
    });

    axios.get('/api/get/social').then(res => {
        dispatch({
            type: GET_SOCIAL,
            payload: res.data
        });

        dispatch(convertToken());
    }).catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));

        dispatch({
            type: SOCIALAUTH_ERROR
        })
    });

}

export const loadUser = () => (dispatch, getState) => {
    dispatch({
        type: USER_LOADING
    });

    const config = tokenConfig(getState);

    axios.get('/api/auth/user', config).then(res => {
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    }).catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));

        dispatch({
            type: AUTH_ERROR
        })

    });
}

export const login = (username, password) => (dispatch) => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ username, password })

    axios.post('/api/auth/login', body, config).then(res => {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
    }).catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));

        dispatch({
            type: LOGIN_FAIL
        });
    });
}

export const logout = () => (dispatch, getState) => {

    const config = tokenConfig(getState);

    axios.post('/api/auth/logout', null, config).then(res => {
        dispatch({
            type: LOGOUT_SUCCESS
        });
    }).catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));

    });
}

export const tokenConfig = getState =>{
    const token = getState().auth.token;
    var access_token = getState().auth.accessToken
    if(access_token !== null){
        access_token = getState().auth.accessToken.access_token
    }
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if (token) {
        config.headers["Authorization"] = `Token ${token}`
    }else if(access_token){
        config.headers['Authorization'] = `Bearer ${access_token}`
    }

    return config;

}

export const registerUser = ({ username, password, email }) => (dispatch) => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ username, password, email });

    axios.post('/api/auth/register', body, config).then(res => {
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
    }).catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));

        dispatch({
            type: REGISTER_FAIL
        });
    });
}