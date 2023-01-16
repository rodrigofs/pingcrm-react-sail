import AlertDialog from '@/Shared/AlertDialog';
import Button from '@/Shared/Button';
import SelectInput from '@/Shared/Form/SelectInput';
import TextInput from '@/Shared/Form/TextInput';
import useInputHandleChange from '@/Shared/Hooks/useInputHandleChange';
import LoadingButton from '@/Shared/LoadingButton';
import TrashedMessage from '@/Shared/TrashedMessage';

import { Head as Helmet, Link as InertiaLink, router as Inertia, useForm, usePage } from '@inertiajs/react';
import React from 'react';

export default () => {
    const { contact, organizations } = usePage().props;
    const { data, setData, errors, put, processing } = useForm({
        first_name: contact.first_name || '',
        last_name: contact.last_name || '',
        organization_id: contact.organization_id || '',
        email: contact.email || '',
        phone: contact.phone || '',
        address: contact.address || '',
        city: contact.city || '',
        region: contact.region || '',
        country: contact.country || '',
        postal_code: contact.postal_code || ''
    });

    const handleChange = useInputHandleChange(setData);

    function handleSubmit(e) {
        e.preventDefault();
        put(route('contacts.update', contact.id));
    }

    function destroy() {
        Inertia.delete(route('contacts.destroy', contact.id));
    }

    function restore() {
        Inertia.put(route('contacts.restore', contact.id));
    }

    return (<div>
        <Helmet title={`${data.first_name} ${data.last_name}`} />
        <h1 className='mb-8 text-3xl font-bold'>
            <InertiaLink
                href={route('contacts')}
                className='text-indigo-600 hover:text-indigo-700'
            >
                Contacts
            </InertiaLink>
            <span className='mx-2 font-medium text-indigo-600'>/</span>
            {data.first_name} {data.last_name}
        </h1>
        {contact.deleted_at && (<TrashedMessage onRestore={restore}>
            This contact has been deleted.
        </TrashedMessage>)}
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
                        {organizations.map(({ id, name }) => (<option key={id} value={id}>
                            {name}
                        </option>))}
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
                <div className='flex items-center px-8 py-4 bg-gray-100 border-t border-gray-200'>
                    {!contact.deleted_at && (<AlertDialog onConfirm={destroy}
                                                          trigger={<Button className={'text-red-600'}>Delete
                                                              Contact</Button>}
                                                          title={'Delete Contact'}
                                                          description={'Are you sure you want to restore this ontact?'} />)}
                    <LoadingButton
                        loading={processing}
                        type='submit'
                        className='ml-auto btn-indigo'
                    >
                        Update Contact
                    </LoadingButton>
                </div>
            </form>
        </div>
    </div>);
};
