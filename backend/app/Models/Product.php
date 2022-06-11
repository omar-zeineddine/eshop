<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    // Eloquent relations

    // many to many  relation
    // https://laravel.com/docs/8.x/eloquent-relationships#many-to-many
    //
    public function usersWithFavorites(){
        return $this->belongsToMany(Favorites::class);
    }

    // one to many (inverse)
    // https://laravel.com/docs/8.x/eloquent-relationships#one-to-many-inverse

    public function category(){
        return $this->belongsTo(Category::class);
    }
}
