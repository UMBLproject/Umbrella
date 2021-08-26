<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Equipment extends Model
{
    use HasFactory;

    protected $fillable = [
        'tokenId',
        'category_id' ,
        'rarity_id',
        'name', 
        'description', 
        'image', 
        'attributes'
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
        'pivot',
        'category_id',
        'rarity_id',
    ];
    
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function rarity()
    {
        return $this->belongsTo(Rarity::class);
    }

    protected $with = ['category', 'rarity'];
}
