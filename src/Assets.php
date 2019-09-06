<?php

namespace My\Blocks;

final class Assets
{
    public static function init()
    {
        add_action('init', [__CLASS__, 'registerBlockAssets']);

        add_filter('acf/settings/load_json', [__CLASS__, 'acfJSONLoadPoint']);
    }

    /**
     * Register block assets.
     */
    public static function registerBlockAssets()
    {
        /**
         * OWL Carousel
         */
        wp_register_script(
            'owl-carousel',
            plugins_url('dist/scripts/owl-carousel.js', MY_BLOCKS_PLUGIN_FILE),
            [ 'jquery' ],
            '2.3.4',
            true
        );
        wp_register_style(
            'owl-carousel',
            plugins_url('dist/styles/owl-carousel.css', MY_BLOCKS_PLUGIN_FILE),
            [],
            '2.3.4'
        );
        wp_register_style(
            'owl-carousel-theme',
            plugins_url('dist/styles/owl-carousel-theme.css', MY_BLOCKS_PLUGIN_FILE),
            [],
            '2.3.4'
        );
        /**
         * Fancybox
         */
        wp_register_script(
            'fancybox',
            plugins_url('dist/scripts/fancybox.js', MY_BLOCKS_PLUGIN_FILE),
            [ 'jquery' ],
            '3.5.7',
            true
        );
        wp_register_style(
            'fancybox',
            plugins_url('dist/styles/fancybox.css', MY_BLOCKS_PLUGIN_FILE),
            [],
            '3.5.7'
        );
        /**
         * Core
         */
        wp_register_style(
            'my-blocks',
            plugins_url('dist/styles/main.css', MY_BLOCKS_PLUGIN_FILE),
            [],
            my_blocks()->getVersion()
        );

        wp_register_script(
            'my-blocks',
            plugins_url('dist/scripts/main.js', MY_BLOCKS_PLUGIN_FILE),
            [ 'jquery' ],
            my_blocks()->getVersion(),
            true
        );
    }

    public static function acfJSONLoadPoint($paths)
    {
        $paths[] = plugin_dir_path(MY_BLOCKS_PLUGIN_FILE) . 'acf-json';

        return $paths;
    }
}
