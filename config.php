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
 * Disable custom colors.
 *
 * @var bool
 */
$config['disable_custom_colors'] = false;

/**
 * Disable custom font sizes.
 *
 * @var bool
 */
$config['disable_custom_font_sizes'] = false;

/**
 * Editor styles file.
 *
 * @var string
 */
$config['editor_styles_file'] = dirname(__FILE__) . '/build/editor-styles.css';

/**
 * Editor colors.
 *
 * Available slugs: See `$editor-colors` scss variable.
 *
 * @var array
 */
$config['editor_colors'] = [
    'primary' => [
        'name'  => __('Primary', 'my-blocks'),
        'slug'  => 'primary',
        'color' => '#007bff',
    ],
    'secondary' => [
        'name'  => __('Secondary', 'my-blocks'),
        'slug'  => 'secondary',
        'color' => '#6c757d',
    ],
    'light' => [
        'name'  => __('Light', 'my-blocks'),
        'slug'  => 'light',
        'color' => '#f8f9fa',
    ],
    'dark' => [
        'name'  => __('Dark', 'my-blocks'),
        'slug'  => 'dark',
        'color' => '#343a40',
    ],
];

/**
 * Editor font sizes.
 *
 * Available slugs: See `$editor-font-sizes` scss variable.
 *
 * `normal` slug is required to set default font size.
 *
 * @var array
 */

$font_size_base = 16;

$config['editor_font_sizes'] = [
    'small' => [
        'name'      => __('Small', 'my-blocks'),
        'shortName' => __('SM', 'my-blocks'),
        'slug'      => 'small',
        'size'      => $font_size_base * 0.875,
    ],
    'normal' => [
        'name'      => __('Normal', 'my-blocks'),
        'shortName' => __('N', 'my-blocks'),
        'slug'      => 'normal',
        'size'      => $font_size_base,
    ],
    'large' => [
        'name'      => __('Large', 'my-blocks'),
        'shortName' => __('LG', 'my-blocks'),
        'slug'      => 'large',
        'size'      => $font_size_base * 1.25,
    ],
];
