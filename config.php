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

/**
 * Editor font weights.
 *
 * Available slugs: See `$editor-font-weight` scss variable.
 *
 * @var array
 */
$config['editor_font_weights'] = [
    'lighter' => __('lighter', 'my-blocks'),
    'light'   => __('light', 'my-blocks'),
    'normal'  => __('normal', 'my-blocks'),
    'bold'    => __('bold', 'my-blocks'),
    'bolder'  => __('bolder', 'my-blocks'),
];
