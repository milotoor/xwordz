
import { createElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


const ListDivider = ({ inset, isListItem, className }) => {
    const tag = isListItem ? 'li' : 'hr';
    const classes = classNames('mdc-list-divider', {
        'mdc-list-divider--inset': inset
    }, className);

    const props = isListItem
        ? { className, role: 'separator' }
        : { className: classes };

    return createElement(tag, props);
};

ListDivider.propTypes = {
    className: PropTypes.string,
    isListItem: PropTypes.bool,
    inset: PropTypes.bool
};

ListDivider.defaultProps = {
    isListItem: false
};

export default ListDivider;
