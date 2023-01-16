import { defineConfig } from 'vite';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import laravel from 'vite-plugin-laravel';
//import tailwindcssNesting from 'tailwindcss/nesting';
import vitePluginRequire from "vite-plugin-require";

import react from '@vitejs/plugin-react';
import * as os from 'os';
import { splitVendorChunkPlugin } from 'vite'
import dns from 'dns'
dns.setDefaultResultOrder('verbatim')

export default defineConfig({
    plugins: [
        vitePluginRequire(),
        splitVendorChunkPlugin(),
        laravel({
            postcss: [
                //tailwindcssNesting,
                tailwindcss(),
                autoprefixer()
            ]
        }),
        react({
            fastRefresh: true,
        }),
        {
            name: "configure-response-headers",
            configureServer: (server) => {
                server.middlewares.use((_req, res, next) => {
                    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
                    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
                    next();
                });
            },
        },
    ],
    build:{
        sourcemap: true,
        minify: "terser",
        terserOptions:{
            compress : true,
            sourceMap: true
        }
    },
    server: {
        // host: os.networkInterfaces().eth0?.[0].address,
        host:true,
        watch:{
            usePolling: true
        }
    },
});
