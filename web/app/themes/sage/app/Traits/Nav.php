<?php

declare(strict_types=1);

namespace App\Traits;

use WP_Post;

trait Nav
{
    public function getNavItems(string $menu): array
    {
        $menu_items = array_filter((array) wp_get_nav_menu_items($menu));
        if (empty($menu_items)) {
            return [];
        }

        $current_url = get_permalink();

        return array_map(function (WP_Post $item) use ($menu, $current_url): object {
            return (object) [
                'title' => $item->title,
                'url' => $item->url,
                'current' => $item->url === $current_url,
            ];
        }, $menu_items);
    }
}
