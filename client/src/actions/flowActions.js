import { UPDATE_FLOW , INITIALIZE_FLOW , LOAD_ALL_FLOWS , NO_FLOWS , DELETE_FLOW , LOAD_SELECTED_FLOWS } from "./types.js";

import axios from 'axios';
import { returnErrors , clearErrors , returnNotifications } from './popUpActions';
import { tokenConfig } from './authActions';
import { API_URL } from '../helpers/utils.js';

export const initializeFlow = (newFlow) => dispatch =>{
    dispatch({
        type:INITIALIZE_FLOW,
        payload:newFlow
    })
}

export const saveFlow = (flow_body) => ( dispatch , getState ) =>{
    ( getState().flow.flow_name && getState().flow.flow_id ) ? 
        axios.post( `${API_URL}/flows/save` , {
            user:getState().auth.user,
            flow:{
                flow_id:getState().flow.flow_id,
                flow_name:getState().flow.flow_name,
                flow_body:flow_body
            }
        } , tokenConfig(getState) )
        .then(res=>{
            dispatch({
                type:UPDATE_FLOW,
                payload:flow_body
            })
            console.log(res.data)
            dispatch(returnNotifications("Flow Saved"))
        })
        .catch(err=>{
            dispatch(returnErrors(err.data, err.status,'FLOW_NOT_SAVED'))
            console.log(err)
        }) : 
        dispatch(returnErrors('Flow Can Not Be Saved',408,'FLOW_NOT_SAVED'))
}

export const loadFlowList = () => {
    return ( dispatch , getState ) => {
        axios.get(`${API_URL}/flows/loadAll/${getState().auth.user._id}`,tokenConfig(getState))
        .then(flows=>{
            console.log(flows.data);
            (flows.data) ? dispatch({
                type:LOAD_ALL_FLOWS,
                payload: flows.data
            }) : dispatch({
                type:NO_FLOWS
            })
            //No Flows ka alert dalna hai
        })
    }
}

export const loadSelectedFlow = ( flow_id ) => {
    return async ( dispatch , getState ) => {
        await axios.get(`${API_URL}/flows/${getState().auth.user._id}/loadOne/${flow_id}`,tokenConfig(getState))
        .then(item=>{
            //console.log(item.data)
                dispatch({
                    type:LOAD_SELECTED_FLOWS,
                    payload:item.data
                })
            }
        )
    }
} 

export const deleteFlow = (flow_id) => ( dispatch , getState ) =>{
    axios.delete(`${API_URL}/flows/${getState().auth.user._id}/deleteOne/${flow_id}`,tokenConfig(getState))
    .then(res=>{
            if(res.data.success)
            {
                var arr=getState().flow.allFlows.filter(function(item){
                    return item.flow.flow_id!=flow_id
                })
                dispatch({
                    type:DELETE_FLOW,
                    payload:arr
                })  
            }
            //notification wala alert dalna hai
            //console.log(res);
        }
    )
}