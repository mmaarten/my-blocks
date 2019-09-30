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

        // Common

        wp_register_style(
            'my-block-editor',
            plugins_url('build/editor.css', MY_BLOCKS_PLUGIN_FILE),
            [],
            $app->getVersion()
        );
        wp_register_style(
            'my-block-style',
            plugins_url('build/style.css', MY_BLOCKS_PLUGIN_FILE),
            [],
            $app->getVersion()
        );

        // Blocks

        $blocks = Config::get('blocks');
        foreach ($blocks as $block) {
            self::registerScript("my-$block", $block);
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
            'colors'    => (array) Config::get('editor_colors'),
            'fontSizes' => (array) Config::get('editor_font_sizes'),
            'styles'    => $styles,
        ] + $settings;

        // Return.
        return $settings;
    }

    private static function registerScript($handle, $entry)
    {
        $app = App::getInstance();

        // Get asset data.
        $asset_file = $app->getAbsPath() . "build/$entry.asset.php";
        if (is_readable($asset_file)) {
            $asset = include $asset_file;
        } else {
            $asset = ['dependencies' => [], 'version' => false];
        }

        wp_register_script(
            $handle,
            plugins_url("build/$entry.js", MY_BLOCKS_PLUGIN_FILE),
            $asset['dependencies'],
            $app->getVersion() . $asset['version']
        );
    }
}
