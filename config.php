<?php

$config = [];

/**
 * Set editor styles.
 *
 * @var boolean
 */
$config['set_editor_styles'] = true;

/**
 * Editor colors.
 *
 * @var boolean
 */
$config['editor_colors'] = [
    [
        'name'  => __('Primary', 'my-blocks'),
        'slug'  => 'primary',
        'color' => '#007bff', // Value of $primary.
    ],
    [
        'name'  => __('Secondary', 'my-blocks'),
        'slug'  => 'secondary',
        'color' => '#6c757d', // Value of $secondary.
    ],
    [
        'name'  => __('Light', 'my-blocks'),
        'slug'  => 'light',
        'color' => '#f8f9fa', // Value of $light.
    ],
    [
        'name'  => __('Dark', 'my-blocks'),
        'slug'  => 'dark',
        'color' => '#343a40', // Value of $dark.
    ],
];

/**
 * Editor font sizes.
 *
 * @var array
 */
$font_size_base = 16;
$config['editor_font_sizes'] = [
    [
        'name'      => __('Extra Small', 'my-blocks'),
        'shortName' => __('xs', 'my-blocks'),
        'size'      => $font_size_base * (80/100), // Value of $small-font-size.
        'slug'      => 'extra-small',
    ],
    [
        'name'      => __('Small', 'my-blocks'),
        'shortName' => __('SM', 'my-blocks'),
        'size'      => $font_size_base * 0.875, // Value of $font-size-sm.
        'slug'      => 'small',
    ],
    [
        'name'      => __('Normal', 'my-blocks'),
        'shortName' => __('N', 'my-blocks'),
        'size'      => $font_size_base, // Value of $font-size-base.
        'slug'      => 'normal',
    ],
    [
        'name'      => __('Large', 'my-blocks'),
        'shortName' => __('LG', 'my-blocks'),
        'size'      => $font_size_base * 1.25, // Value of $font-size-lg.
        'slug'      => 'large',
    ],
    [
        'name'      => __('Heading 1', 'my-blocks'),
        'shortName' => __('H1', 'my-blocks'),
        'size'      => $font_size_base * 2.5, // Value of $h1-font-size.
        'slug'      => 'h-1',
    ],
    [
        'name'      => __('Heading 2', 'my-blocks'),
        'shortName' => __('H2', 'my-blocks'),
        'size'      => $font_size_base * 2, // Value of $h2-font-size.
        'slug'      => 'h-2',
    ],
    [
        'name'      => __('Heading 3', 'my-blocks'),
        'shortName' => __('H3', 'my-blocks'),
        'size'      => $font_size_base * 1.75, // Value of $h3-font-size.
        'slug'      => 'h-3',
    ],
    [
        'name'      => __('Heading 4', 'my-blocks'),
        'shortName' => __('H4', 'my-blocks'),
        'size'      => $font_size_base * 1.5, // Value of $h4-font-size.
        'slug'      => 'h-4',
    ],
    [
        'name'      => __('Heading 5', 'my-blocks'),
        'shortName' => __('H5', 'my-blocks'),
        'size'      => $font_size_base * 1.25, // Value of $h5-font-size.
        'slug'      => 'h-5',
    ],
    [
        'name'      => __('Heading 6', 'my-blocks'),
        'shortName' => __('H6', 'my-blocks'),
        'size'      => $font_size_base, // Value of $h6-font-size.
        'slug'      => 'h-6',
    ],
    [
        'name'      => __('Display 1', 'my-blocks'),
        'shortName' => __('D1', 'my-blocks'),
        'size'      => $font_size_base * 6, // Value of $display1-size.
        'slug'      => 'display-1',
    ],
    [
        'name'      => __('Display 2', 'my-blocks'),
        'shortName' => __('D2', 'my-blocks'),
        'size'      => $font_size_base * 5.5, // Value of $display2-size.
        'slug'      => 'display-2',
    ],
    [
        'name'      => __('Display 3', 'my-blocks'),
        'shortName' => __('D3', 'my-blocks'),
        'size'      => $font_size_base * 4.5, // Value of $display3-size.
        'slug'      => 'display-3',
    ],
    [
        'name'      => __('Display 4', 'my-blocks'),
        'shortName' => __('D4', 'my-blocks'),
        'size'      => $font_size_base * 3.5, // Value of $display4-size.
        'slug'      => 'display-4',
    ],
];
