<?php

namespace My\Blocks;

final class App
{
    /**
     * Instance.
     *
     * @var App
     */
    private static $instance = null;

    public static function getInstance()
    {
        if (is_null(self::$instance)) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    /**
     * Did init.
     *
     * @var bool
     */
    private $did_init = false;

    /**
     * Initialize.
     */
    public function init()
    {
        if ($this->did_init) {
            return;
        }

        $this->did_init = true;

        add_action('init', [$this, 'registerBlockTypes']);
        add_action('init', [$this, 'registerBlockAssets']);
        add_action('admin_print_scripts', [$this, 'printBlockSettings'], 1);
    }

    /**
     * Register block types.
     */
    public function registerBlockTypes()
    {
        $blocks = [
            'Button',
            'Column',
            'Modal',
            'Row',
        ];
        foreach ($blocks as $class) {
            $class = __NAMESPACE__ . '\\BlockTypes\\' . $class;
            $instance = new $class();
            $instance->registerBlockType();
        }
    }

    /**
     * Register block assets.
     */
    public function registerBlockAssets()
    {
        // Common editor styles.
        Assets::registerStyle(
            'my-block-editor',
            plugins_url('build/editor.css', MY_BLOCKS_PLUGIN_FILE),
            ['wp-edit-blocks']
        );

        // Common styles for editor and front-end.
        Assets::registerStyle(
            'my-block-style',
            plugins_url('build/style-style.css', MY_BLOCKS_PLUGIN_FILE)
        );

        // Common scripts for editor and front-end.
        Assets::registerScript(
            'my-block-script',
            plugins_url('build/script.js', MY_BLOCKS_PLUGIN_FILE)
        );

        // Individual blocks.
        Assets::registerScript('my-button', plugins_url('build/button.js', MY_BLOCKS_PLUGIN_FILE));
        Assets::registerScript('my-column', plugins_url('build/column.js', MY_BLOCKS_PLUGIN_FILE));
        Assets::registerScript('my-modal', plugins_url('build/modal.js', MY_BLOCKS_PLUGIN_FILE));
        Assets::registerScript('my-row', plugins_url('build/row.js', MY_BLOCKS_PLUGIN_FILE));
    }

    public function printBlockSettings()
    {
        $screen = get_current_screen();

        if (!$screen || !$screen->is_block_editor) {
            return;
        }

        $settings = [
            'themeColors' => ThemeSupport::get('my_blocks/theme_colors', [
                [
                    'name'  => __('Primary', 'my-theme'),
                    'slug'  => 'primary',
                    'color' => '#007bff',
                ],
                [
                    'name'  => __('Secondary', 'my-theme'),
                    'slug'  => 'secondary',
                    'color' => '#6c757d',
                ],
                [
                    'name'  => __('Light', 'my-theme'),
                    'slug'  => 'light',
                    'color' => '#f8f9fa',
                ],
                [
                    'name'  => __('Dark', 'my-theme'),
                    'slug'  => 'dark',
                    'color' => '#343a40',
                ],
            ]),
        ];

        printf('<script>var myBlocksSettings = %s</script>', json_encode($settings));
    }
}
