import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Navbar } from 'react-bootstrap';
import _ from 'lodash';

import './Header.css';
import logo from './../../assets/autoddit.png';
import { logout } from "../Login/actions";

const HeaderComponent = ({ user, actions }) => {

    return (
        <Navbar>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="/#">
                        <img src={logo} alt="Autoddit" className="img-fluid img-responsive" />
                    </a>
                </Navbar.Brand>
            </Navbar.Header>
            { _.get(user, 'name') && (
                <div className="pull-right">
                    <ul className="list-inline">
                        <li>Hi there,</li>
                        <li><strong>{ user.name }</strong></li>
                        <li><button className="btn btn-primary" onClick={actions.logout}>Logout</button></li>
                    </ul>
                </div>
            ) }
        </Navbar>
    );
};

HeaderComponent.defaultProps = {
    user: {}
};

HeaderComponent.propTypes = {
    user: PropTypes.object,
    actions: PropTypes.object
};

const mapStateToProps = (store) => {
    return {
        user: store.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: {
            logout: () => dispatch(logout())
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);