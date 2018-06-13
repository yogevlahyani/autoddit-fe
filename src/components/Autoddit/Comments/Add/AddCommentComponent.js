import React, { Component } from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Button, ControlLabel, Form, FormControl, FormGroup, Modal} from "react-bootstrap";
import moment from "moment";
import _ from 'lodash';

import { add } from "../actions";

class AddCommentComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            comment: '',
            error: false
        }
    }

    validateComment() {
        const { comment } = this.state;
        let error = false;

        if (_.isEmpty(comment)) { error = true }

        this.setState({ error });

        return !error;
    }

    addComment = () => {
        const { comment } = this.state;
        const { index, user } = this.props;
        const created_at = moment().format('MMM DD, YYYY HH:mm');

        if (this.validateComment()) {
            this.props.actions.add({
                index,
                user_ref: user.name,
                text: comment,
                created_at,
                votes: 100000
            });
            this.props.closeModal();
        }
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        const { error } = this.state;
        const { showAddCommentModal, closeModal } = this.props;

        return (
            <div className="static-modal">
                <Modal show={showAddCommentModal}>
                    <Modal.Header>
                        <Modal.Title>Add comment</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div className="add-autoddit-comment container-fluid">
                            <Form horizontal>
                                <FormGroup controlId="formHorizontalMessage" validationState={error ? 'error' : null}>
                                    <ControlLabel>Your Message</ControlLabel>
                                    <FormControl componentClass="textarea" placeholder="textarea" name="comment" onChange={this.handleChange} />
                                </FormGroup>

                            </Form>
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={closeModal}>Close</Button>
                        <Button bsStyle="primary" onClick={this.addComment}>Add comment</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
};

AddCommentComponent.propTypes = {
    actions: PropTypes.object,
    showAddCommentModal: PropTypes.bool
};

const mapStateToProps = (store) => {
    return { };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: {
            add: (details) => dispatch(add(details))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCommentComponent);