import Layout from '@/Shared/Layout/Layout.jsx';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react'

function pageResolver(name) {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
    let page = pages[`./Pages/${name}.jsx`];
    page.default.layout = (page.default.layout) ?? (page => <Layout children={page} /> );
    return page;
}

createInertiaApp({
    title: title => `${title} - ${import.meta.env.VITE_APP_NAME}`,
    id: 'app',
    progress: {
        delay: 50
    },
    resolve: pageResolver,
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />)
    },
}).then(void 0)

// Setup Push websocket
require('@/Shared/Config/push')();

// Setup Globals
require('@/Shared/Utils/prototypes')();



