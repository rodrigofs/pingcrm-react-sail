import SelectInput from '@/Shared/Form/SelectInput';
import TextInput from '@/Shared/Form/TextInput';
import useInputHandleChange from '@/Shared/Hooks/useInputHandleChange';
import LoadingButton from '@/Shared/LoadingButton';

import { Head as Helmet, Link as InertiaLink, useForm, usePage } from '@inertiajs/react';
import React from 'react';

export default () => {
    const { organizations } = usePage().props;
    const { data, setData, errors, post, processing } = useForm({
        first_name: '',
        last_name: '',
        organization_id: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        region: '',
        country: '',
        postal_code: ''
    });

    const handleChange = useInputHandleChange(setData);

    function handleSubmit(e) {
        e.preventDefault();
        post(route('contacts.store'));
    }

    return (
        <div>
            <Helmet title='Create Contact' />
            <h1 className='mb-8 text-3xl font-bold'>
                <InertiaLink
                    href={route('contacts')}
                    className='text-indigo-600 hover:text-indigo-700'
                >
                    Contacts
                </InertiaLink>
                <span className='font-medium text-indigo-600'> /</span> Create
            </h1>
            <div className='max-w-3xl overflow-hidden bg-white rounded shadow'>
                <form onSubmit={handleSubmit}>
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
                        <SelectInput
                            className='w-full pb-8 pr-6 lg:w-1/2'
                            label='Organization'
                            name='organization_id'
                            errors={errors.organization_id}
                            value={data.organization_id}
                            onChange={handleChange}
                        >
                            <option value=''></option>
                            {organizations.map(({ id, name }) => (
                                <option key={id} value={id}>
                                    {name}
                                </option>
                            ))}
                            <option value='CA'>Canada</option>
                            <option value='US'>United States</option>
                        </SelectInput>
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
                            label='Phone'
                            name='phone'
                            type='text'
                            errors={errors.phone}
                            value={data.phone}
                            onChange={handleChange}
                        />
                        <TextInput
                            className='w-full pb-8 pr-6 lg:w-1/2'
                            label='Address'
                            name='address'
                            type='text'
                            errors={errors.address}
                            value={data.address}
                            onChange={handleChange}
                        />
                        <TextInput
                            className='w-full pb-8 pr-6 lg:w-1/2'
                            label='City'
                            name='city'
                            type='text'
                            errors={errors.city}
                            value={data.city}
                            onChange={handleChange}
                        />
                        <TextInput
                            className='w-full pb-8 pr-6 lg:w-1/2'
                            label='Province/State'
                            name='region'
                            type='text'
                            errors={errors.region}
                            value={data.region}
                            onChange={handleChange}
                        />
                        <SelectInput
                            className='w-full pb-8 pr-6 lg:w-1/2'
                            label='Country'
                            name='country'
                            errors={errors.country}
                            value={data.country}
                            onChange={handleChange}
                        >
                            <option value=''></option>
                            <option value='CA'>Canada</option>
                            <option value='US'>United States</option>
                        </SelectInput>
                        <TextInput
                            className='w-full pb-8 pr-6 lg:w-1/2'
                            label='Postal Code'
                            name='postal_code'
                            type='text'
                            errors={errors.postal_code}
                            value={data.postal_code}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex items-center justify-end px-8 py-4 bg-gray-100 border-t border-gray-200'>
                        <LoadingButton
                            loading={processing}
                            type='submit'
                            className='btn-indigo'
                        >
                            Create Contact
                        </LoadingButton>
                    </div>
                </form>
            </div>
        </div>
    );
};
