import { Head as Helmet } from '@inertiajs/react';
import React from 'react';

export default () => {
    return (
        <>
            <Helmet title='Reports' />
            <div>
                <h1 className='mb-8 text-3xl font-bold'>Reports</h1>
            </div>
        </>
    );
};
