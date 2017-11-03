
// Libs
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// MDC resources
import { shadow } from '../utils';


@shadow({ usual: 2, raised: 8 })
export default class Card extends PureComponent {
    static propTypes = {
        className: PropTypes.string
    };

    static defaultProps = {
        className: null
    };

    render () {
        const { className, children, ...rest } = this.props;
        const classes = classNames('mdc-card', className);
        return (
            <div className={classes} {...rest}>
                {children}
            </div>
        );
    }
}
