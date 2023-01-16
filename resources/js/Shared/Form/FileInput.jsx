import InlineError from '@/Shared/Form/InlineError';
import { filesize } from '@/Shared/Utils/utils';
import cx from 'classnames';
import React from 'react';

const Button = ({ text, onClick }) => (
    <button
        type='button'
        className='px-2 py-1 text-xs font-medium text-white bg-gray-600 rounded-sm focus:outline-none hover:bg-gray-700'
        onClick={onClick}
    >
        {text}
    </button>
);

export default React.forwardRef(({ className, name, value, label, accept, onRemove, errors = [], ...props }, ref) => {

    function browse() {
        ref?.current.click();
    }

    function remove() {
        (typeof onRemove === 'function') ? onRemove(null) : '';
    }

    function RenderFile({ value }) {
        if (typeof value === 'string') {
            return <a href={value}><img className={'object-scale-down'} src={value} /></a>;
        }

        return <>
            {value?.name}
            <span className='ml-1 text-xs text-gray-600'>
                ({filesize(value)})
              </span>
        </>;
    }

    return (
        <div className={className}>
            {label && (
                <label className='form-label' htmlFor={name}>
                    {label}:
                </label>
            )}
            <div className={cx(`form-input p-0.5`,
                { 'error': errors.length },
                { 'cursor-not-allowed': props.disabled }
            )}>
                <input
                    id={name}
                    ref={ref}
                    accept={accept}
                    type='file'
                    className='hidden'
                    {...props}
                />
                {!value && (
                    <div className='p-0'>
                        <Button text='Procurar' onClick={browse} />
                    </div>
                )}
                {value && (
                    <div className='flex items-center justify-between p-2'>
                        <div className='flex-1 pr-1'>
                            <RenderFile value={value} />
                        </div>
                        <Button text='Remove' onClick={remove} />
                    </div>
                )}
            </div>
            <InlineError error={errors} />
        </div>
    );
});
