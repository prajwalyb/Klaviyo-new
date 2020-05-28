import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem 
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { saveFlow } from '../../actions/flowActions.js';

const NavComp = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const ddtoggle = () => setDropdownOpen(prevState => !prevState);

  return (
    <div className="topbar">
        <div className="container-fluid">
            <Navbar light expand="md" >
                <div className="header-secondary-container">
                    <NavbarBrand href="/" style={{color: '#DFE3E6'}}>Klaviyo</NavbarBrand>
                    <Dropdown isOpen={dropdownOpen} toggle={ddtoggle}>
                        <DropdownToggle caret>
                           {
                               (props.flowName) ? props.flowName : "404"
                           }
                        </DropdownToggle>
                    </Dropdown>
                </div>
                <div className="header-primary-container">
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar className="nav">
                    <Nav className="ml-auto Nav" navbar>
                        <NavItem className="NavItem">
                            <NavLink className="NavLink" onClick={props.saveFlowIT}>Save</NavLink>
                        </NavItem>
                        <NavItem className="NavItem">
                            <NavLink href="/flow" className="NavLink">Exit</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
                </div>
            </Navbar>
        </div>
    </div>
  );
}

const mapStateToProps = state => ({
  flowName: state.flow.flow_name
})


export default connect ( mapStateToProps , null )(withRouter(NavComp));