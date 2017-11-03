
// Libs
import React, { Children } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// List resources
import addDetailClass from './utils';


const ListItem = ({ className, children, ...rest }) => {
    // Provide "detail" classes to the children
    const childs = Children.map(children, (child, index) => addDetailClass(child, index === 0));
    const classes = classNames('mdc-list-item', className);

    return (
        <li className={classes} {...rest}>
            {childs}
        </li>
    );
};

ListItem.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node
};

ListItem.defaultProps = {
    className: null,
    children: null
};

export default ListItem;
