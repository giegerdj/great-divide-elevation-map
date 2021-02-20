<?php

namespace App\Services;

class ParseTCX {

    protected $xml;

    protected $points = [];

    public function __construct($file) {
        if (!is_file($file)) {
            throw new \Exception(sprintf('Unable to read file "%s"', $file));
        }

        $this->xml = simplexml_load_file($file);
        if( !isset($this->xml->Courses->Course->Track) ) {
            throw new \Exception(sprintf('Unable to find an Activity', $file));
        }

        foreach($this->xml->Courses->Course->Track->Trackpoint as $point) {
            $this->points[] = [
                'coordinate' => [
                    'lat' => (double)$point->Position->LatitudeDegrees,
                    'lng' => (double)$point->Position->LongitudeDegrees,
                ],
                'distance' => (double)$point->DistanceMeters,
                'elevation' => (double)$point->AltitudeMeters
            ];

        }

    }

    public function getData() {
        return $this->points;
    }

}
