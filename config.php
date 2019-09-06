<?php
/**
 * Config
 *
 * @package My/Blocks
 */

$config = [];

$config['grid_breakpoints'] = [
    'xs' => 0,
    'sm' => 576,
    'md' => 768,
    'lg' => 992,
    'xl' => 1200,
];

$config['color_names'] = [
    'primary'   => __('Primary'),
    'secondary' => __('Secondary'),
    'success'   => __('Success'),
    'info'      => __('Info'),
    'warning'   => __('Warning'),
    'danger'    => __('Danger'),
    'light'     => __('Light'),
    'dark'      => __('Dark'),
    'white'     => __('white'),
];

$config['columns'] = [
    12 => 1,
    6  => 2,
    4  => 3,
    3  => 4,
    2  => 6,
    1  => 12,
];

$config['post_templates'] = [];

$config['image_size_names'] = [
    'thumbail' => __('Thumbnail'),
    'medium'   => __('Medium'),
    'large'    => __('Large'),
    'full'     => __('Full'),
] + apply_filters('image_size_names_choose', []);
