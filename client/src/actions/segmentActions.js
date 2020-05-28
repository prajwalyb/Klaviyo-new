import { UPDATE_SEGMENT , INITIALIZE_SEGMENT , LOAD_ALL_SEGMENTS , LOAD_SELECTED_SEGMENT , NO_SEGMENTS , DELETE_SEGMENT } from './types.js';

import axios from 'axios';
import { returnErrors , clearErrors , returnNotifications , clearNotifications } from './popUpActions';
import { tokenConfig } from './authActions';
import { API_URL } from '../helpers/utils.js';

export const saveSegment = ( data ) => ( dispatch , getState ) =>{
    axios.post(`${API_URL}/segments/save`,{
        user:getState().auth.user,
        segment:{
            segment_id:getState().email.email_id,
            segment_name:getState().email.email_name,
            segment_body:data
        }
    } , tokenConfig(getState) )
    .then(res=>{
        dispatch({
            type:UPDATE_SEGMENT,
            payload:data
        })
        //dispatch(returnNotifications("Segment Saved"))
        //console.log(res.data)
    })
    .catch(err=>{
        dispatch(returnErrors(err.data,err.status,"SEGMENT_NOT_SAVED"))
        console.log(err)
    })
}