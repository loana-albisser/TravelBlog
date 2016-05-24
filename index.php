<?php


use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

echo "halllo1";
require 'vendor/autoload.php';
echo "halllo2";

$config['addContentLengthHeader'] = false;

$app = new \Slim\App(["settings" => $config]);
echo "halllo3";
$app->get('/hello/{name}', function (Request $request, Response $response) {
    $name = $request->getAttribute('name');
    $response->getBody()->write("Hello, $name");

    return $response;
});
echo "halllo";
$app->run();

echo "halllo";