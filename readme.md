# Ping CRM React

A demo application to illustrate how [Inertia.js](https://inertiajs.com/) works with [Laravel](https://laravel.com/) and [React](https://reactjs.org/).

> This is a port of the original [Ping CRM](https://github.com/inertiajs/pingcrm) written in Laravel and Vue.

![](https://raw.githubusercontent.com/landish/pingcrm-react/master/screenshot.png)

## Installation

Clone the repo locally:

```sh
git clone https://github.com/rodrigofs/pingcrm-react-sail.git
cd pingcrm-react-sail
```

Install PHP dependencies:

```sh
docker run --rm --interactive --tty  --volume $PWD:/app  composer/composer install --ignore-platform-reqs
```

change owner of vendor directory, to use sail composer no permission issues.

```sh
chown -R $USER vendor
```

Or

```sh
sudo chown -R $USER vendor
```

Run Sail

```sh
sail up -d
```

Install NPM dependencies:

```sh
sail yarn
```

Setup configuration:

```sh
cp .env.example .env
```

Generate application key:

```sh
sail artisan key:generate
```

Configuring the Glide server to validate each request before you output the image;
```sh
openssl rand -base64 64
```

Set complicated sign key in file .env com nome GLIDE_KEY
```
...
GLIDE_KEY=mkjeCnjkjk8cvrJiJFVTNANcg9NicyNU3N4QMEda...
...
```

Create an SQLite database. You can also use another database (MySQL, Postgres), simply update your configuration accordingly.

```sh
touch database/database.sqlite
```

Run database migrations:

```sh
sail artisan migrate
```

Run database seeder:

```sh
sail artisan db:seed
```

Run vite server:

```sh
sail yarn vite
```

Build assets:

```sh
sail yarn build
```

You're ready to go! [Visit Ping CRM](http://localhost/) in your browser, and login with:

- **Username:** johndoe@example.com
- **Password:** secret

## Running tests

To run the Ping CRM tests, run:

```
sail phpunit
```

## Credits

- Original work by Jonathan Reinink (@reinink) and contributors
- Port to Ruby on Rails by Georg Ledermann (@ledermann)
- Port to React by Lado Lomidze (@landish)
- Update for laravel sail and more by Rodrigo Fernandes (@rodrigofs)
