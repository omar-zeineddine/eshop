<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;

use App\Models\Product;
use App\Models\Category;
use App\Models\Favorite;
use App\Models\User;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreProductRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreProductRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateProductRequest  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        //
    }

    //Get a single or all products
    public function getAllProducts($id = null){
        if ($id) {
            $products = Product::find($id);
            $products->category = Product::find($id)->category->name;
        } else {
            $products = Product::all();
            foreach ($products as $product) {
                $category = Category::find($product->category_id);
                $product->category = $category->name;
            }
        }

        return response()->json([
                "status" => "Success",
                "message" => "returned all products",
                "data" => $products,
            ], 200);
    }

    // add a new item to favorite
    public function favorite(Request $request){
        $favorited = Favorite::where('user_id',$request->user_id)->where('product_id',$request->product_id)->first();

        if($favorited){
            return response()->json([
                "status" => "Failure",
                "message" => "item already in favorites",
            ], 200); 
        }

        $favorited = new Favorite;
        $favorited->user_id = $request->user_id;
        $favorited->product_id = $request->product_id;
        $favorited->save();

        return response()->json([
            "status" => "Success",
            "message" => "item added to favorites",
        ], 200);
    }

    // unfavorite an item
    public function unFavorite(Request $request){
        Favorite::where('user_id',$request->user_id)->where('product_id',$request->product_id)->delete();

        return response()->json([
            "status" => "Success",
            "message" => "item removed from favorites",
        ], 200);
    }

    //get all favorites of a single user
    public function getFavorites($id){
        $user = User::find($id);
        $favorites = $user->favoritedProducts;

        return response()->json([
            "status" => "Success",
            "message" => "returned favorite products",
            "data" => $favorites
        ], 200);
    }

}
