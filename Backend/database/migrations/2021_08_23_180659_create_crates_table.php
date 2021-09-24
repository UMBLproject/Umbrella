<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCratesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('crates', function (Blueprint $table) {
            $table->id();

            $table->string('name')->unique();

            $table->unsignedBigInteger('faction_id')->nullable();
            $table->foreign('faction_id')->references('id')->on('factions')->onDelete('set null');

            $table->unsignedTinyInteger('level')->default(1);            
            $table->unsignedTinyInteger('quantity')->default(4);
            $table->double('price', 8, 3)->default(0.000);

            $table->string('collection_path')->nullable();
            $table->unsignedSmallInteger('collection_count')->default(0);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('crates');
    }
}
