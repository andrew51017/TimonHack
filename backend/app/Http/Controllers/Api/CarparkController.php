<?php

namespace App\Http\Controllers\Api;

use App\CarPark;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CarparkController extends Controller
{
    function getAll()
    {
        $carParks = CarPark::all();

        return $carParks;
    }

    function getSingle(CarPark $carPark)
    {
        return $carPark;
    }

}
