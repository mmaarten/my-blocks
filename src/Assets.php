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
        add_action('admin_enqueue_scripts', [__CLASS__, 'adminEnqueueScripts']);
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
     * admin Enqueue Scripts.
     */
    public static function adminEnqueueScripts()
    {
        wp_enqueue_script('my-block-editor');
    }
}
