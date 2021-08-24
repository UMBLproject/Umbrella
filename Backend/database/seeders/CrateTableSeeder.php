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

        $Common = Rarity::where('name', 'Common')->firstOrFail();
        $Uncommon = Rarity::where('name', 'Uncommon')->firstOrFail();
        $Unique = Rarity::where('name', 'Unique')->firstOrFail();

        $crates = [
            [
                'faction_id' => $Surviors->id,
                'level' => 1,
                'rarities' => json_encode([$Common->id, $Uncommon->id]),            
                'name' => 'Survior Biocrate',
                'price' => 0.062,
            ],
            [
                'faction_id' => $Surviors->id,
                'level' => 2,
                'rarities' => json_encode([$Unique->id]),                
                'name' => 'Tactical Biocrate',
                'price' => 0.093,
            ],
            [
                'faction_id' => $Scientists->id,
                'level' => 1,
                'rarities' => json_encode([$Common->id, $Uncommon->id]),             
                'name' => 'Alpha Type',
                'price' => 0.062,
            ],
            [
                'faction_id' => $Scientists->id,
                'level' => 2,
                'rarities' => json_encode([$Unique->id]),             
                'name' => 'Omega Type',
                'price' => 0.093,
            ],
        ];

        foreach($crates as $crate) {
            Crate::create($crate);
        }
        
    }
}
