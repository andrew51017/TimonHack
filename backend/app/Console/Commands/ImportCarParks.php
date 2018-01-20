<?php

namespace App\Console\Commands;

use App\CarPark;
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

            var_dump($storedCarPark);

            $storedCarPark->save();

            $this->info("Stored " . $storedCarPark->name);
        }

    }
}
