<?php
session_start();
// set a constant that holds the project's folder path, like "/var/www/".
// DIRECTORY_SEPARATOR adds a slash to the end of the path
define("ROOT", dirname(__DIR__) . DIRECTORY_SEPARATOR);
// set a constant that holds the project's "application" folder, like "/var/www/application".
define("APP", ROOT . "application" . DIRECTORY_SEPARATOR);
//echo '<pre>';
//var_dump( $_SERVER);exit;



require '../vendor/autoload.php';

$fb = new Facebook\Facebook([
    'app_id' => '{app-id}',
    'app_secret' => '{app-secret}',
    'default_graph_version' => 'v2.5',
]);


//var_dump(URL);exit;
require APP . "config/config.php";
require APP . "libs/helper.php";
require APP . "core/application.php";
require APP . "core/controller.php";



// start the application
$app = new Application();