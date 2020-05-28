import { USER_LOADING , USER_LOADED , AUTH_ERROR , LOGIN_SUCCESS , LOGIN_FAIL , LOGOUT_SUCCESS , REGISTER_SUCCESS , REGISTER_FAIL } from "./types.js";
import axios from 'axios';
import { returnErrors , clearErrors , returnNotifications , clearNotifications } from './popUpActions';
import { API_URL } from '../helpers/utils.js';


export const loadUser = () => ( dispatch , getState ) => {
    dispatch({
        type:USER_LOADING
    });
    axios.get(`${API_URL}/users/auth`,tokenConfig(getState))
        .then(res=>dispatch({
            type:USER_LOADED,
            payload:res.data
        }))
        .catch(err=>{
            //dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type:AUTH_ERROR
            })
        })
}

export const registerUser= ( newUser ) => dispatch => {
    axios.post(`${API_URL}/users/register`,{
            first_name:newUser.first_name,
            last_name:newUser.last_name,
            email:newUser.email,
            password:newUser.password,
        })
        .then(res=>{
            dispatch(returnNotifications("Registered Successfully!!"))
            dispatch({
                type:REGISTER_SUCCESS,
                payload:res.data
            })
        })
        .catch(err=>{
            dispatch(returnErrors(err.response.data, err.response.status,'REGISTER_FAIL'))
            dispatch({
                type:REGISTER_FAIL
            })
        })
}

export const loginUser = ( user ) => dispatch => {
    axios.post(`${API_URL}/users/login`,{
            email:user.email,
            password:user.password
        })
        .then(res=>{
            // localStorage.setItem('usertoken',JSON.stringify(
            //     res.data.token
            // ))
            //console.log(res)
            if(res.status===200){
                dispatch({
                    type:LOGIN_SUCCESS,
                    payload:res.data
                });
                dispatch(clearErrors());
            }else{
                dispatch({
                    type:LOGIN_FAIL
                })
                dispatch(returnErrors(res.data, res.status,'LOGIN_FAIL'))
            }
        })
        .catch(err=>{
            dispatch(returnErrors(err.response.data, err.response.status,'LOGIN_FAIL'))
             dispatch({
                type:LOGIN_FAIL
            })
        })
}

export const logoutUser = () => dispatch => {
    dispatch({
        type:LOGOUT_SUCCESS
    })
}

export const tokenConfig = getState => {
    const token=getState().auth.token;
    const config = {
        headers:{
            'Content-type':'application/json'
        }
    }
    if(token){
        config.headers['x-auth-token'] = token
    }
    return config;
}