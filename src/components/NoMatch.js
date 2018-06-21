import React from 'react';

const NoMatch = ({ location }) => (
    <div className="container">
        <h3>
            No match for <code>{location.pathname}</code>
        </h3>
    </div>
);

export default NoMatch;