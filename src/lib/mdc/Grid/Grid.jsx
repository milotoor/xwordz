
// Libs
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';


const Grid = ({ className, children, ...rest }) => {
    const classes = classNames('mdc-layout-grid', className);
    return (
        <div className={classes} {...rest}>
            <div className="mdc-layout-grid__inner">
                {children}
            </div>
        </div>
    );
};

Grid.propTypes = {
    className: PropTypes.string,
    children : PropTypes.node
};

Grid.defaultProps = {
    className: null,
    children : null
};

export default Grid;
