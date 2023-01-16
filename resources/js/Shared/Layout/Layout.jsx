import BottomHeader from '@/Shared/Layout/BottomHeader';
import FlashMessages from '@/Shared/Layout/FlashMessages';
import MainMenu from '@/Shared/Layout/MainMenu';
import TopHeader from '@/Shared/Layout/TopHeader';
import { Head as Helmet } from '@inertiajs/react';
import React from 'react';

export default function Layout({ children }) {
    return (
        <div>
            <Helmet titleTemplate='%s | Ping CRM' />
            <div className='flex flex-col'>
                <div className='h-screen flex flex-col'>
                    <div className='md:flex'>
                        <TopHeader />
                        <BottomHeader />
                    </div>
                    <div className='flex flex-grow overflow-hidden'>
                        <MainMenu className='bg-indigo-800 flex-shrink-0 w-56 p-12 hidden md:block overflow-y-auto' />
                        {/* To reset scroll region (https://inertiajs.com/pages#scroll-regions) add `scroll-region="true"` to div below */}
                        <div className='w-full overflow-hidden px-4 py-8 md:p-12 overflow-y-auto' scroll-region='true'>
                            <FlashMessages />
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
