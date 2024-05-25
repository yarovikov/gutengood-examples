<?php

declare(strict_types=1);

namespace App\Editor\Blocks;

use Yarovikov\Gutengood\Editor\AbstractBlock;

class Example extends AbstractBlock
{
    /**
     * Block mame. Must match the name in jsx
     *
     * @var string
     */
    public string $name = 'gutengood/example';

    /**
     * Block view
     *
     * @var string
     */
    public string $view = 'blocks.example';

    /**
     * Js/css block dependencies. Use bud config
     *
     * @var array
     */
    public array $dependencies = [];

    /**
     * Block attributes. Must match with in jsx. Used to set up default values.
     *
     * @var array
     */
    public array $attributes = [
        'title' => [
            'type' => 'string',
            'default' => '',
        ],
        'show_title' => [
            'type' => 'boolean',
            'default' => true,
        ],
        'image' => [
            'type' => 'integer',
            'default' => 0,
        ],
        // image button preview in block options
        'image_preview_url' => [
            'type' => 'string',
            'default' => '',
        ],
        'bg_color' => [
            'type' => 'string',
            'default' => 'transparent',
        ],
    ];

    public function getBlockData(array $attributes, string $content): array
    {
        $data = [
            'title' => (string) $attributes['title'],
            'show_title' => (bool) $attributes['show_title'],
            'image' => (int) $attributes['image'],
            'bg_color' => (string) $attributes['bg_color'],
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
                'value' => '',
            ],
            [
                'name' => 'show_title',
                'type' => 'ToggleControl',
                'label' => __('Show Title?', 'sage'),
                'value' => true,
            ],
            [
                'name' => 'image',
                'type' => 'MediaUpload',
                'label' => __('Image', 'sage'),
                'value' => '',
            ],
            [
                'name' => 'bg_color',
                'type' => 'ColorPalette',
                'label' => __('Цвет фона', 'sage'),
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
            ],
        ];
    }

    public function data(): array
    {
        return [];
    }
}
