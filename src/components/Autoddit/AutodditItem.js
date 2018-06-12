import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { upvote, downvote } from "./actions";
import { Panel, Row, Col } from 'react-bootstrap';
import moment from 'moment';
import './AutodditItem.css';

const AutodditItem = ({ item, actions, index }) => {
    const { title, image, created_at, comments_count, votes, user_ref } = item;
    const renderedVotes = votes >= 1000 ? parseFloat(votes / 1000).toFixed(2) + 'K' : votes;
    // const timeAgo = moment(created_at).fromNow();
    const timeAgo = moment(created_at, 'MMM DD, YYYY HH:mm').format('MMM DD, YYYY HH:mm'); // 'MMM dd, YYYY HH:MM'

    const doUpvote = () => {
        if (!item.hasOwnProperty('didUpvoted') || !item.didUpvoted) {
            actions.upvote(index);
        }
    };

    const doDownvote = () => {
        if (!item.hasOwnProperty('didDownvote') || !item.didDownvote) {
            actions.downvote(index);
        }
    };

    return (
        <Panel>
            <Panel.Body>
                <Row>
                    <Col xs={2} className="vote text-center">
                        <div className="arrow upvote" onClick={doUpvote}>
                            <i className="fas fa-arrow-up" />
                        </div>
                        <div className="vote-count">
                            { renderedVotes }
                        </div>
                        <div className="arrow downvote" onClick={doDownvote}>
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
                            <strong>{ comments_count } comments</strong>
                        </div>
                    </Col>
                </Row>
            </Panel.Body>
        </Panel>
    );
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