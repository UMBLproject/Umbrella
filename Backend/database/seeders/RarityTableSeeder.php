<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Rarity;

class RarityTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $rarities = [
            ['class' => 'S+','name' => 'Mythical'],
            ['class' => 'S','name' => 'Legendary'],
            ['class' => 'A','name' => 'Epic'],
            ['class' => 'B','name' => 'Rare'],
            ['class' => 'C','name' => 'Unique'],
            ['class' => 'D','name' => 'Uncommon'],
            ['class' => 'E','name' => 'Common'],
        ];

        foreach($rarities as $rarity) {
            Rarity::create($rarity);
        }
        
    }
}
