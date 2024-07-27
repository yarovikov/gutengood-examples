<?php

declare(strict_types=1);

namespace App\Editor\Blocks;

use Yarovikov\Gutengood\Editor\AbstractBlock;

class Example extends AbstractBlock
{
    public string $name = 'gutengood/example';
    public string $view = 'blocks.example';

    public function getBlockData(array $attributes, string $content): array
    {
        $data = [
            'title' => (string) ($attributes['title'] ?? ''),
            'show_title' => (bool) ($attributes['show_title'] ?? ''),
            'width' => (int) ($attributes['width'] ?? 900),
            'image' => (int) ($attributes['image'] ?? 0),
            'bg_color' => (string) ($attributes['bg_color'] ?? ''),
        ];

        return [...parent::getBlockData($attributes, $content), ...$data];
    }

    /**
     * Available components in resources/scripts/editor/components/block-options.js
     *
     * @return array[]
     */
    public function options(): array
    {
        return [
            [
                'name' => 'title',
                'type' => 'TextControl',
                'label' => __('Title', 'sage'),
                'default_value' => '',
            ],
            [
                'name' => 'show_title',
                'type' => 'ToggleControl',
                'label' => __('Show Title?', 'sage'),
                'default_value' => true,
            ],
            [
                'name' => 'width',
                'type' => 'RangeControl',
                'label' => __('Width', 'sage'),
                'default_value' => 800,
                'min' => 200,
                'max' => 2000,
                'step' => 20,
            ],
            [
                'name' => 'image',
                'type' => 'MediaUpload',
                'label' => __('Image', 'sage'),
                'default_value' => '',
            ],
            [
                'name' => 'bg_color',
                'type' => 'ColorPalette',
                'label' => __('BG Color', 'sage'),
                'colors' => [
                    [
                        'name' => 'transparent',
                        'color' => 'transparent',
                    ],
                    [
                        'name' => 'black',
                        'color' => '#000',
                    ],
                    [
                        'name' => 'white',
                        'color' => '#fff',
                    ],
                ],
                'default_value' => '#fff',
            ],
        ];
    }

    public function getAssets(): array
    {
        return [
            [
                'handle' => 'example',
                'condition' => fn(array $block): bool => !empty($block['attrs']['show_title']), // enqueue js if show_title is checked
            ],
        ];
    }
}
