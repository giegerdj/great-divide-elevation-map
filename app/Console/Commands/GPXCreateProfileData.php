<?php

namespace App\Console\Commands;

use App\Services\ParseGPX;
use Illuminate\Console\Command;
use App\Services\CreateElevationProfileData;

class GPXCreateProfileData extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    //usage: php artisan gpx:create-profile-data public/assets/route-gpx/TourDivide2017_v1.gpx
    protected $signature = 'gpx:create-profile-data {file}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate a route and elevation profile data from a GPX track';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        // load xml file (gpx)
        $gpxFilePathArg = $this->argument('file');

        $filePathInfo = pathinfo($gpxFilePathArg);

        // convert to json format
        $routeJson = (new ParseGPX($gpxFilePathArg))->getData();

        //save it to local storage
        (new CreateElevationProfileData($routeJson))->saveTo('route-json', $filePathInfo['filename']);

    }
}
