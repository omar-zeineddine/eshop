<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    // define one to many eloquent relation:
    // https://laravel.com/docs/8.x/eloquent-relationships#one-to-many
    //one category has many products
    
    function products(){
        return $this->hasMany("Product");
    }

}
