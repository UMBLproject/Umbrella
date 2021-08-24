<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Database\Seeders\UserTableSeeder;
use Database\Seeders\FactionTableSeeder;
use Database\Seeders\RarityTableSeeder;
use Database\Seeders\CategoryTableSeeder;
use Database\Seeders\CrateTableSeeder;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            UserTableSeeder::class,
            FactionTableSeeder::class,
            RarityTableSeeder::class,
            CategoryTableSeeder::class,
            CrateTableSeeder::class,
        ]);


        \App\Models\User::factory(10)->create();
    }
}
