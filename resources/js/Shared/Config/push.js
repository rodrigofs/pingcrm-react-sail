import Echo from "laravel-echo";

export default () => {
    window.Pusher = require('pusher-js');

    window.Echo = new Echo({
        broadcaster: 'pusher',
        key: import.meta.env.VITE_PUSHER_APP_KEY,
        wsHost: window.location.host,
        wssPort: import.meta.env.VITE_PUSHER_PORT,
        wsPort: import.meta.env.VITE_PUSHER_PORT,
        forceTLS: import.meta.env.VITE_PUSHER_SCHEME === 'https',
        disableStats: true,
        encrypted: true,
        enabledTransports: ['ws', 'wss'],
    })
}



