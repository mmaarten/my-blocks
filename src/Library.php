<?php
/**
 * [Description]
 *
 * @package My/Blocks
 */

namespace My\Blocks;

final class Library
{
    public static function init()
    {
        add_action('init', [__CLASS__, 'registerBlockTypes']);
    }

    /**
     * Register block types with WordPress.
     */
    public static function registerBlockTypes()
    {
        $blocks = [
            'Button',
            'OWLCarousel',
            'Carousel',
            'Gallery',
            'HandPickedPosts',
            'Modal',
            'HeroImage',
        ];
        foreach ($blocks as $class) {
            $class = __NAMESPACE__ . '\\BlockTypes\\' . $class;
            $instance = new $class();
            $instance->registerBlockType();
        }
    }
}
