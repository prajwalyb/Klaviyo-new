import React from 'react'
import { Route , Redirect } from "react-router-dom";

export default function protectedRoute({ component: Component , ...rest }) {
    return (
        <Route
        {...rest}
        render={props =>
            (localStorage.getItem('usertoken')) ? (
            <Component {...props} />
            ) : (
            <Redirect
                to="/login" 
            />
            )
        }
        />
    )
}
