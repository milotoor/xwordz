
import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';

/**
 * Intended as a wrapper to be used on MDC component classes. This wrapper takes a configuration
 * and returns a function accepting a component as an argument: that component will then become a
 * higher-order component in which the `className` prop is extended to include an MDC shadow class
 *
 * @param config [object]
 *   Object containing at least one key, `usual`, as well as any other keys that may be applicable
 *   to the component the `shadow` function is wrapping. For instance, the `Card` component has two
 *   states in the Material spec: "resting" (or default) and "raised". The `Card` component in our
 *   implementation of MDC will likewise have a `raised` boolean prop. If the `config` object has a
 *   `raised` key, and the instantiated HOC is passed the `raised` prop, the resulting component
 *   will be passed an MDC shadow class associated with the value provided to the `raised` key in
 *   the `config` object.
 */
export const shadow = config => (Component) => {
    const configKeys = Object.keys(config);

    // If a recognized config key is passed, yield it
    const getShadowProp = (props) => {
        for (const key of configKeys) {
            if (Object.keys(props).includes(key)) return key;
        }

        return null;
    };

    const getShadowValue = (shadowProp) => {
        if (shadowProp === null) return config.usual;
        return config[shadowProp];
    };

    return (props) => {
        const shadowProp = getShadowProp(props);
        const shadowValue = getShadowValue(shadowProp);
        const classes = classNames(props.className, `mdc-elevation--z${shadowValue}`);

        // If a shadow prop was found, remove it from the object
        const newProps = _.omit(props, shadowProp);
        return React.createElement(Component, {
            ...newProps,
            className: classes
        });
    };
};
