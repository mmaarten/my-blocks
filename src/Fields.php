<?php

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
            $field['choices'] = [
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
        }

        return $field;
    }

    public static function columns($field)
    {
        if (preg_match('/(^| )my-blocks-columns-field( |$)/', $field['wrapper']['class'])) {
            $field['choices'] = [
                12 => 1,
                6  => 2,
                4  => 3,
                3  => 4,
                2  => 6,
                1  => 12,
            ];
        }

        return $field;
    }

    public static function imageSizes($field)
    {
        if (preg_match('/(^| )my-blocks-image-sizes-field( |$)/', $field['wrapper']['class'])) {
            $sizes = [
                'thumbail' => __('Thumbnail'),
                'medium'   => __('Medium'),
                'large'    => __('Large'),
                'full'     => __('Full'),
            ];

            $custom_sizes = apply_filters('image_size_names_choose', []);

            $field['choices'] = $sizes + $custom_sizes;
        }

        return $field;
    }

    public static function postTemplates($field)
    {
        if (preg_match('/(^| )my-blocks-post-templates-field( |$)/', $field['wrapper']['class'])) {
            $field['choices'] = apply_filters('my_blocks/post_templates', []);
        }

        return $field;
    }
}
