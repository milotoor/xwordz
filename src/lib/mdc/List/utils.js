
import { cloneElement } from 'react';
import classNames from 'classnames';
import Icon from '../Icon';

/**
 * Adds detail classes to list items
 */
const addDetailClass = (component, start = true) => {
    const modificatorClass = start
        ? 'mdc-list-item__start-detail'
        : 'mdc-list-item__end-detail';

    if (component.type === Icon) {
        const { className } = component.props;
        const classes = classNames(modificatorClass, className);
        return cloneElement(component, {
            'className': classes,
            'aria-hidden': true
        });
    }

    return component;
};

export default addDetailClass;
