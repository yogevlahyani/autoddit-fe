import React from 'react';
import './CommentItem.css';
import {Col, Row} from "react-bootstrap";
import moment from "moment/moment";

const CommentItem = ({ comment, index }) => {

    const renderComments = (commentsArray) => {
        if (commentsArray.length < 0) { return null; }

        return (
            <ul className="list-group sub-comments">
                {
                    commentsArray.map((rComment, i) => {
                        const { text, user_ref, created_at, votes } = rComment;
                        const renderedVotes = votes >= 1000 ? parseFloat(votes / 1000).toFixed(2) + 'K' : votes;
                        const timeAgo = moment(created_at, 'MMM DD, YYYY HH:mm').fromNow();
                        return (
                            <li key={i} className="list-item comment-container">
                                <Row>
                                    <Col xs={2} className="vote text-center">
                                        <div className="arrow upvote">
                                            <i className="fas fa-arrow-up" />
                                        </div>
                                        <div className="vote-count">
                                            { renderedVotes }
                                        </div>
                                        <div className="arrow downvote">
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
                                {rComment.comments.length > 0 && renderComments(rComment.comments)}
                            </li>
                        );
                    })
                }
            </ul>
        );
    };

    const { text, user_ref, created_at, votes } = comment;
    const renderedVotes = votes >= 1000 ? parseFloat(votes / 1000).toFixed(2) + 'K' : votes;
    const timeAgo = moment(created_at, 'MMM DD, YYYY HH:mm').fromNow();

    return (
        <div className="comments-container">
            <ul className="list-group">
                <li className="list-item comment-container">
                    <Row>
                        <Col xs={2} className="vote text-center">
                            <div className="arrow upvote">
                                <i className="fas fa-arrow-up" />
                            </div>
                            <div className="vote-count">
                                { renderedVotes }
                            </div>
                            <div className="arrow downvote">
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
                    { renderComments(comment.comments) }
                </li>
            </ul>
        </div>
    );
};

export default CommentItem;