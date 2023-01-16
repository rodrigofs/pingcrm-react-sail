import InlineError from '@/Shared/Form/InlineError';
import React, { useState } from 'react';
import Select from 'react-select';

export default React.forwardRef(({
                                     label,
                                     name,
                                     className,
                                     children,
                                     errors = [],
                                     ...props
                                 }, ref) => {
    const hasError = errors.length > 0

    return (
        <div className={className}>
            {label && (
                <label className='form-label' htmlFor={name}>
                    {label}:
                </label>
            )}
            <Select
                styles={{
                    control: (base, state) => ({
                        ...base,
                        minHeight: '29.6px',
                        height: '29.6px',
                        boxShadow: state.isFocused ? (hasError ? 'red' : "none") : hasError ? 'red' : "none",
                        borderColor: state.isFocused ? (hasError ? 'red' : '#b0bdfc') : hasError ? 'red' : 'hsl(215, 30%, 92.2%)',
                        borderWidth: state.isFocused ? '2px' : '1px',
                        '&:hover': {
                            //borderWidth: '2px',
                            //borderColor: state.isFocused ? (hasError ? 'red' :'#b0bdfc') : hasError ? 'red' :'hsl(215, 30%, 92.2%)',
                        },
                    }),

                    menuList: (base, props) => ({
                        '::after' : 'none',
                        borderWidth: 0
                    }),

                    dropdownIndicator: (base, state) => ({
                        padding : 0,
                        paddingBottom: 3,
                        paddingRight: 8
                    }),

                    container: (base, props) => ({
                        ...base,
                    }),

                }}
                ref={ref}
                id={name}
                name={name}
                isSearchable
                loadingMessage={() => 'carregando...'}
                noOptionsMessage={() => 'Sem registros'}
                //className={`form-select ${errors.length ? 'error' : ''}`}
                classNamePrefix="react-select"
                className={`mt-0 block w-full`}
                {...props}
            />

            <InlineError error={errors} />
        </div>
    );
});
