import React from 'react';
import PropTypes from 'prop-types';

function Icon(props) {
    const { className, size, name, color, type, onClick } = props;

    return (
        <svg className={`ri-icon ${className}`} viewBox={`0 0 ${size} ${size}`} width={size} height={size} onClick={onClick}>
            <use xlinkHref={`/static/img/icons.svg#ri-${name}-${type}`} fill={color} />
        </svg>
    );
}

Icon.defaultProps = {
    className : '',
    name      : '',
    color     : 'rgba(0, 0, 0, .60)',
    type      : 'line',
    size      : 24,
    onClick   : () => {},
};

Icon.propTypes = {
    className : PropTypes.string,
    name      : PropTypes.string,
    color     : PropTypes.string,
    type      : PropTypes.string,
    size      : PropTypes.number,
    onClick   : PropTypes.func,
};

export default Icon;
