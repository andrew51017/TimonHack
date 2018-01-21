<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCarParksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('car_parks', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->longText("name");
            $table->longText("postcode");
            $table->double("geo_lat")->nullable();
            $table->double("geo_lng")->nullable();
            $table->boolean("charged")->nullable();
            $table->longText("tarrif")->nullable();
            $table->longText("charged_hours")->nullable();
            $table->longText("non_charging_days")->nullable();
            $table->longText("season_ticket_info")->nullable();
            $table->integer("total_spaces")->unsigned()->nullable();
            $table->integer("family_spaces")->unsigned()->nullable();
            $table->integer("motorcycle_spaces")->unsigned()->nullable();
            $table->integer("electric_spaces")->unsigned()->nullable();
            $table->integer("disabled_spaces")->unsigned()->nullable();

            $table->boolean("has_beacon")->nullable();
            $table->integer("beacon_major")->unsigned()->nullable();
            $table->integer("beacon_minor")->unsigned()->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('car_parks');
    }
}
