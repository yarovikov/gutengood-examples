<?php

declare(strict_types=1);

namespace App\Editor\Blocks;

use Yarovikov\Gutengood\Editor\AbstractBlock;

class Container extends AbstractBlock
{
    public string $title = 'Container';
    public string $name = 'gutengood/container';
    public string $view = 'blocks.container';
    public bool $editor_script = true;

    public function getBlockData(array $attributes, string $content): array
    {
        $data = [
            'content' => $content,
            'width' => (int) ($attributes['width'] ?? 900),
        ];

        return [...parent::getBlockData($attributes, $content), ...$data];
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
}
