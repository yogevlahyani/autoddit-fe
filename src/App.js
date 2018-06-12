import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import _ from 'lodash';
import './App.css';

import { AutodditList } from "./components/Autoddit";

class App extends Component {
    render() {
        const token = localStorage.getItem('user');
        if (_.isEmpty(JSON.parse(token))) {
            return <Redirect to={{ pathname: "/login" }} />;
        }

        return (
            <AutodditList {...this.props} />
        );
    }
}

App.propTypes = {
    user: PropTypes.object
};

const mapStateToProps = (store) => {
    return {
        user: store.user
    };
};

export default connect(mapStateToProps, null)(App);
