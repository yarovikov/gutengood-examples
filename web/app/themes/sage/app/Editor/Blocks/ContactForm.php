<?php

declare(strict_types=1);

namespace App\Editor\Blocks;

use Yarovikov\Gutengood\Editor\AbstractBlock;
use Yarovikov\Gutengood\Editor\GutengoodBuilder;

class ContactForm extends AbstractBlock
{
    public string $title = 'Contact Form';
    public string $name = 'gutengood/contact-form';
    public string $view = 'blocks.contact-form';

    public function getBlockData(array $attributes, string $content): array
    {
        $data = [
            'text' => (string)($attributes['text'] ?? ''),
        ];

        return [...parent::getBlockData($attributes, $content), ...$data];
    }

    public function options(): array
    {
        $builder = new GutengoodBuilder();

        $builder
            ->addTextarea('text', [
                'label' => __('Block text', 'sage'),
            ]);

        return $builder->build();
    }

    public function getAssets(): array
    {
        return [
            [
                'handle' => 'contact-form', // be sure you have this in bud.config.js
            ],
        ];
    }
}
