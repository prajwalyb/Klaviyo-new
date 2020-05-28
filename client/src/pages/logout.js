import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Row, Jumbotron } from 'reactstrap';

import { logoutUser } from '../actions/authActions.js';

export class logout extends Component {
    
    componentDidMount(){
        this.props.logoutUser();
    }
    render() {
        return (
            <Container>
                <Jumbotron>
                    <Row>
                        <h1>You have been logged out</h1>
                    </Row>                
                    <Row style={{marginTop:'60px'}}>
                        <button className="btn btnTable"><a href="/">Log in Again</a></button>
                    </Row>
                </Jumbotron>
            </Container>
        )
    }
}

// const mapStatesToProps = state => {

// }

export default connect (null, { logoutUser })(logout);
