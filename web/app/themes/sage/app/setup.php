<?php

declare(strict_types=1);

namespace App;

use function Roots\bundle;

add_action('wp_enqueue_scripts', function () {
    wp_dequeue_style('global-styles');
    wp_dequeue_style('wp-block-library');

    bundle('app')->enqueue();
}, 100);

add_action('enqueue_block_editor_assets', function () {
    bundle('editor')->enqueue();
}, 100);

add_action('after_setup_theme', function () {
    remove_theme_support('block-templates');

    register_nav_menus([
        'primary_navigation' => __('Primary Navigation', 'sage'),
    ]);

    remove_theme_support('core-block-patterns');

    add_theme_support('title-tag');

    add_theme_support('post-thumbnails');

    add_theme_support('responsive-embeds');
}, 20);

add_action('wp_head', function (): void {
    echo '<link rel="preconnect" href="https://fonts.googleapis.com">';
    echo '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>';
    echo '<link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap" rel="stylesheet">';
});
