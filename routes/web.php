<?php

use Illuminate\Support\Facades\Route;

Route::get('/', [
    'as' => 'pages.map',
    'uses' => 'PagesController@map'
]);

Route::get('about', [
    'as' => 'pages.about',
    'uses' => 'PagesController@about'
]);
