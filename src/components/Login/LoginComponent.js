import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import _ from 'lodash';
import "./Login.css";

// Redux
import { connect } from 'react-redux';
import { login } from './actions';

class LoginComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: ''
        };
    }

    validateForm() {
        return this.state.name.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleSubmit = event => {
        event.preventDefault();
    };

    doLogin = () => {
        const { name } = this.state;

        this.props.actions.login(name);
    };

    render() {
        const token = localStorage.getItem('user');
        if (!_.isEmpty(JSON.parse(token))) {
            return <Redirect to={{ pathname: "/" }} />;
        }

        return (
            <div className="login-container">
                <form onSubmit={this.handleSubmit}>
                    <h1 className="animated bounceInDown">Hey there!</h1>
                    <FormGroup controlId="name" bsSize="large" className="animated fadeInLeft whats-name-form">
                        <ControlLabel>What's you're name ?</ControlLabel>
                        <FormControl
                            autoFocus
                            type="text"
                            value={this.state.name}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <Button
                        block
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                        className={['submit-btn animated', this.validateForm() && 'bounceIn']}
                        onClick={this.doLogin}
                    >
                        Continue to Awesome AUTODDIT!
                    </Button>
                    <div className="icon text-center">
                        <i className="fab fa-reddit-alien animated fadeIn"></i>
                    </div>
                </form>
            </div>
        );
    }
}

LoginComponent.defaultProps = {
    user: {}
};

LoginComponent.propTypes = {
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
            login: (name) => dispatch(login(name))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);