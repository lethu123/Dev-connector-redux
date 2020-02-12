import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextFieldGroup = ({
    name,
    placeholder,
    value,
    label,
    error,
    info,
    type,
    onChange,
    disabled,
    classname

}) => {

    return (
        <div className="form-group">
            {label && <label>{label}</label>}

            <input type={type} placeholder={placeholder} name={name} value={value} onChange={onChange} disabled={disabled}
                className={classnames('form-control form-control-lg', classname, {
                    'is-invalid': error
                })}
            />
            {info && <small className="form-text text-muted">{info}</small>}
            {error && <div className="invalid-feedback d-block">{error}</div>}
        </div>
    );

};

TextFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    info: PropTypes.string,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.string,
    label: PropTypes.string,
    classname: PropTypes.string
};


TextFieldGroup.defaultProps = {
    type: 'text'
};

export default TextFieldGroup;