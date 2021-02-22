<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;

class CreateElevationProfileData {

    protected $points = [];
    protected $elevationProfileData = [];

    public function __construct($data) {
        foreach($data as $point) {
            $this->points[] = $point;
        }

        $numPoints = count($this->points);
        $distance = 0;
        for($i = 0; $i < $numPoints; $i++) {
            $currentPoint = $this->points[$i];
            if($i > 0) {
                $distance = $currentPoint['distance'] - $this->points[$i - 1]['distance'];
            }

            $this->elevationProfileData[] = [
                'c' => [
                    round($currentPoint['coordinate']['lat'], 6),
                    round($currentPoint['coordinate']['lng'], 6)
                ],
                'd' => round($distance, 2),
                'e' => round($currentPoint['elevation'], 1)
            ];
        }
    }

    public function saveTo($directory, $fileName) {

        $fileName = $this->makeFileName($fileName);
        $destination = $directory . '/' . $fileName;
        Storage::disk('local')->put($destination, $this->getProfileJson() );

    }

    public function makeFileName($filename) {
        return $filename . '-route.json';
    }

    protected function getProfileJson() {
        return json_encode($this->elevationProfileData);
    }

}
