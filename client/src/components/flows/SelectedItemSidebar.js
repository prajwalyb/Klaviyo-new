import React , { useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { InputGroup , InputGroupButtonDropdown , Input , Button , DropdownToggle , DropdownMenu ,  DropdownItem ,Col, Form, FormGroup, Label, FormText } from 'reactstrap';
import { Page } from './Flowchart-Page'

const Sidebar = styled.div`
    z-index: 5;
    background: #FFF;
    border-right: 1px solid #DFE3E6;
    flex: 0 0 350px;
    display: flex;
    flex-direction: column;
`

export const TriggerSideBar = (props) => {
    //Currently static
    return(
            <Sidebar>
                <div className="sidebar-header">
                    <div className="sidebar-header-title">
                        Trigger Setup
                    </div>                   
                </div>
                <div className="sidebar-body">
                    <div className="trigger-setup-panel">
                        <div className="sidebar-header-title" style={{margin:'15px'}}>Flow Description<small className="weak"> /Metrics</small></div>                       
                        <div className="flow-trigger-description" style={{margin:'20px'}}>
                            <FontAwesomeIcon icon={faCog} className="fa-2x" style={{marginRight:'10px', color:"#949AA3"}} />
                            <a href="#" className="panel-link">Active On Site</a>
                        </div>                        
                        <div className="margin"/>
                        <a href="#" className="panel-link">
                            <div className="flow-trigger-description" style={{margin:'20px'}}>
                                <p>Trigger Filters</p>
                                <p>Filter on properties of the trigger.</p> 
                            </div>
                        </a>
                        <div className="margin"/>
                        <a href="#" className="panel-link">
                            <div className="flow-trigger-description" style={{margin:'20px'}}>
                                <p>Flow Filters</p>
                                <p>Restrict the flow to only certain people.</p>     
                            </div>
                        </a>
                        <div className="margin"/>
                    </div>
                </div>        
                <div className="sidebar-footer">
                    <button onClick={props.switchtoDefaultSidebar} className="btn btn-primary">Done</button>
                </div>        
            </Sidebar>
    )
}

export const UpdateProfileSideBar = (props) => {
    //Currently static
    return(
            <Sidebar>
                <div className="sidebar-header">
                    <div className="sidebar-header-title">
                        Update Profile Property
                    </div>                   
                </div>
                <div className="sidebar-body">
                    <div className="trigger-setup-panel">
                        <div className="sidebar-header-title" style={{margin:'15px'}}>Activity All Time</div>                       
                        <div className="margin"/>
                        <div className="sidebar-header-title" style={{margin:'20px'}}>
                            <p>Configuration</p>
                        </div>                  
                        <div className="margin"/>
                    </div>
                </div>        
                <div className="sidebar-footer">
                    <button onClick={props.switchtoDefaultSidebar} className="btn btn-primary">Done</button>
                </div>        
            </Sidebar>
    )
}

export const TimeDelaySideBar = (props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropDown = () => setDropdownOpen(!dropdownOpen);

    return(
            <Sidebar>
                <div className="sidebar-header">
                    <div className="sidebar-header-title">
                        Time Delay
                    </div>                   
                </div>
                <div className="sidebar-body">
                    <div className="trigger-setup-panel">
                    <Form>
                        <div style={{margin:'15px'}}>Set Delay For</div>
                        <InputGroup>
                            <Input min={0} max={100} type="number" step="1" />
                            <InputGroupButtonDropdown addonType="append" isOpen={dropdownOpen} toggle={toggleDropDown}>
                            <DropdownToggle caret>
                                Select
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem>Day(s)</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>Hour(s)</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>Minute(s)</DropdownItem>
                            </DropdownMenu>
                            </InputGroupButtonDropdown>
                        </InputGroup>
                        <Col sm={{ size: 10 }}>
                        <FormGroup check>
                            <Label check>
                            <Input type="checkbox" id="checkbox1" />{' '}
                            Delay until a specific time of day
                            </Label>
                            <Label check>
                            <Input type="checkbox" id="checkbox2" />{' '}
                            Delay until a specific day(s) of the week
                            </Label>
                        </FormGroup>
                        </Col>
                    </Form>
                        <div className="margin"/>
                        <div className="sidebar-header-title" style={{margin:'20px'}}>
                            <p>Steps following this Time Delay occur on Day 10 after the trigger</p>
                        </div>                  
                        <div className="margin"/>
                    </div>
                </div>        
                <div className="sidebar-footer">
                    <button onClick={props.switchtoDefaultSidebar} className="btn btn-primary">Done</button>
                </div>        
            </Sidebar>
    )
}

export const EmailSideBar = (props) => {
    //Currently static
    return(
            <Sidebar>
                <div className="sidebar-header">
                    <div className="sidebar-header-title">
                        Email
                    </div>                   
                </div>
                <div className="sidebar-body">
                    <div className="trigger-setup-panel">
                        <div className="sidebar-header-title" style={{margin:'15px'}}>Content</div>                       
                        <div className="margin"/>
                        <div className="sidebar-header-title" style={{margin:'20px'}}>
                            <p>Configuration</p>
                        </div>                  
                        <div className="margin"/>
                    </div>
                </div>        
                <div className="sidebar-footer">
                    <button onClick={props.switchtoDefaultSidebar} className="btn btn-primary">Done</button>
                </div>        
            </Sidebar>
    )
}

export const ConditionalSplitSideBar = (props) => {
    //Currently static
    return(
            <Sidebar>
                <div className="sidebar-header">
                    <div className="sidebar-header-title">
                        Conditional Split
                    </div>                   
                </div>
                <div className="sidebar-body">
                    <div className="trigger-setup-panel">
                        <div className="sidebar-header-title" style={{margin:'15px'}}>Content</div>                       
                        <div className="margin"/>
                        <div className="sidebar-header-title" style={{margin:'20px'}}>
                            <p>Configuration</p>
                        </div>                  
                        <div className="margin"/>
                    </div>
                </div>        
                <div className="sidebar-footer">
                    <button onClick={props.switchtoDefaultSidebar} className="btn btn-primary">Done</button>
                </div>        
            </Sidebar>
    )
}

// export const TriggerSplitSideBar = (props) => {
//     //Currently static
//     return(
//         <Page>
//             <Sidebar>
//                 <div className="sidebar-header">
//                     <div className="sidebar-header-title">
//                         Trigger Split
//                     </div>                   
//                 </div>
//                 <div className="sidebar-body">
//                     <div className="trigger-setup-panel">
//                         <div className="sidebar-header-title" style={{margin:'15px'}}>Content</div>                       
//                         <div className="margin"/>
//                         <div className="sidebar-header-title" style={{margin:'20px'}}>
//                             <p>Configuration</p>
//                         </div>                  
//                         <div className="margin"/>
//                     </div>
//                 </div>        
//                 <div className="sidebar-footer">
//                     <button onClick={props.switchtoDefaultSidebar} className="btn btn-primary">Done</button>
//                 </div>        
//             </Sidebar>
//         </Page>
//     )
// }