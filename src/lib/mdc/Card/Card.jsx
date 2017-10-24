
// Libs
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


const Card = ({ className, children, ...rest }) => {
    const classes = classNames('mdc-card', className);
    return (
        <div className={classes} {...rest}>
            {children}
        </div>
    );
};

Card.propTypes = {
    className: PropTypes.string,
    children : PropTypes.node
};

Card.defaultProps = {
    className: null,
    children : null
};

export default Card;
