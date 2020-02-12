import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const SelectFieldGroup = ({
    name,
    label,
    error,
    info,
    onChange,
    disabled,
    classname,
    option,
    value

}) => {

    return (
        <div className="form-group">
            <select name={name} onChange={onChange} disabled={disabled} value={value} className={classnames('form-control form-control-lg', classname, {
                'is-invalid': error
            })}>
                {option.map((opt, index) => (
                    <option key={index} value={opt}>{opt}</option>
                ))}

            </select>
            {info && <small className="form-text text-muted">{info}</small>}
            {error && <div className="invalid-feedback d-block">{error}</div>}
        </div>
    );

};

SelectFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    info: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.string,
    option: PropTypes.array.isRequired
};

export default SelectFieldGroup;