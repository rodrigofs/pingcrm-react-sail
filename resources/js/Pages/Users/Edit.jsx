import AlertDialog from '@/Shared/AlertDialog';
import Button from '@/Shared/Button';
import CheckboxInput from '@/Shared/Form/CheckboxInput';
import FileInput from '@/Shared/Form/FileInput';
import RadioInput from '@/Shared/Form/RadioInput';
import SelectInput from '@/Shared/Form/SelectInput';
import TextInput from '@/Shared/Form/TextInput';
import useInputHandleChange from '@/Shared/Hooks/useInputHandleChange';
import LoadingButton from '@/Shared/LoadingButton';
import TrashedMessage from '@/Shared/TrashedMessage';
import { Head as Helmet, Link as InertiaLink, router as Inertia, useForm, usePage } from '@inertiajs/react';
import React, { useRef } from 'react';


export default () => {

    const fileInput = useRef(null);

    const { user } = usePage().props;
    const { data, setData, errors, post, processing } = useForm({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        password: user.password || '',
        owner: user.owner ? '1' : '0' || '0',
        photo: '',

        // NOTE: When working with Laravel PUT/PATCH requests and FormData
        // you SHOULD send POST request and fake the PUT request like this.
        _method: 'PUT'
    });

    const handleChange = useInputHandleChange(setData);

    function handleSubmit(e) {
        e.preventDefault();

        // NOTE: We are using POST method here, not PUT/PACH. See comment above.
        post(route('users.update', user.id));
    }

    function destroy() {
        Inertia.delete(route('users.destroy', user.id));
    }

    function restore() {
        Inertia.put(route('users.restore', user.id));
    }

    return (
        <div>
            <Helmet title={`${user.first_name}`} />
            <div className='flex justify-start max-w-lg mb-8'>
                <h1 className='text-3xl font-bold'>
                    <InertiaLink
                        href={route('users')}
                        className='text-indigo-600 hover:text-indigo-700'
                    >
                        Users
                    </InertiaLink>
                    <span className='mx-2 font-medium text-indigo-600'>/</span>
                    {data.first_name}
                </h1>
                {user.photo && (
                    <img className='block w-8 h-8 ml-4 rounded-full' src={user.photo} />
                )}
            </div>
            {user.deleted_at && (
                <TrashedMessage onRestore={restore}>
                    This user has been deleted.
                </TrashedMessage>
            )}
            <div className='max-w-3xl overflow-hidden bg-white rounded shadow'>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-wrap p-8 -mb-8 -mr-6'>
                        <TextInput
                            className='w-full pb-8 pr-6 lg:w-1/2'
                            label='First Name'
                            name='first_name'
                            errors={errors?.first_name}
                            value={data.first_name}
                            onChange={handleChange}
                        />
                        <TextInput
                            className='w-full pb-8 pr-6 lg:w-1/2'
                            label='Last Name'
                            name='last_name'
                            errors={errors?.last_name}
                            value={data.last_name}
                            onChange={handleChange}
                        />

                        <TextInput
                            className='w-full pb-8 pr-6 lg:w-1/2'
                            label='Email'
                            name='email'
                            type='email'
                            errors={errors?.email}
                            value={data.email}
                            onChange={handleChange}
                        />
                        <TextInput
                            className='w-full pb-8 pr-6 lg:w-1/2'
                            label='Password'
                            name='password'
                            type='password'
                            errors={errors?.password}
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

                        {/*<CheckboxInput*/}
                        {/*    className='w-full pb-8 pr-6 lg:w-1/2'*/}
                        {/*    name={'owner'}*/}
                        {/*    label={'Owner'}*/}
                        {/*    errors={errors.owner}*/}
                        {/*    checked={data.owner}*/}
                        {/*    onChange={handleChange}*/}
                        {/*/>*/}

                        <div className={'flex items-center w-full pb-8 pr-6 lg:w-1/2'}>
                            <RadioInput
                                className='w-full'
                                name={'owner'}
                                label={'Owner'}
                                errors={errors.owner}
                                value={'1'}
                                checked={data.owner === '1'}
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
                            errors={errors?.photo}
                            value={data?.photo}
                            onRemove={() => setData((d) => ({ ...d, photo: '' }))}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex items-center px-8 py-4 bg-gray-100 border-t border-gray-200'>
                        {!user.deleted_at && (
                            <AlertDialog onConfirm={destroy}
                                         trigger={<Button className={'text-red-600'}>Delete User</Button>}
                                         title={'Delete User'}
                                         description={'Are you sure you want to restore this user?'} />
                        )}
                        <LoadingButton
                            loading={processing}
                            type='submit'
                            className='ml-auto btn-indigo'
                        >
                            Update User
                        </LoadingButton>
                    </div>
                </form>
            </div>
        </div>
    );
};
