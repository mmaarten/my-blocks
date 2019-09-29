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
    'heading',
];

/**
 * Editor colors.
 *
 * Available slugs: See `$editor-colors` scss variable.
 *
 * @var array
 */
$config['editor_colors'] = [
    'primary'   => __('Primary', 'my-blocks'),
    'secondary' => __('Secondary', 'my-blocks'),
    'light'     => __('Light', 'my-blocks'),
    'dark'      => __('Dark', 'my-blocks'),
];

/**
 * Editor font sizes.
 *
 * Available slugs: See `$editor-font-sizes` scss variable.
 *
 * @var array
 */
$config['editor_font_sizes'] = [
    'small'  => __('Small', 'my-blocks'),
    'normal' => __('Normal', 'my-blocks'),
    'large'  => __('Large', 'my-blocks'),
];
