import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import "./AutodditList.css";

// Redux
import { connect } from 'react-redux';
import { fetch } from './actions';

// Components
import AutodditItem from "./AutodditItem";

class AutodditList extends Component {

    componentWillMount() {
        this.props.actions.fetch();
    }

    renderAutodditsList() {
        return this.props.autoddits.map((adItem, i) => <AutodditItem { ...this.props } key={i} index={i} item={adItem} />);
    }

    goToAddAutoddit() {
        this.props.history.push('/autoddit/add');
    }

    render() {
        const tooltip = (
            <Tooltip id="tooltip">
                Add new <strong>Autoddit!</strong>
            </Tooltip>
        );

        return (
            <div className="autoddit-list-container container">
                { this.renderAutodditsList() }

                <OverlayTrigger placement="right" overlay={tooltip}>
                    <Button bsStyle="danger" className="add-autoddit-item" onClick={this.goToAddAutoddit.bind(this)}>
                        <i className="fas fa-plus" />
                    </Button>
                </OverlayTrigger>
            </div>
        );
    }
}

AutodditList.defaultProps = {
    autoddits: []
};

AutodditList.propTypes = {
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
        actions: {
            fetch: () => dispatch(fetch())
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AutodditList);