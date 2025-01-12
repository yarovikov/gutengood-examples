<?php

declare(strict_types=1);

namespace App\Editor\Panels;

use Yarovikov\Gutengood\Editor\AbstractPanel;
use Yarovikov\Gutengood\Editor\GutengoodBuilder;

class PageOptions extends AbstractPanel
{
    public string $title = 'Page Options';
    public string $name = 'post-options-panel';
    public string $icon = '<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M194.7 503.2c8.6 5.9 18.9 8.8 29.3 8.8s20.7-2.9 29.3-8.8C299.2 471.7 448 359.3 448 224C448 100.3 347.7 0 224 0S0 100.3 0 224C0 359.3 148.8 471.7 194.7 503.2zM224 48c97.2 0 176 78.8 176 176c0 50.4-28.2 101.3-68.2 146.9c-39.2 44.7-84.2 78.1-105.6 92.7l0 0 0 0-.1 0c0 0-.1 0-.1 0s-.1 0-.1 0l-.1 0c-.3 .1-.9 .2-1.8 .2s-1.4-.1-1.8-.2c-.1 0-.2-.1-.2-.1l-.1 0-.1 0 0 0 0 0c-21.4-14.6-66.4-48-105.6-92.7C76.2 325.3 48 274.4 48 224c0-97.2 78.8-176 176-176zm16 258.3c0 7.6 6.1 13.7 13.7 13.7h32c45.4 0 82.3-36.8 82.3-82.3c0-7.6-6.1-13.7-13.7-13.7h-32c-45.4 0-82.3 36.8-82.3 82.3zM125.7 224h-32c-7.6 0-13.7 6.1-13.7 13.7c0 45.4 36.8 82.3 82.3 82.3h32c7.6 0 13.7-6.1 13.7-13.7c0-45.4-36.8-82.3-82.3-82.3z"/></svg>';

    public array $post_types = ['page'];

    public function options(): array
    {
        $builder = new GutengoodBuilder();

        $builder
            ->addTextarea('page_description', [
                'label' => __('Description', 'sage'),
            ])
            ->addToggle('hide_featured_image', [
                'label' => 'Hide Featured Image?',
            ]);

        return $builder->build();
    }
}
