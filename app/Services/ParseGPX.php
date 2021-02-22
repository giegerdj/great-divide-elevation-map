<?php

namespace App\Services;

use Location\Coordinate;
use Location\Distance\Vincenty;

class ParseGPX {

    protected $xml;

    protected $points = [];

    public function __construct($file) {
        if (!is_file($file)) {
            throw new \Exception(sprintf('Unable to read file "%s"', $file));
        }

        $this->xml = simplexml_load_file($file);
        if( !isset($this->xml->trk->trkseg) ) {
            throw new \Exception(sprintf('Unable to find an Activity', $file));
        }

        $elapsedDistanceMeters = 0;
        $calculator = new Vincenty;
        $numPoints = count($this->xml->trk->trkseg->trkpt);
        $previousPoint = $this->xml->trk->trkseg->trkpt[0];

        for($i = 0; $i < $numPoints; $i++) {

            $currentPoint = $this->xml->trk->trkseg->trkpt[$i];

            $previousCoordinate = new Coordinate((double)$previousPoint['lat'], (double)$previousPoint['lon']);
            $currentCoordinate = new Coordinate((double)$currentPoint['lat'], (double)$currentPoint['lon']);

            $pointDistance = $calculator->getDistance($previousCoordinate, $currentCoordinate);

            $elapsedDistanceMeters += $pointDistance;

            $this->points[] = [
                'coordinate' => [
                    'lat' => (double)$currentPoint['lat'],
                    'lng' => (double)$currentPoint['lon'],
                ],
                'distance' => (double)$elapsedDistanceMeters,
                'elevation' => (double)$currentPoint->ele
            ];
            $previousPoint = $currentPoint;

        }

    }

    public function getData() {
        return $this->points;
    }

}
