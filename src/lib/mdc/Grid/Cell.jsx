
// Libs
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';


const isDefined = obj => typeof obj !== 'undefined';


const classRoot = 'mdc-layout-grid__cell';
const Cell = ({ align, className, col, order, phone, tablet, ...rest }) => {
    const classes = classNames(classRoot, className, {
        [`${classRoot}--span-${col}`]          : isDefined(col),
        [`${classRoot}--span-${tablet}-tablet`]: isDefined(tablet),
        [`${classRoot}--span-${phone}-phone`]  : isDefined(phone),
        [`${classRoot}--order-${order}`]       : isDefined(order),
        [`${classRoot}--align-${align}`]       : isDefined(align)
    });

    return <div className={classes} {...rest} />;
};

Cell.propTypes = {
    align    : PropTypes.oneOf(['top', 'middle', 'bottom']),
    className: PropTypes.string,
    col      : PropTypes.number,
    order    : PropTypes.number,
    phone    : PropTypes.number,
    tablet   : PropTypes.number
};

Cell.defaultProps = {
    align    : null,
    className: null,
    col      : null,
    order    : null,
    phone    : null,
    tablet   : null
};

export default Cell;
