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
        add_action('enqueue_block_editor_assets', [__CLASS__, 'enqueueEditorAssets']);
    }

    /**
     * Register block assets.
     */
    public static function registerBlockAssets()
    {
        $app = App::getInstance();

        // Common
        $asset = self::getAsset('editor');
        wp_register_script(
            'my-block-editor',
            plugins_url('build/editor.js', MY_BLOCKS_PLUGIN_FILE),
            $asset['dependencies'],
            $app->getVersion() . $asset['version']
        );
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
            $asset = self::getAsset($block);
            wp_register_script(
                "my-$block",
                plugins_url("build/$block.js", MY_BLOCKS_PLUGIN_FILE),
                $asset['dependencies'],
                $app->getVersion() . $asset['version']
            );
        }
    }

    /**
     * Enqueue Editor assets.
     */
    public static function enqueueEditorAssets()
    {
        wp_enqueue_script('my-block-editor');
    }

    public static function getAsset($entry)
    {
        $app = App::getInstance();

        $defaults = [
            'dependencies' => [],
            'version' => false,
        ];

        $asset_file = $app->getAbsPath() . "build/$entry.asset.php";
        if (file_exists($asset_file)) {
            $asset = include $asset_file;
            $assets = wp_parse_args($asset, $defaults);
        } else {
            $asset = $defaults;
        }

        return $asset;
    }
}
