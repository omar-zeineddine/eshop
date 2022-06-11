<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Models\Category;
use App\Models\Product;

class AdminController extends Controller{
    
    public function addCategory(Request $request){
        $category = new Category;

        $category->name = $request->name;
        $category->save();

        return response()->json([
            "status" => "Success",
        ], 200);

    }

    public function addProduct(Request $request){
        $product = new Product;

        $product->name = $request->name;
        $product->price = $request->price;
        $product->stock = $request->stock;
        $product->category_id = $request->category_id;
        $product->save();

        return response()->json([
            "status" => "Success",
        ], 200);

    }

    public function getCategories(){
        $categories = Category::all();

        return response()->json([
            "status" => "Success",
            "data" => $categories
        ], 200);
    }

    public function notFound(){
        return response()->json([
            "status" => "Failure",
            "message" => "you seem to be lost"
        ], 404);
    }
    
}
