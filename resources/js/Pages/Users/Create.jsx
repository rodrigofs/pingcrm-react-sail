import CheckboxInput from '@/Shared/Form/CheckboxInput';
import FileInput from '@/Shared/Form/FileInput';
import RadioInput from '@/Shared/Form/RadioInput';
import SelectInput from '@/Shared/Form/SelectInput';
import TextInput from '@/Shared/Form/TextInput';
import useInputHandleChange from '@/Shared/Hooks/useInputHandleChange';
import LoadingButton from '@/Shared/LoadingButton';
import { Head as Helmet, Link as InertiaLink, useForm } from '@inertiajs/react';
import React, { useRef } from 'react';

export default () => {
    const { data, setData, errors, post, processing } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        owner: '0',
        photo: ''
    });

    const fileInput = useRef(null);

    function handleSubmit(e) {
        e.preventDefault();
        post(route('users.store'));
    }

    const handleChange = useInputHandleChange(setData);

    return (
        <div>
            <Helmet title='Create User' />
            <div>
                <h1 className='mb-8 text-3xl font-bold'>
                    <InertiaLink
                        href={route('users')}
                        className='text-indigo-600 hover:text-indigo-700'
                    >
                        Users
                    </InertiaLink>
                    <span className='font-medium text-indigo-600'> /</span> Create
                </h1>
            </div>
            <div className='max-w-3xl overflow-hidden bg-white rounded shadow'>
                <form name='createForm' onSubmit={handleSubmit}>
                    <div className='flex flex-wrap p-8 -mb-8 -mr-6'>
                        <TextInput
                            className='w-full pb-8 pr-6 lg:w-1/2'
                            label='First Name'
                            name='first_name'
                            errors={errors.first_name}
                            value={data.first_name}
                            onChange={handleChange}
                        />
                        <TextInput
                            className='w-full pb-8 pr-6 lg:w-1/2'
                            label='Last Name'
                            name='last_name'
                            errors={errors.last_name}
                            value={data.last_name}
                            onChange={handleChange}
                        />
                        <TextInput
                            className='w-full pb-8 pr-6 lg:w-1/2'
                            label='Email'
                            name='email'
                            type='email'
                            errors={errors.email}
                            value={data.email}
                            onChange={handleChange}
                        />
                        <TextInput
                            className='w-full pb-8 pr-6 lg:w-1/2'
                            label='Password'
                            name='password'
                            type='password'
                            errors={errors.password}
                            value={data.password}
                            onChange={handleChange}
                        />
                        {/*<SelectInput*/}
                        {/*    className='w-full pb-8 pr-6 lg:w-1/2'*/}
                        {/*    label='Owner'*/}
                        {/*    name='owner'*/}
                        {/*    errors={errors.owner}*/}
                        {/*    value={data.owner}*/}
                        {/*    onChange={handleChange}*/}
                        {/*>*/}
                        {/*    <option value='1'>Yes</option>*/}
                        {/*    <option value='0'>No</option>*/}
                        {/*</SelectInput>*/}

                        <div className={'flex items-center w-full pb-8 pr-6 lg:w-1/2'}>
                            <RadioInput
                                className='w-full'
                                name={'owner'}
                                label={'Owner'}
                                errors={errors.owner}
                                checked={data.owner === '1'}
                                value={'1'}
                                onChange={handleChange}
                            />

                            <RadioInput
                                className='w-full'
                                name={'owner'}
                                label={'User'}
                                errors={errors.owner}
                                checked={data.owner === '0'}
                                value={'0'}
                                onChange={handleChange}
                            />
                        </div>


                        <FileInput
                            ref={fileInput}
                            className='w-full pb-8 pr-6 lg:w-1/2'
                            label='Photo'
                            name='photo'
                            accept='image/*'
                            errors={errors.photo}
                            value={data.photo}
                            onChange={handleChange}
                            onRemove={() => setData((d) => ({ ...d, photo: null }))}
                        />
                    </div>
                    <div className='flex items-center justify-end px-8 py-4 bg-gray-100 border-t border-gray-200'>
                        <LoadingButton
                            loading={processing}
                            type='submit'
                            className='btn-indigo'
                        >
                            Create User
                        </LoadingButton>
                    </div>
                </form>
            </div>
        </div>
    );
};
