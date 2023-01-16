import React from 'react'

const InlineError = ({error}) => {
    if (!error) return <></>
    return <span className={'text-red-500 text-xs'}>{error}</span>
};

export default InlineError;
