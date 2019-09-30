<?php
/**
 * Block Assets.
 *
 * @package My/Blocks
 */

namespace My\Blocks;

final class Assets
{
    /**
     * Init.
     */
    public static function init()
    {
        add_action('init', [__CLASS__, 'registerBlockAssets']);
        add_filter('block_editor_settings', [__CLASS__, 'blockEditorSettings']);
    }

    /**
     * Register block assets.
     */
    public static function registerBlockAssets()
    {
        $app = App::getInstance();

        // Editor
        $asset = include $app->getAbsPath() . 'build/editor.asset.php';
        wp_register_script(
            'my-block-editor',
            plugins_url('build/editor.js', MY_BLOCKS_PLUGIN_FILE),
            $asset['dependencies'],
            $app->getVersion() . $asset['version'],
            true
        );
        wp_register_style(
            'my-block-editor',
            plugins_url('build/editor.css', MY_BLOCKS_PLUGIN_FILE),
            [],
            $app->getVersion()
        );
        // Style
        wp_register_style(
            'my-block-style',
            plugins_url('build/style.css', MY_BLOCKS_PLUGIN_FILE),
            [],
            $app->getVersion()
        );
        // Blocks
        $blocks = Config::get('blocks');
        foreach ($blocks as $block) {
            $asset = include $app->getAbsPath() . "build/$block.asset.php";
            wp_register_script(
                "my-$block",
                plugins_url("build/$block.js", MY_BLOCKS_PLUGIN_FILE),
                $asset['dependencies'],
                $app->getVersion() . $asset['version']
            );
        }
    }

    /**
     * Block editor settings.
     *
     * Theme can overrule these settings. So no need to check.
     *
     * @param array $settings
     *
     * @return array
     */
    public static function blockEditorSettings($settings)
    {
        // Styles.
        $styles = $settings['styles'];
        $styles_file = Config::get('editor_styles_file');
        if (file_exists($styles_file)) {
            $styles[] = ['css' => file_get_contents($styles_file) ];
        }

        return [
            'disableCustomColors'    => (bool) Config::get('disable_custom_colors'),
            'disableCustomFontSizes' => (bool) Config::get('disable_custom_font_sizes'),
            'colors'                 => (array) Config::get('editor_colors'),
            'fontSizes'              => (array) Config::get('editor_font_sizes'),
            'styles'                 => $styles,
        ] + $settings;



        // Return.
        return $settings;
    }
}
