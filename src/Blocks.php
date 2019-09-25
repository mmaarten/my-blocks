<?php
/**
 * Blocks.
 *
 * @package My/Blocks
 */

namespace My\Blocks;

final class Blocks
{
    /**
     * Init.
     */
    public static function init()
    {
        add_action('init', [__CLASS__, 'registerBlockTypes']);
        add_action('init', [__CLASS__, 'registerBlockAssets']);
        add_action('wp_print_scripts', [__CLASS__, 'printBlockSettingsScript']);
        add_action('admin_print_scripts', [__CLASS__, 'printBlockSettingsScript']);
    }

    /**
     * Register block types.
     */
    public static function registerBlockTypes()
    {
        $blocks = Config::get('blocks');
        foreach ($blocks as $block) {
            register_block_type("my/$block", [
                'editor_script' => "my-blocks-$block-block",
                'editor_style'  => 'my-blocks-editor',
                'style'         => 'my-blocks-style',
            ]);
        }
    }

    /**
     * Register block assets.
     */
    public static function registerBlockAssets()
    {
        $app = App::getInstance();

        // Common
        wp_register_style(
            'my-blocks-editor',
            plugins_url('build/editor.css', MY_BLOCKS_PLUGIN_FILE),
            [],
            $app->getVersion()
        );
        wp_register_style(
            'my-blocks-style',
            plugins_url('build/style.css', MY_BLOCKS_PLUGIN_FILE),
            [],
            $app->getVersion()
        );

        // Blocks
        $blocks = Config::get('blocks');
        foreach ($blocks as $block) {
            $asset = include $app->getAbsPath() . "build/block-$block.asset.php";
            wp_register_script(
                "my-blocks-$block-block",
                plugins_url("build/block-$block.js", MY_BLOCKS_PLUGIN_FILE),
                $asset['dependencies'],
                $app->getVersion() . '.' . $asset['version']
            );
        }
    }

    /**
     * Print block settings script.
     */
    public static function printBlockSettingsScript()
    {
        $settings = [
            'themeColors' => Config::get('theme_colors'),
        ];

        printf('<script>var myBlocks = myBlocks || %s;</script>', json_encode($settings));
    }
}
