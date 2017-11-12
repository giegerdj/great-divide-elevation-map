<?php

namespace EP\Http\Controllers;

use Illuminate\Http\Request;

class PagesController extends Controller
{
    public function map() {

        // Hardcoded for now - it's not worth setting up a database just for this

        $routeGroups = [
            'Great Divide' => [
                 [
                    'id' => 'GDMBR-2011v1',
                    'gpxFile' => 'assets/route-gpx/GDMBR2011_v1.gpx ',
                    'routeDataFile' => 'assets/route-json/GDMBR2011_v1-route.json',
                ],
            ], 'Tour Divide' => [
                [
                    'id' => 'TD-2017v1',
                    'gpxFile' => 'assets/route-gpx/TourDivide2017_v1.gpx',
                    'routeDataFile' => 'assets/route-json/TourDivide2017_v1-route.json',
                ],[
                    'id' => 'TD-2016v2',
                    'gpxFile' => 'assets/route-gpx/TourDivide2016_v2.gpx',
                    'routeDataFile' => 'assets/route-json/TourDivide2016_v2-route.json',
                ],[
                    'id' => 'TD-2016v1',
                    'gpxFile' => 'assets/route-gpx/TourDivide2016_v1.gpx',
                    'routeDataFile' => 'assets/route-json/TourDivide2016_v1-route.json',
                ],[
                    'id' => 'TD-2015v2',
                    'gpxFile' => 'assets/route-gpx/TourDivide2015_v2.gpx',
                    'routeDataFile' => 'assets/route-json/TourDivide2015_v2-route.json',
                ],[
                    'id' => 'TD-2015v1',
                    'gpxFile' => 'assets/route-gpx/TourDivide2015_v1.gpx',
                    'routeDataFile' => 'assets/route-json/TourDivide2015_v1-route.json',
                ],[
                    'id' => 'TD-2014v1',
                    'gpxFile' => 'assets/route-gpx/TourDivide2014_v1.gpx',
                    'routeDataFile' => 'assets/route-json/TourDivide2014_v1-route.json',
                ],
            ]
        ];

        return view('pages.map')
            ->with('routeGroups', $routeGroups)
            ->with('initialSelectedRouteId', 'TD-2017v1');
    }

    public function about() {
        return view('pages.about');
    }
}
