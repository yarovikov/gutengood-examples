<?php

declare(strict_types=1);

namespace App\Editor\Blocks;

use Yarovikov\Gutengood\Editor\AbstractBlock;
use Yarovikov\Gutengood\Editor\GutengoodBuilder;

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
        $builder = new GutengoodBuilder();

        $builder
            ->addRepeater('items')
            ->addText('title')
            ->addRichText('text')
            ->endRepeater();

        return $builder->build();
    }

    public function options(): array
    {
        $builder = new GutengoodBuilder();

        $builder
            ->addRange('width', [
                'label' => __('Block width', 'sage'),
                'value' => 900,
            ]);

        return $builder->build();
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
