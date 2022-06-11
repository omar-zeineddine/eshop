<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Auth;

class UserMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next){
        
        // check if user is authenticated and has no admin privileges => type 0
        
        if (Auth::user() && Auth::user()-> type == 0) {
            return $next($request);
        }

        // route to not-found in case of failure
        return redirect(route("not-found"));

    }
}