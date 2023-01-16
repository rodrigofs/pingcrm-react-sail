import classNames from 'classnames';
import React from 'react';

export default ({ label, name, showStatus, className, errors = [], ...props }) => {

    function Status({ showStatus }) {
        if (showStatus) {
            return <div className={`text-sm text-gray-400 italic ml-2`}>{props.checked ? 'Sim' : 'Não'}</div>;
        }

        return <></>;
    }

    return (
        <div className={className}>
            <div className={'flex flex-col items-center'}>
                <label htmlFor={name} className={classNames('form-label', { 'error': errors.length })}>
                    <span className='bg-white shadow-sm' aria-hidden='true' />
                    {label}
                </label>
                <div className={'form-switch'}>
                    <input
                        type={'checkbox'}
                        id={name}
                        name={name}
                        //className={`form-input ${errors.length ? 'error' : ''}`}
                        className={classNames(
                            'sr-only',
                            `text-sm`,
                            { 'cursor-not-allowed': props.disabled },
                            { 'border-red-500': errors.length }
                        )}
                        {...props}
                    />
                    <label htmlFor={name}
                           className={classNames(`bg-gray-400 text-sm`, { 'text-red-500': errors.length })}>
                        <span className='bg-white shadow-sm' aria-hidden='true' />
                        <span className='sr-only'>{label}</span>
                    </label>


                    <Status showStatus={showStatus} />
                </div>
            </div>
        </div>
    );
};
