<?php
/**
 * Config
 *
 * @package My/Blocks
 */

$config = [];

/**
 * Block types to load.
 *
 * @var array
 */
$config['blocks'] = [
    'button',
];

/**
 * Theme colors.
 *
 * @var array
 */
$config['theme_colors'] = [
    'primary'   => [
        'name'  => __('Primary', 'elixir'),
        'slug'  => 'primary',
        'color' => '#007bff',
    ],
    'secondary'   => [
        'name'  => __('Secondary', 'elixir'),
        'slug'  => 'secondary',
        'color' => '#6c757d',
    ],
    'success'   => [
        'name'  => __('Success', 'elixir'),
        'slug'  => 'success',
        'color' => '#28a745',
    ],
    'info'   => [
        'name'  => __('Info', 'elixir'),
        'slug'  => 'info',
        'color' => '#17a2b8',
    ],
    'warning'   => [
        'name'  => __('Warning', 'elixir'),
        'slug'  => 'warning',
        'color' => '#ffc107',
    ],
    'danger'   => [
        'name'  => __('Danger', 'elixir'),
        'slug'  => 'danger',
        'color' => '#dc3545',
    ],
    'light'   => [
        'name'  => __('Light', 'elixir'),
        'slug'  => 'light',
        'color' => '#f8f9fa',
    ],
    'dark'   => [
        'name'  => __('Dark', 'elixir'),
        'slug'  => 'dark',
        'color' => '#343a40',
    ],
];
