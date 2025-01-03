<?php

declare(strict_types=1);

namespace App\Traits;

trait PostData
{
    public static function getPostData(int $post_id): array
    {
        return [
            'title' => get_the_title($post_id),
            'date' => (string) get_the_date('d.m.Y', $post_id),
            'image' => (int) get_post_thumbnail_id($post_id),
            'text' => get_the_excerpt($post_id),
            'url' => (string) get_permalink($post_id),
        ];
    }
}
