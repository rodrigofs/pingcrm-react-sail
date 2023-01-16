<?php

namespace App\Providers;

use App\Services\ImagePathGenerator;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\ServiceProvider;
use League\Glide\Responses\LaravelResponseFactory;
use League\Glide\Server;
use League\Glide\ServerFactory;
use League\Glide\Signatures\Signature;
use League\Glide\Signatures\SignatureException;

class GlideServiceProvider extends ServiceProvider
{
    /**
     * @throws SignatureException
     */
    public function register()
    {
        $this->app->singleton(ImagePathGenerator::class, fn () => new ImagePathGenerator(config('glide.key-signature')));
        $this->app->singleton(Signature::class, fn () => new Signature(config('glide.key-signature')));
        $this->app->singleton(Server::class, function (Application $app) {
            $filesystem = $app->get('filesystem');

            return ServerFactory::create([
                'response' => new LaravelResponseFactory($app->get(Request::class)),
                'source' => $filesystem->getDriver(),
                'cache' => $filesystem->getDriver(),
                'cache_folder' => '.cache',
                'cache_path_prefix' => '.cache',
                'base_url' => 'img',
            ]);
        });
    }

    public function boot()
    {
    }
}
