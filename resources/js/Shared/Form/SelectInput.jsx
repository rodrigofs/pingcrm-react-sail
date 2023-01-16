import InlineError from '@/Shared/Form/InlineError';
import cx from 'classnames';
import React from 'react';

export default ({
  label,
  name,
  className,
  children,
  errors = [],
  ...props
}) => {
  return (
    <div className={className}>
      {label && (
        <label className="form-label" htmlFor={name}>
          {label}:
        </label>
      )}
      <select
        id={name}
        name={name}
        {...props}
        className={cx(
            'form-select',
            { 'cursor-not-allowed': props.disabled },
            {'error' : errors.length}
        )}
      >
        {children}
      </select>
        <InlineError error={errors} />
    </div>
  );
};
