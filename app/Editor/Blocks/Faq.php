<?php

declare(strict_types=1);

namespace App\Editor\Blocks;

use Yarovikov\Gutengood\Editor\AbstractBlock;

class Faq extends AbstractBlock
{
    public string $title = 'FAQ';
    public string $name = 'gutengood/faq';
    public string $view = 'blocks.faq';

    public function getBlockData(array $attributes, string $content): array
    {
        $data = [
            'items' => array_filter(array_map(fn(array $item): ?array => !empty($item['title']) ? $item : null, (array) ($attributes['items'] ?? []))),
            'width' => (int) ($attributes['width'] ?? 900),
        ];

        return [...parent::getBlockData($attributes, $content), ...$data];
    }

    public function fields(): array
    {
        return [
            [
                'name' => 'items',
                'type' => 'Repeater',
                'fields' => [
                    [
                        'name' => 'title',
                        'type' => 'Text',
                        'label' => 'Title',
                    ],
                    [
                        'name' => 'text',
                        'type' => 'RichText',
                        'placeholder' => 'Text...',
                    ],
                ],
            ],
        ];
    }

    public function options(): array
    {
        return [
            [
                'name' => 'width',
                'type' => 'Range',
                'label' => __('Block width', 'sage'),
                'value' => 900,
            ],
        ];
    }

    public function getAssets(): array
    {
        return [
            [
                'handle' => 'faq',
            ],
        ];
    }
}
