<?php

declare(strict_types=1);

namespace App\Editor\Blocks;

use Yarovikov\Gutengood\Editor\AbstractBlock;
use Yarovikov\Gutengood\Editor\GutengoodBuilder;

class PostMetaExample extends AbstractBlock
{
    public string $title = 'Post Meta Example';
    public string $name = 'gutengood/post-meta-example';
    public bool $edit_mode = true;

    public function fields(): array
    {
        $builder = new GutengoodBuilder();

        $builder
            ->addColorPalette('bg_color', [
                'label' => __('BG Color', 'sage'),
                'meta' => true,
                'colors' => [
                    [
                        'name' => 'black',
                        'color' => '#000',
                        'slug' => 'black',
                    ],
                    [
                        'name' => 'white',
                        'color' => '#fff',
                        'slug' => 'white',
                    ],
                    [
                        'name' => 'red',
                        'color' => '#f00',
                        'slug' => 'red',
                    ],
                ],
            ])
            ->addFile('file', [
                'label' => __('File', 'sage'),
                'meta' => true,
            ])
            ->addToggle('is_hide_sidebar', [
                'label' => __('Hide Sidebar?', 'sage'),
                'meta' => true,
            ]);

        return $builder->build();
    }
}
