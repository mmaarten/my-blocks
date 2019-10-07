<?php
/**
 * Initializes blocks in WordPress.
 *
 * @package My/Blocks
 */

namespace My\Blocks;

/**
 * Library class.
 */
class Library
{
    /**
     * Initialize block library features.
     */
    public static function init()
    {
        add_action('init', [__CLASS__, 'registerBlocks']);
    }

    /**
     * Register blocks, hooking up assets and render functions as needed.
     */
    public static function registerBlocks()
    {
        $blocks = [
            'Row',
            'Column',
            'Button',
        ];
        foreach ($blocks as $class) {
            $class = __NAMESPACE__ . '\\BlockTypes\\' . $class;
            $instance = new $class();
            $instance->registerBlockType();
        }
    }
}
