process.env.DISABLE_NOTIFIER = true;
var elixir = require('laravel-elixir');

elixir(function(mix) {

    //compile these files and move them to the public dir
    mix.less('app/style.less', 'public/assets/css/style.css');

    // //compile these resources and move them to the public dir
    mix.scripts([
            'app/SnapToRoute.js',
            'app/Distance.js',
            'app/ElevationProfile.js',
            'app/RouteMap.js',
            'app/App.js'
        ], 'public/assets/js/app.js');

    // //frequently changing files - build versioned...versions
    mix.version([
        'public/assets/css/style.css',
        'public/assets/js/app.js',
    ]);
});