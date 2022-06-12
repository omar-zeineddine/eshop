<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\AdminController;
use App\Http\Controllers\ProductController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// add api versioning

// url form: http://127.0.0.1:8000/api/v1/auth/...
Route::group(["prefix" => "v1"], function () {
    Route::group(["middleware" => "api", "prefix" => "auth"], function ($router) {
        Route::post("register", [AuthController::class, "register"]);
        Route::post("login", [AuthController::class, "login"]);
        Route::post("refresh", [AuthController::class, "refresh"]); // refresh a token
        Route::get("profile", [AuthController::class, "profile"]);
    });

    // Product Routes:
    // url form: http://127.0.0.1:8000/api/v1/...
    Route::controller(ProductController::class)->group(function () {
        Route::get("/all_products/{id?}", "getAllProducts");
        Route::get("/get_favorites/{id}", "getFavorites");
    });

    // url form: http://127.0.0.1:8000/api/v1/user/...
    Route::group(["prefix" => "user"], function () {
        Route::group(["middleware" => "user"], function () {
            Route::controller(ProductController::class)->group(function () {
                Route::post("/favorite", "favorite");
                Route::post("/unfavorite", "unFavorite");
            });
        });
    });

    // Admin
    // url form: http://127.0.0.1:8000/api/v1/admin/...
    Route::group(['prefix' => 'admin'], function(){
        Route::group(['middleware' => 'admin'], function(){
            Route::controller(AdminController::class)->group(function (){
                Route::post('/add_category', 'addCategory');
                Route::post('/add_product', 'addProduct');
                Route::get('/all_categories', 'getCategories');
            });
        });    
    });

    // Route for unauthorized access
    Route::get('/not_found', [AdminController::class, 'notFound'])->name("not-found");

});
