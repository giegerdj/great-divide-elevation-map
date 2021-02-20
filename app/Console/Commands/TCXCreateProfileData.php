<?php

namespace App\Console\Commands;

use App\Services\ParseTCX;
use Illuminate\Console\Command;
use App\Services\CreateElevationProfileData;

class TCXCreateProfileData extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'tcx:create-profile-data';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create  description';

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
        // load xml file (tcx)
        $file = storage_path('app/co-trail.tcx');
        // convert to json format

        $routeJson = (new ParseTCX($file))->getData();

        (new CreateElevationProfileData($routeJson))->saveTo('public/routes');

    }
}
