<?php

declare(strict_types=1);

namespace App\Editor\Blocks;

use Yarovikov\Gutengood\Editor\AbstractBlock;

class Example extends AbstractBlock
{
    public string $name = 'gutengood/example';
    public string $view = 'blocks.example';

    public array $dependencies = ['example'];

    public array $attributes = [
        'title' => [
            'type' => 'string',
            'default' => '',
        ],
        'text' => [
            'type' => 'string',
            'default' => '',
        ],
        'show_title' => [
            'type' => 'boolean',
            'default' => true,
        ],
    ];

    public function getBlockData(array $attributes, string $content): array
    {
        $data = [
            'title' => (string) $attributes['title'],
            'text' => (string) $attributes['text'],
            'show_title' => (bool) $attributes['show_title'],
        ];

        return [...parent::getBlockData($attributes, $content), ...$data];
    }

    public function options(): array
    {
        return [
            [
                'name' => 'show_title',
                'type' => 'ToggleControl',
                'label' => __('Show Title?', 'sage'),
                'value' => true,
            ],
        ];
    }
}
