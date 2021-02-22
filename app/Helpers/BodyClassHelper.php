<?php

namespace App\Helpers;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Route;

class BodyClassHelper {

    public static function bodyClass() {
        $bodyClasses = [];
        $routeName = str_replace('.', '-', Route::currentRouteName());
        $bodyClasses[] = Str::slug($routeName);

        return implode(' ', $bodyClasses);
    }

}
