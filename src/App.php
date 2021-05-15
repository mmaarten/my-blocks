<?php
/**
 * Application
 *
 * @package My/Blocks
 */

namespace My\Blocks;

class App
{
    /**
     * Initialize.
     */
    public static function init()
    {
        add_action('init', [__CLASS__, 'registerBlockTypes']);
        add_action('init', [__CLASS__, 'registerBlockAssets']);
        add_action('admin_print_scripts', [__CLASS__, 'printBlockSettings'], 1);
    }

    /**
     * Register block types.
     */
    public static function registerBlockTypes()
    {
        $blocks = ['Row', 'Column', 'Buttons', 'Button', 'Spacer'];

        foreach ($blocks as $block) {
            $class = __NAMESPACE__ . '\\BlockTypes\\' . $block;
            $instance = new $class();

            register_block_type($instance->getBlockTypeName(), [
                'script'        => $instance->getBlockTypeScript(),
                'style'         => $instance->getBlockTypeStyle(),
                'editor_script' => $instance->getBlockTypeEditorScript(),
                'editor_style'  => $instance->getBlockTypeEditorStyle(),
            ]);
        }
    }

    /**
     * Register block assets.
     */
    public static function registerBlockAssets()
    {
        Assets::registerScript(
            'my-blocks-editor-script',
            plugins_url('build/editor-script.js', MY_BLOCKS_PLUGIN_FILE)
        );

        Assets::registerStyle(
            'my-blocks-editor-style',
            plugins_url('build/editor-style.css', MY_BLOCKS_PLUGIN_FILE)
        );

        Assets::registerScript(
            'my-blocks-script',
            plugins_url('build/blocks-script.js', MY_BLOCKS_PLUGIN_FILE)
        );

        Assets::registerStyle(
            'my-blocks-style',
            plugins_url('build/blocks-style.css', MY_BLOCKS_PLUGIN_FILE)
        );
    }

    /**
     * Print block settings.
     */
    public static function printBlockSettings()
    {
        // Check if block editor screen.

        $screen = get_current_screen();

        if (! $screen || ! $screen->is_block_editor) {
            return;
        }

        // Print settings.

        $settings = [
            'gridColumns'     => ThemeSupport::get('myBlocks/gridColumns', 12),
            'gridBreakpoints' => ThemeSupport::get('myBlocks/gridBreakpoints', ['xs', 'md', 'xl']),
        ];

        printf('<script>var myBlocksSettings = %s</script>', json_encode($settings));
    }
}
