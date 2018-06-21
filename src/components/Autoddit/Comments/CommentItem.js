import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CommentItem.css';
import {Col, Row, Button} from "react-bootstrap";
import moment from "moment/moment";
import {connect} from "react-redux";
import {AddCommentComponent} from "./index";
import {downvote, upvote} from "../actions";

import * as _ from 'lodash';

class CommentItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            currentComment: {}
        }
    }

    showAddCommentModal = (item) => {
        this.setState({
            currentComment: item,
            showModal: !this.state.showModal
        });
    };

    doUpvote = (comment) => {
        const { actions, autoddits } = this.props;
        const index = _.findIndex(autoddits, (o) => o.id === comment.id);
        if (!comment.hasOwnProperty('didUpvoted') || !comment.didUpvoted) {
            actions.upvote(index);
        }
    };

    doDownvote = (comment) => {
        const { actions, autoddits } = this.props;
        const index = _.findIndex(autoddits, (o) => o.id === comment.id);
        if (!comment.hasOwnProperty('didDownvote') || !comment.didDownvote) {
            actions.downvote(index);
        }
    };

    renderComments = (commentsArray) => {
        if (commentsArray.length < 0) { return null; }

        const { autoddits } = this.props;

        return (
            <ul className="list-group sub-comments">
                {
                    commentsArray.map((rComment, i) => {
                        const { text, user_ref, created_at, votes, comments_count } = rComment;
                        const renderedVotes = votes >= 1000 ? parseFloat(votes / 1000).toFixed(2) + 'K' : votes;
                        const timeAgo = moment(created_at, 'MMM DD, YYYY HH:mm').fromNow();
                        const childComments = autoddits.filter(a => a.parentId && a.parentId === rComment.id);

                        return (
                            <li key={i} className="list-item comment-container">
                                <Row>
                                    <Col xs={2} className="vote text-center">
                                        <div className="arrow upvote" onClick={() => this.doUpvote(rComment)}>
                                            <i className="fas fa-arrow-up" />
                                        </div>
                                        <div className="vote-count">
                                            { renderedVotes }
                                        </div>
                                        <div className="arrow downvote" onClick={() => this.doDownvote(rComment)}>
                                            <i className="fas fa-arrow-down" />
                                        </div>
                                    </Col>
                                    <Col xs={10} className="details">
                                        <p>
                                            {text}
                                        </p>
                                        <small className="submitted-time flex-1">
                                            submitted on { timeAgo } by <a href="/#">{ user_ref }</a>
                                        </small>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12}>
                                        <div>
                                            {comments_count} comments
                                            <Button bsStyle="primary" className="add-autoddit-comment" onClick={() => this.showAddCommentModal(rComment)}>
                                                <i className="fas fa-plus" />
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                                {childComments.length > 0 && this.renderComments(childComments)}
                            </li>
                        );
                    })
                }
            </ul>
        );
    };

    render() {
        const { comment, autoddits } = this.props;
        const { showModal, currentComment } = this.state;
        const {text, user_ref, created_at, votes, comments_count} = comment;
        const renderedVotes = votes >= 1000 ? parseFloat(votes / 1000).toFixed(2) + 'K' : votes;
        const timeAgo = moment(created_at, 'MMM DD, YYYY HH:mm').fromNow();
        const childComments = autoddits.filter(a => a.parentId && a.parentId === comment.id);

        console.log(comment);

        return (
            <div className="comments-container">
                <ul className="list-group">
                    <li className="list-item comment-container">
                        <Row>
                            <Col xs={2} className="vote text-center">
                                <div className="arrow upvote" onClick={() => this.doUpvote(comment)}>
                                    <i className="fas fa-arrow-up"/>
                                </div>
                                <div className="vote-count">
                                    {renderedVotes}
                                </div>
                                <div className="arrow downvote" onClick={() => this.doDownvote(comment)}>
                                    <i className="fas fa-arrow-down"/>
                                </div>
                            </Col>
                            <Col xs={10} className="details">
                                <p>
                                    {text}
                                </p>
                                <small className="submitted-time flex-1">
                                    submitted on {timeAgo} by <a href="/#">{user_ref}</a>
                                </small>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                <div>
                                    {comments_count} comments
                                    <Button bsStyle="primary" className="add-autoddit-comment" onClick={() => this.showAddCommentModal(comment)}>
                                        <i className="fas fa-plus" />
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                        <AddCommentComponent showAddCommentModal={showModal} closeModal={this.showAddCommentModal} item={currentComment} {...this.props} />
                        {this.renderComments(childComments)}
                    </li>
                </ul>
            </div>
        );
    }
}

CommentItem.defaultProps = {
    autoddits: []
};

CommentItem.propTypes = {
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
            upvote: (index) => dispatch(upvote(index)),
            downvote: (index) => dispatch(downvote(index))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentItem);
