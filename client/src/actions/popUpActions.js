import { GET_ERRORS , CLEAR_ERRORS , GET_NOTIFICATION , CLEAR_NOTIFICATION } from "./types.js";

export const returnErrors = ( msg , status , id=null ) => {
    return {
        type:GET_ERRORS,
        payload:{ msg , status , id }
    };
};

export const clearErrors = () => {
    return {
        type:CLEAR_ERRORS
    }
}

export const returnNotifications = ( notification ) => {
    return {
        type:GET_NOTIFICATION,
        payload:{ notification }
    };
};

export const clearNotifications = () => {
    return {
        type:CLEAR_NOTIFICATION
    }
}