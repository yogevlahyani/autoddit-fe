import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

// Components
import CommentItem from "./CommentItem";

class CommentList extends Component {

    renderCommentList() {
        const { autoddits, autodditIndex } = this.props;
        const { comments } = autoddits[autodditIndex];
        return comments.map((adItem, i) => <CommentItem key={i} index={i} comment={adItem} />);
    }

    render() {

        return (
            <div className="autoddit-list-container container">
                <h3>Comments:</h3>
                { this.renderCommentList() }
            </div>
        );
    }
}

CommentList.defaultProps = {
    autoddits: []
};

CommentList.propTypes = {
    actions: PropTypes.object,
    autoddits: PropTypes.arrayOf(PropTypes.object)
};

const mapStateToProps = (store) => {
    return {
        autoddits: store.autoddits
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: { }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);