import InlineError from '@/Shared/Form/InlineError';
import classNames from 'classnames';
import React, { useCallback } from 'react';

export default ({ label, name, className, errors = [], ...props }) => {

    const count = useCallback(() => {
        if (typeof props.maxlength !== 'undefined') {
            return `${String(props.value).length}/${props.maxlength}`
        }
    }, [props.value])

    return (
        <div className={className}>
            {label && (
                <label className="form-label" htmlFor={name}>
                    <div className={'w-fill inline flex justify-between'}>
                        <span>{label}:</span> <span className={`mr-1 text-${props.size}`}>{count()}</span>
                    </div>

                </label>
            )}
            <textarea
                id={name}
                name={name}
                {...props}
                className={classNames(
                    'form-textarea',
                    { 'cursor-not-allowed': props.disabled },
                    {'error': errors.length}
                )}
            />
            <InlineError error={errors} />
        </div>
    );
};
