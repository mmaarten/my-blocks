<?php
/**
 * [Description]
 *
 * @package My/Blocks
 */

namespace My\Blocks;

final class Fields
{
    public static function init()
    {
        add_filter('acf/load_field/type=select', [__CLASS__, 'colors']);
        add_filter('acf/load_field/type=select', [__CLASS__, 'columns']);
        add_filter('acf/load_field/type=select', [__CLASS__, 'imageSizes']);
        add_filter('acf/load_field/type=select', [__CLASS__, 'postTemplates']);
    }

    public static function colors($field)
    {
        if (preg_match('/(^| )my-blocks-colors-field( |$)/', $field['wrapper']['class'])) {
            $field['choices'] = Config::get('color_names');
        }

        return $field;
    }

    public static function columns($field)
    {
        if (preg_match('/(^| )my-blocks-columns-field( |$)/', $field['wrapper']['class'])) {
            $field['choices'] = Config::get('columns');
        }

        return $field;
    }

    public static function imageSizes($field)
    {
        if (preg_match('/(^| )my-blocks-image-sizes-field( |$)/', $field['wrapper']['class'])) {
            $field['choices'] = Config::get('image_size_names');
        }

        return $field;
    }

    public static function postTemplates($field)
    {
        if (preg_match('/(^| )my-blocks-post-templates-field( |$)/', $field['wrapper']['class'])) {
            $field['choices'] = Config::get('post_templates');
        }

        return $field;
    }
}
