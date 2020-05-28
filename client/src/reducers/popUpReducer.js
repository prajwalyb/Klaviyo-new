import { GET_ERRORS , CLEAR_ERRORS , GET_NOTIFICATION , CLEAR_NOTIFICATION } from '../actions/types.js';

const initialState={
    notification:null,
    msg:{},
    status:null,
    id:null
}

export default function ( state = initialState , action ){
    switch (action.type) {
        case GET_ERRORS:
            return {
                ...state,
                msg:action.payload.msg,
                status:action.payload.status,
                id:action.payload.id
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                msg:{},
                status:null,
                id:null
            };
        case GET_NOTIFICATION:
            return {
                ...state,
                notification:action.payload.notification
            };
        case CLEAR_NOTIFICATION:
            return {
                ...state,
                notification:null
            };           
        default:
            return state 
    }
}