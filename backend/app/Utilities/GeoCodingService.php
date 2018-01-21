<?php

namespace App\Utilities;

use App\CarPark;

class GeoCodingService
{
    public function getLatAndLngForCarPark(CarPark $carPark)
    {
        $addressString = $carPark->name . ' car park';

        $apiUrl = 'https://maps.googleapis.com/maps/api/geocode/json?key=' . env('GOOGLE_GEOCODE_API_KEY', '') . '&address=' . urlencode($addressString);

        $resp = file_get_contents($apiUrl);

        $decodedJson = json_decode($resp);

        $latLng = $decodedJson->results[0]->geometry->location;

        return $latLng;
    }
}