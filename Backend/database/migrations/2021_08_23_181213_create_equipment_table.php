<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEquipmentTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('equipment', function (Blueprint $table) {
            $table->id();

            $table->boolean('assigned')->default(false);
            $table->boolean('equipped')->default(false);
            
            $table->unsignedBigInteger('tokenId')->unique();

            $table->unsignedBigInteger('category_id');
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');

            $table->unsignedBigInteger('rarity_id')->nullable();
            $table->foreign('rarity_id')->references('id')->on('rarities')->onDelete('set null');
            
            $table->string('name');
            $table->text('description');
            $table->string('image');
            $table->json('attributes')->nullable();

            // $table->unsignedSmallInteger('health')->default(100);
            
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
        Schema::dropIfExists('objects');
    }
}
