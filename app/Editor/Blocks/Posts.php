<?php

declare(strict_types=1);

namespace App\Editor\Blocks;

use App\Traits\PostData;
use WP_Error;
use WP_Query;
use Yarovikov\Gutengood\Editor\AbstractBlock;
use Yarovikov\Gutengood\Editor\GutengoodBuilder;

class Posts extends AbstractBlock
{
    use PostData;

    public string $title = 'Posts';
    public string $name = 'gutengood/posts';
    public string $view = 'blocks.posts';

    public function getBlockData(array $attributes, string $content): array
    {
        $data = [
            'title' => (string)($attributes['title'] ?? ''),
            'text' => (string)($attributes['text'] ?? ''),
            'is_hide_images' => (bool)($attributes['is_hide_images'] ?? ''),
            'posts' => $this->getPosts($attributes),
        ];

        return [...parent::getBlockData($attributes, $content), ...$data];
    }

    public function options(): array
    {
        $builder = new GutengoodBuilder();

        $builder
            ->addText('title', [
                'label' => __('Block title', 'sage'),
            ])
            ->addTextarea('text', [
                'label' => __('Block text', 'sage'),
            ])
            ->addSelect('category', [
                'label' => __('Choose category', 'sage'),
                'choices' => [
                    [
                        'label' => 'Select...',
                        'value' => null,
                    ],
                    ...$this->getCategories(),
                ],
            ])
            ->addToggle('is_hide_images', [
                'label' => __('Hide images?', 'sage'),
            ]);

        return $builder->build();
    }

    public function getCategories(): array
    {
        $terms = get_terms([
            'taxonomy' => 'category',
            'hide_empty' => false,
        ]);

        if (empty($terms) || $terms instanceof WP_Error) {
            return [];
        }

        return array_map(function (object $term): array {
            return [
                'value' => $term->term_id,
                'label' => $term->name,
            ];
        }, $terms);
    }

    public function getPosts(array $attributes): array
    {
        $category = (int)($attributes['category'] ?? '');

        $args = [
            'post_type' => 'post',
            'post_status' => 'publish',
            'posts_per_page' => (int)($attributes['post_count'] ?? 8),
            'fields' => 'ids',
        ];

        if (0 !== $category) {
            $args['cat'] = $category;
        }

        $query = new WP_Query($args);
        $posts = $query->posts;

        if (empty($posts)) {
            return [];
        }

        return array_map(fn(int $post_id): array => $this->getPostData($post_id), $posts);
    }
}
