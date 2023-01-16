import AlertDialog from '@/Shared/AlertDialog';
import Button from '@/Shared/Button';
import SelectInput from '@/Shared/Form/SelectInput';
import TextInput from '@/Shared/Form/TextInput';
import useInputHandleChange from '@/Shared/Hooks/useInputHandleChange';
import Icon from '@/Shared/Icon';
import LoadingButton from '@/Shared/LoadingButton';
import TrashedMessage from '@/Shared/TrashedMessage';
import { Head as Helmet, Link as InertiaLink, router as Inertia, useForm, usePage } from '@inertiajs/react';
import React from 'react';

export default () => {
    const { organization } = usePage().props;
    const { data, setData, errors, put, processing } = useForm({
        name: organization.name || '',
        email: organization.email || '',
        phone: organization.phone || '',
        address: organization.address || '',
        city: organization.city || '',
        region: organization.region || '',
        country: organization.country || '',
        postal_code: organization.postal_code || ''
    });

    const handleChange = useInputHandleChange(setData);

    function handleSubmit(e) {
        e.preventDefault();
        put(route('organizations.update', organization.id));
    }

    function destroy() {
        Inertia.delete(route('organizations.destroy', organization.id));
    }

    function restore() {
        Inertia.put(route('organizations.restore', organization.id));
    }

    return (
        <>
            <Helmet title={organization.name} />
            <div>
                <h1 className='mb-8 text-3xl font-bold'>
                    <InertiaLink
                        href={route('organizations')}
                        className='text-indigo-600 hover:text-indigo-700'
                    >
                        Organizations
                    </InertiaLink>
                    <span className='mx-2 font-medium text-indigo-600'>/</span>
                    {organization.name}
                </h1>
                {organization.deleted_at && (
                    <TrashedMessage onRestore={restore}>
                        This organization has been deleted.
                    </TrashedMessage>
                )}
                <div className='max-w-3xl overflow-hidden bg-white rounded shadow'>
                    <form onSubmit={handleSubmit}>
                        <div className='flex flex-wrap p-8 -mb-8 -mr-6'>
                            <TextInput
                                className='w-full pb-8 pr-6 lg:w-1/2'
                                label='Name'
                                name='name'
                                errors={errors.name}
                                value={data.name}
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
                            {!organization.deleted_at && (
                                <AlertDialog onConfirm={destroy}
                                             trigger={<Button className={'text-red-600'}>Delete Organization</Button>}
                                             title={'Delete Organization'}
                                             description={'Are you sure you want to restore this organization?'} />
                            )}
                            <LoadingButton
                                loading={processing}
                                type='submit'
                                className='ml-auto btn-indigo'
                            >
                                Update Organization
                            </LoadingButton>
                        </div>
                    </form>
                </div>
                <h2 className='mt-12 text-2xl font-bold'>Contacts</h2>
                <div className='mt-6 overflow-x-auto bg-white rounded shadow'>
                    <table className='w-full whitespace-nowrap'>
                        <thead>
                        <tr className='font-bold text-left'>
                            <th className='px-6 pt-5 pb-4'>Name</th>
                            <th className='px-6 pt-5 pb-4'>City</th>
                            <th className='px-6 pt-5 pb-4' colSpan='2'>
                                Phone
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {organization.contacts.map(
                            ({ id, name, phone, city, deleted_at }) => {
                                return (
                                    <tr
                                        key={id}
                                        className='hover:bg-gray-100 focus-within:bg-gray-100'
                                    >
                                        <td className='border-t'>
                                            <InertiaLink
                                                href={route('contacts.edit', id)}
                                                className='flex items-center px-6 py-4 focus:text-indigo'
                                            >
                                                {name}
                                                {deleted_at && (
                                                    <Icon
                                                        name='trash'
                                                        className='flex-shrink-0 w-3 h-3 ml-2 text-gray-400 fill-current'
                                                    />
                                                )}
                                            </InertiaLink>
                                        </td>
                                        <td className='border-t'>
                                            <InertiaLink
                                                tabIndex='-1'
                                                href={route('contacts.edit', id)}
                                                className='flex items-center px-6 py-4 focus:text-indigo'
                                            >
                                                {city}
                                            </InertiaLink>
                                        </td>
                                        <td className='border-t'>
                                            <InertiaLink
                                                tabIndex='-1'
                                                href={route('contacts.edit', id)}
                                                className='flex items-center px-6 py-4 focus:text-indigo'
                                            >
                                                {phone}
                                            </InertiaLink>
                                        </td>
                                        <td className='w-px border-t'>
                                            <InertiaLink
                                                tabIndex='-1'
                                                href={route('contacts.edit', id)}
                                                className='flex items-center px-4'
                                            >
                                                <Icon
                                                    name='cheveron-right'
                                                    className='block w-6 h-6 text-gray-400 fill-current'
                                                />
                                            </InertiaLink>
                                        </td>
                                    </tr>
                                );
                            }
                        )}
                        {organization.contacts.length === 0 && (
                            <tr>
                                <td className='px-6 py-4 border-t' colSpan='4'>
                                    No contacts found.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};
