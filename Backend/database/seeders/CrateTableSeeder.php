<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Crate;
use App\Models\Faction;
use App\Models\Rarity;

class CrateTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $Surviors = Faction::where('name', 'Survivors')->firstOrFail();
        $Scientists = Faction::where('name', 'Scientists')->firstOrFail();

        $crates = [
            [
                'faction_id' => $Surviors->id,
                'level' => 1,
                'name' => 'Survior Biocrate',
                'price' => 0.062,
            ],
            [
                'faction_id' => $Surviors->id,
                'level' => 2,
                'name' => 'Tactical Biocrate',
                'price' => 0.093,
            ],
            [
                'faction_id' => $Scientists->id,
                'level' => 1,
                'name' => 'Alpha Type',
                'price' => 0.062,
            ],
            [
                'faction_id' => $Scientists->id,
                'level' => 2,
                'name' => 'Omega Type',
                'price' => 0.093,
            ],
        ];

        foreach($crates as $crate) {
            Crate::create($crate);
        }
        
    }
}
