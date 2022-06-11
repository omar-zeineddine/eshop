<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ProductController;

// add api versioning

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
        Route::group(["middleware" => "user.access"], function () {
            Route::controller(ProductController::class)->group(function () {
                Route::post("/favorite", "favorite");
                Route::post("/unfavorite", "unFavorite");
            });
        });
    });


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

    Route::middleware("auth:sanctum")->get("/user", function (Request $request) {
        return $request->user();
    });

});
