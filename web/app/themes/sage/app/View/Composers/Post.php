<?php

declare(strict_types=1);

namespace App\View\Composers;

use Roots\Acorn\View\Composer;

class Post extends Composer
{
    protected static $views = [
        'partials.content-single',
    ];

    public function with()
    {
        return [];
    }
}
