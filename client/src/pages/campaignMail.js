import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter , Redirect } from 'react-router-dom';
import { Container, Row, Col , Alert , Button, Form, FormGroup, Label, Input , InputGroup ,
InputGroupAddon , Modal , ModalHeader, ModalBody, ModalFooter , ListGroup , ListGroupItem } from 'reactstrap';
import parse from 'html-react-parser';

import NavComp from '../components/MainNavbar.js';
import { MainSidebar } from '../components/MainSidebar.js';
import { loadEmailList } from '../actions/emailActions.js';
import { saveCampaign } from '../actions/campaignActions.js';

class createCampaigns extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            modal:false,
            from:"",
            replyTo:"",
            subject:"",
            previewText:""
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle(){
        this.setState({
        modal: !this.state.modal
        })
    }

    populateEmailList = () => {
        this.toggle();
        this.props.loadEmailList();
    }

    reviewFunction = (email) => {
        console.log(email);
        this.setState({
            email_name:email.email_name,
            email_id:email.email_id,
            email_html:email.email_html
        })
        this.toggle();
    }

    onChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    submitCampaign=(e)=>{
        e.preventDefault();
        this.props.saveCampaign(this.state);
        alert("Campaign saved");
        this.props.history.push('/campaigns')
    }

    componentDidMount(){
        this.setState({
            from:this.props.campaign.campaign_content.from,
            replyTo:this.props.campaign.campaign_content.replyTo,
            subject:this.props.campaign.campaign_content.subject,
            previewText:this.props.campaign.campaign_content.previewText,
            email_id:this.props.campaign.campaign_content.email_id,
            email_name:this.props.campaign.campaign_content.email_name,
            email_html:this.props.campaign.campaign_content.email_html,
        })
    }

    render() {
        if( this.props.campaign.campaign_name && this.props.campaign.campaign_id)
        return (
            <>
            <Container fluid={true}>
             <NavComp/>            
             <Row>
              <Col xs="2">
                <MainSidebar/>
              </Col>
              <Col xs="10">
                <div id="main">
                    <div className="dashboard-nav-header">
                    <Row>
                        <Col className="campaignHead">
                        <p ><a href="/campaigns">Campaigns</a> > Edit</p>
                        </Col>
                    </Row>
                    </div>
                    <hr/>
                    <div className="Card-Table" style={{padding:'30px'}}>
                        <div className="Card-Table-Inner">
                        <Form onSubmit={this.submitCampaign}>
                            <Row form>
                                <Col xs={6}>
                                <FormGroup>
                                    <Label>From</Label>
                                    <Input type="text" name="from" value={this.state.from}
                                    onChange={this.onChange} required/>
                                </FormGroup>
                                </Col>
                                <Col xs={6}>
                                <FormGroup>
                                    <Label>From / Reply-To Email</Label>
                                    <Input type="email" name="replyTo" value={this.state.replyTo} onChange={this.onChange}
                                    required></Input>
                                </FormGroup>
                                </Col>
                            </Row>                   
                            <Row form>
                                <Col xs={6}>
                                <FormGroup>
                                    <Label>Subject</Label>
                                    <Input type="text" name="subject" value={this.state.subject}
                                    onChange={this.onChange} required/>
                                </FormGroup>
                                </Col>
                                <Col xs={6}>
                                <FormGroup>
                                    <Label>Preview Text</Label>
                                    <Input type="email" name="previewText" value={this.state.previewText}
                                    onChange={this.onChange} disabled></Input>
                                </FormGroup>
                                </Col>
                            </Row>
                            <hr/>
                            <Row>
                            {
                                (()=>{
                                    if(this.state.email_id && this.state.email_name){
                                        return (
                                            <>
                                                <Col style={{margin:'0 20%', border:'box-shadow: 0 0 6px rgba(43,152,211,.5)',border:'2px solid rgba(43,152,211,.5)'}}>
                                                    {parse(this.state.email_html)}
                                                </Col>
                                                <Button className="primaryButton" onClick={()=>{
                                                    this.setState({
                                                        email_body:"",
                                                        email_id:"",
                                                        email_html:""
                                                    })
                                                }}>Change Layout</Button>
                                            </>
                                        )
                                    } else return (
                                        <>
                                            <Col xs={4}>
                                            <Button>Rich HTML</Button>
                                            </Col>
                                            <Col xs={4}>
                                                <Button>Text Based</Button>
                                            </Col>
                                            <Col xs={4}>
                                                <Button onClick={this.populateEmailList}>Use Templates</Button>
                                            </Col>                                    
                                        </>
                                    )                                    
                                })()
                            }
                            </Row>
                            <br/>
                            <Row>
                                <Col xs={3}>
                                <Button className="btn">Save Changes</Button>
                                </Col>
                            </Row>
                        </Form>
                        <hr/>
                        </div>
                    </div>
                </div>
              </Col>
             </Row>
             <Modal isOpen={this.state.modal} toggle={this.toggle} >
              <form onSubmit={this.onSubmit}>
                <ModalHeader toggle={this.toggle}>Select Email Template</ModalHeader>
                <ModalBody>
                    <ListGroup>
                        {
                            this.props.allemails?this.props.allemails.map( entry => {
                                return (
                                    <ListGroupItem key={entry.email.email_id}>
                                    <Row>
                                        <Col xs={6}>
                                            {entry.email.email_name}
                                        </Col>
                                        <Col xs={6}>
                                            <Button onClick={this.reviewFunction.bind(this,entry.email)}>Select</Button>
                                        </Col>
                                    </Row>
                                    </ListGroupItem>
                                )
                            }): <p>No Templates</p>
                        }                        
                    </ListGroup>
                </ModalBody>
                <ModalFooter>
                  <button className="btn btn-secondary" onClick={this.toggle}>Cancel</button>
                </ModalFooter>
              </form>
            </Modal> 
            </Container>
            </>
        ) 
       else return<Redirect to="/campaigns/create"/>
    }
}

const mapStateToProps = ( state ) => ({
    allemails:state.email.allemails,
    campaign:state.campaign
})

export default connect( mapStateToProps , { loadEmailList , saveCampaign } )(createCampaigns);