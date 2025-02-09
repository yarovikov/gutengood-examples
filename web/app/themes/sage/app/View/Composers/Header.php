<?php

declare(strict_types=1);

namespace App\View\Composers;

use App\Traits\Nav;
use Roots\Acorn\View\Composer;

class Header extends Composer
{
    use Nav;

    protected static $views = [
        'sections.header',
    ];

    public function with()
    {
        return [
            'home_url' => home_url(),
            'nav_items' => $this->getNavItems('Menu'),
        ];
    }
}
