import InlineError from '@/Shared/Form/InlineError';
import cx from 'classnames';
import React from 'react';

export default ({ label, name, className, errors = [], ...props }) => {
    return (
        <div className={`flex items-end ${className}`}>
            <label className={cx(
                'block text-sm mb-1 flex items-center',
                { 'text-red-500': errors.length }
            )} htmlFor={name}>
                <input
                    id={name}
                    type={'checkbox'}
                    name={name}
                    className={cx('form-checkbox text-sm',
                        { 'cursor-not-allowed': props.disabled },
                        { 'error': errors.length }
                    )}
                    {...props}
                />
                <span className={`mb-0 block text-gray-800 select-none text-sm font-semibold pl-1`}>{label}</span>
            </label>
            <InlineError error={errors} />
        </div>
    );
};
