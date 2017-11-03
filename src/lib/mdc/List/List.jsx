
import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ListDivider from './ListDivider';

const List = ({ className, children, dense, ...rest }) => {
    const childs = Children.map(children, child =>
        child.type === ListDivider
            ? cloneElement(child, { isListItem: true })
            : child
    );

    const classes = classNames('mdc-list', className, {
        'mdc-list--dense': dense
    });

    return (
        <ul className={classes} {...rest}>
            {childs}
        </ul>
    );
};

List.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    dense: PropTypes.bool
};

List.defaultProps = {
    className: null,
    children: null,
    dense: false
};

export default List;
