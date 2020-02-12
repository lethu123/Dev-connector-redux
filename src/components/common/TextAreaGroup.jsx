import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextAreaGroup = ({
    name,
    placeholder,
    value,
    label,
    error,
    info,
    type,
    onChange,
    disabled,
    classname,
    column,
    row

}) => {

    return (
        <div className="form-group">
            <textarea value={value} type={type} placeholder={placeholder} name={name} row={row} column={column} onChange={onChange} disabled={disabled}
                className={classnames('form-control form-control-lg', classname, {
                    'is-invalid': error
                })}
            />
            {info && <small className="form-text text-muted">{info}</small>}
            {error && <div className="invalid-feedback d-block">{error}</div>}
        </div>
    );

};

TextAreaGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    info: PropTypes.string,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.string,
    column: PropTypes.string,
    row: PropTypes.string

};


TextAreaGroup.defaultProps = {
    type: 'text'
};

export default TextAreaGroup;