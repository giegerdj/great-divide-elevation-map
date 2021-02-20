let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
var buildDir = 'public/assets/build/';
var resourceDir = 'resources/';

//compile these files and move them to the public dir
mix.less(resourceDir + 'less/app/style.less', buildDir + 'css/style.css');

mix.scripts([
    resourceDir + 'js/app/SnapToRoute.js',
    resourceDir + 'js/app/Distance.js',
    resourceDir + 'js/app/ElevationProfile.js',
    resourceDir + 'js/app/RouteMap.js',
    resourceDir + 'js/app/App.js'
], buildDir + 'js/app.js');

mix.version([
    buildDir + 'css/style.css',
    buildDir + 'js/app.js'
]);

if( !mix.inProduction() ) {
    mix.sourceMaps()
}
