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
            $asset = self::getAsset($block);
            wp_register_script(
                "my-$block",
                plugins_url("build/$block.js", MY_BLOCKS_PLUGIN_FILE),
                $asset['dependencies'],
                $app->getVersion() . $asset['version']
            );
        }
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
        } else {
            $asset = [];
        }

        return wp_parse_args($asset, $defaults);
    }
}
