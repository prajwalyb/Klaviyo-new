import React, { Component } from 'react';
import { withRouter , Redirect} from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { Alert } from 'reactstrap';

import { API_URL } from '../helpers/utils.js';
import { registerUser } from '../actions/authActions.js';
import { clearErrors , clearNotifications} from '../actions/popUpActions.js';

export class Register extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            first_name:"",
            last_name:"",
            email:"",
            password:""
        }
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }
    componentDidUpdate(prevProps){
        const { popUp } = this.props;
        if(popUp !== prevProps.popUp){
            if(popUp.id === 'REGISTER_FAIL'){
                this.setState({
                    msg:popUp.msg.msg
                });
                setTimeout(() => {
                    this.props.clearErrors()
                }, 2500);
            }else{
                this.setState({
                    msg:null
                })
            }
            if(popUp.notification){
                this.setState({
                    notification:popUp.notification
                })
                setTimeout(() => {
                    this.props.clearNotifications();
                    this.props.history.push('/login')      
                }, 1600);
            }
        }             
    }
    onChange(e){
        this.setState({[e.target.name]:e.target.value})
    }
    onSubmit(e){
        e.preventDefault();
        const newUser={
            first_name:this.state.first_name,
            last_name:this.state.last_name,
            email:this.state.email,
            password:this.state.password
        }

        this.props.registerUser(newUser)
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-5 mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                        {
                            this.state.msg ? (
                                <Alert color="danger">{this.state.msg}</Alert>  
                            ) : null 
                                                       
                        }
                        {
                            this.state.notification ? (
                                <Alert color="success">{this.state.notification}</Alert>  
                            ) : null                                                         
                        }
                            <h1 className="h3 mb-3 font-weight-normal">Please Register</h1>
                            <div className="form-group">
                                <label htmlFor="first_name">First Name</label>
                                <input type="text"
                                className="form-control"
                                name="first_name"
                                placeholder="Enter First Name"
                                value={this.state.first_name}
                                onChange={this.onChange}
                                />                                
                            </div>
                            <div className="form-group">
                                <label htmlFor="last_name">Last Name</label>
                                <input type="text"
                                className="form-control"
                                name="last_name"
                                placeholder="Enter Last Name"
                                value={this.state.last_name}
                                onChange={this.onChange}
                                />                                
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input type="email"
                                className="form-control"
                                name="email"
                                placeholder="Enter Email"
                                value={this.state.email}
                                onChange={this.onChange}
                                />                                
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password"
                                className="form-control"
                                name="password"
                                placeholder="Enter Password"
                                value={this.state.password}
                                onChange={this.onChange}
                                />                                
                            </div>
                            <button type="submit" className="btn btn-primary btn-block btn-lg">
                                Register
                            </button>
                        </form>
                        <br/>
                        <a href="/login">Already Registered?</a>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated:state.auth.isAuthenticated,
    popUp:state.popUp
})

export default connect (mapStateToProps , { registerUser , clearErrors , clearNotifications })(withRouter(Register));
