import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {ControlLabel, FormControl, Button, FormGroup, Col, Form, Alert} from 'react-bootstrap';
import _ from 'lodash';
import moment from 'moment';
import validUrl from 'valid-url';

import { add } from "../actions";

class AddAutodditComponent extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            title: '',
            image: '',
            errors: []
        };
    }

    validateForm() {
        const { title, image } = this.state;
        let errors = [];

        if (_.isEmpty(title)) { errors.push('emptyTitle') }
        if (_.isEmpty(image)) { errors.push('emptyImage') }
        if (!validUrl.isUri(image)) { errors.push('invalidImageURL') }

        this.setState({ errors });

        return !_.isEmpty(title) && !_.isEmpty(image) && validUrl.isUri(image);
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    addAutoddit = () => {
        if (this.validateForm()) {
            const { title, image } = this.state;
            const created_at = moment().format('MMM DD, YYYY HH:mm');
            const user_ref = this.props.user.name;
            const comments_count = 0;
            const votes = 999;

            this.props.actions.add({
                title,
                image,
                created_at,
                user_ref,
                comments_count,
                votes,
                comments: []
            });

            this.props.history.push('/');
        }
    };

    render() {
        const { errors } = this.state;

        return (
            <div className="add-autoddit container">
                <Form horizontal>
                    <FormGroup controlId="formHorizontalTitle" validationState={_.includes(errors, 'emptyTitle') ? 'error' : null}>
                        <Col componentClass={ControlLabel} sm={2}>
                            Title
                        </Col>
                        <Col sm={10}>
                            <FormControl type="text" name="title" placeholder="Title" onChange={this.handleChange} />

                            {
                                _.includes(errors, 'emptyTitle') &&
                                    <Alert bsStyle="danger">
                                        Title is empty!
                                    </Alert>
                            }
                        </Col>
                    </FormGroup>

                    <FormGroup
                        controlId="formHorizontalImage"
                        validationState={_.includes(errors, 'emptyImage') || _.includes(errors, 'invalidImageURL') ? 'error' : null}>
                        <Col componentClass={ControlLabel} sm={2}>
                            Image URL
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                type="text"
                                name="image"
                                placeholder="http://example.com/autoddit.png"
                                onChange={this.handleChange} />

                            {
                                (_.includes(errors, 'emptyImage') || _.includes(errors, 'invalidImageURL')) &&
                                    <Alert bsStyle="danger">
                                        { _.includes(errors, 'emptyImage') && 'Image URL is empty!' }
                                        <br />
                                        { _.includes(errors, 'invalidImageURL') && 'Image URL is invalid!' }
                                    </Alert>
                            }
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button onClick={this.addAutoddit}>Add</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

AddAutodditComponent.defaultProps = {
    autoddits: [],
    user: {}
};

AddAutodditComponent.propTypes = {
    actions: PropTypes.object,
    autoddits: PropTypes.arrayOf(PropTypes.object)
};

const mapStateToProps = (store) => {
    return {
        autoddits: store.autoddits,
        user: store.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: {
            add: (autodditItem) => dispatch(add(autodditItem))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddAutodditComponent);