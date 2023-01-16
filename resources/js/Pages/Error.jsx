import React from 'react';
import { Head as Helmet, Link as InertiaLink, Link, usePage } from '@inertiajs/react';

export default () => {
     const { status } = usePage().props;

    const title = {
        503: '503: Serviço indisponível',
        500: '500: Erro de servidor',
        404: '404: Página não encontrada',
        403: '403: Proibido'
    }[status];

    const description = {
        503: 'Desculpe, estamos fazendo algumas manutenções. Por favor, volte mais tarde.',
        500: 'Ops, algo deu errado em nossos servidores.',
        404: 'Desculpe, a página que você está procurando não foi encontrada.',
        403: 'Desculpe, você não tem permissão para acessar esta página.'
    }[status];

    return (
        <div className='flex items-center justify-center h-full w-full text-indigo-600'>
            <Helmet title={title} />
            <div className='w-full max-w-md'>
                <h1 className='text-3xl'>{title}</h1>
                <p className='mt-3 text-lg leading-tight'>{description}</p>
            </div>
            <InertiaLink className="mr-1 btn-indigo" href="/">
                Voltar
            </InertiaLink>

        </div>
    );
};
