import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { upvote, downvote } from "./actions";
import {Panel, Row, Col, Button} from 'react-bootstrap';
import moment from 'moment';
import './AutodditItem.css';

// Components
import CommentList from "./Comments/CommentList";
import { AddCommentComponent } from "./Comments";

class AutodditItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showComments: false,
            showAddCommentModal: false
        }
    }

    doUpvote = () => {
        const { item, actions, index } = this.props;
        if (!item.hasOwnProperty('didUpvoted') || !item.didUpvoted) {
            actions.upvote(index);
        }
    };

    doDownvote = () => {
        const { item, actions, index } = this.props;
        if (!item.hasOwnProperty('didDownvote') || !item.didDownvote) {
            actions.downvote(index);
        }
    };

    toggleComments = () => {
        const { comments } = this.props.item;
        const { showComments } = this.state;

        if (comments.length > 0) {
          this.setState({ showComments: !showComments });
        }
    };

    showAddCommentModal = () => {
        const { showAddCommentModal, showComments } = this.state;
        let showCommentsAfterCommentAdded = showComments;

        if (!showAddCommentModal) { showCommentsAfterCommentAdded = true; }

        this.setState({
            showAddCommentModal: !showAddCommentModal,
            showComments: showCommentsAfterCommentAdded
        });
    };

    render() {
        const { showComments, showAddCommentModal } = this.state;
        const { item, index } = this.props;
        const { title, image, created_at, comments_count, votes, user_ref } = item;
        const renderedVotes = votes >= 1000 ? parseFloat(votes / 1000).toFixed(2) + 'K' : votes;
        // const timeAgo = moment(created_at).fromNow();
        const timeAgo = moment(created_at, 'MMM DD, YYYY HH:mm').format('MMM DD, YYYY HH:mm'); // 'MMM dd, YYYY HH:MM'


        return (
            <Panel>
                <Panel.Body>
                    <Row>
                        <Col xs={2} className="vote text-center">
                            <div className="arrow upvote" onClick={this.doUpvote}>
                                <i className="fas fa-arrow-up" />
                            </div>
                            <div className="vote-count">
                                { renderedVotes }
                            </div>
                            <div className="arrow downvote" onClick={this.doDownvote}>
                                <i className="fas fa-arrow-down" />
                            </div>
                        </Col>
                        <Col xs={3} className="image">
                            <img src={image} alt={title} className="img-fluid img-responsive" />
                        </Col>
                        <Col xs={7} className="details">
                            <h2 className="title flex-1">{title}</h2>
                            <small className="submitted-time flex-1">
                                submitted on { timeAgo } by <a href="/#">{ user_ref }</a>
                            </small>
                            <div className="comments flex-1">
                                <strong onClick={this.toggleComments}>{ comments_count } comments</strong>
                                <Button bsStyle="primary" className="add-autoddit-comment" onClick={this.showAddCommentModal}>
                                    <i className="fas fa-plus" />
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Panel.Body>
                <AddCommentComponent showAddCommentModal={showAddCommentModal} closeModal={this.showAddCommentModal} { ...this.props } />
                {
                    showComments && <CommentList autodditIndex={index} />
                }
            </Panel>
        );
    }
};

AutodditItem.propTypes = {
    actions: PropTypes.object
};

const mapStateToProps = (store) => {
    return { };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: {
            upvote: (index) => dispatch(upvote(index)),
            downvote: (index) => dispatch(downvote(index)),
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AutodditItem);