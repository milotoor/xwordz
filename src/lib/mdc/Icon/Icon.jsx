
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


const Icon = ({ className, name, ...otherProps }) => {
    const classes = classNames('material-icons', className);
    return <i className={classes} {...otherProps}>{name}</i>;
};

Icon.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string.isRequired
};

Icon.defaultProps = {
    className: null
};

export default Icon;
