<?php

namespace App\Console\Commands;

use App\CarPark;
use App\Utilities\GeoCodingService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class ImportCarParks extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'boop:import-data {path}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Imports car park data from a JSON source';

    protected $geoCodingService;

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct(GeoCodingService $codingService)
    {
        parent::__construct();

        $this->geoCodingService = $codingService;
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $filePath = $this->argument('path');

        $this->info('Loading car parks from ' . $filePath);

        $content = file_get_contents($filePath);

        $data = json_decode($content)->data;

        $carParks = json_decode(json_encode($data), true);

        $this->info('Found ' . sizeof($carParks) . ' in the specified file');

        foreach ($carParks as $carPark)  {

            $storedCarPark = new CarPark();

            $storedCarPark->fill($carPark);

            // Need to handle the single oddly named field.
            $storedCarPark->non_charging_days = $carPark["non-charging_days"];

            $latLng = $this->geoCodingService->getLatAndLngForCarPark($storedCarPark);

            $storedCarPark->geo_lat = $latLng->lat;
            $storedCarPark->geo_lng = $latLng->lng;

            var_dump($storedCarPark);

            $storedCarPark->save();

            $this->info("Stored " . $storedCarPark->name);
        }

    }
}
