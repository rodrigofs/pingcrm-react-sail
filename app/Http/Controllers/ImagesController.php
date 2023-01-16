<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use League\Glide\Server;
use League\Glide\Signatures\Signature;
use League\Glide\Signatures\SignatureException;

class ImagesController extends Controller
{
    /**
     * @throws SignatureException
     */
    public function show(Server $glide, Signature $signature, Request $request, $path)
    {
        $signature->validateRequest("{$glide->getBaseUrl()}/$path", $request->all());

        return $glide->getImageResponse($path, $request->all());
    }
}
