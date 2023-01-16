import InlineError from '@/Shared/Form/InlineError';
import cx from 'classnames';
import React from 'react';

export default ({ label, name, className, errors = [], ...props }) => {
  return (
    <div className={className}>
      {label && (
        <label className="form-label" htmlFor={name}>
          {label}:
        </label>
      )}
      <input
        id={name}
        name={name}
        {...props}
        className={cx(
            'form-input',
            { 'cursor-not-allowed': props.disabled },
            {'error': errors.length}
        )}
      />
      <InlineError error={errors} />
    </div>
  );
};
