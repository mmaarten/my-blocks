<?php
/**
 * Config.
 *
 * @package My/Blocks
 */

$config = [];

/**
 * Block types.
 *
 * @var array
 */
$config['blocks'] = [
    'button',
];

/**
 * Editor styles file.
 *
 * @var string
 */
$config['editor_styles_file'] = dirname(__FILE__) . '/build/editor-styles.css';

/**
 * Editor colors.
 *
 * For available slugs see: `$editor-colors` in `assets/css/_variables.scss`.
 *
 * @var array
 */
$config['editor_colors'] = [
    [
        'name'  => __('Primary', 'my-blocks'),
        'slug'  => 'primary',
        'color' => '#007bff',
    ],
    [
        'name'  => __('Secondary', 'my-blocks'),
        'slug'  => 'secondary',
        'color' => '#6c757d',
    ],
    [
        'name'  => __('Light', 'my-blocks'),
        'slug'  => 'light',
        'color' => '#f8f9fa',
    ],
    [
        'name'  => __('Dark', 'my-blocks'),
        'slug'  => 'dark',
        'color' => '#343a40',
    ],
];

/**
 * Editor font sizes.
 *
 * For available slugs see: `$editor-font-sizes` in `assets/css/_variables.scss`.
 *
 * Use `normal` slug to set default font size.
 *
 * @var array
 */

$font_size_base = 16;

$config['editor_font_sizes'] = [
    [
        'name'      => __('Small', 'my-blocks'),
        'shortName' => __('SM', 'my-blocks'),
        'slug'      => 'small',
        'size'      => $font_size_base * 0.875,
    ],
    [
        'name'      => __('Normal', 'my-blocks'),
        'shortName' => __('N', 'my-blocks'),
        'slug'      => 'normal',
        'size'      => $font_size_base,
    ],
    [
        'name'      => __('Large', 'my-blocks'),
        'shortName' => __('LG', 'my-blocks'),
        'slug'      => 'large',
        'size'      => $font_size_base * 1.25,
    ],
];
