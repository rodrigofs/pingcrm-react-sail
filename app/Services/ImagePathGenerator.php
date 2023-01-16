<?php

namespace App\Services;

use League\Glide\Urls\UrlBuilder;
use League\Glide\Urls\UrlBuilderFactory;

class ImagePathGenerator
{
    private UrlBuilder $urlBuilder;

    public function __construct(string $signature)
    {
        $this->urlBuilder = UrlBuilderFactory::create('/img', $signature);
    }

    public function generate($path, array $params)
    {
        return $this->urlBuilder->getUrl($path, $params);
    }
}
