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
        add_filter('acf/settings/load_json', 'acfJSONLoadPoint');
    }

    public function acfJSONLoadPoint($paths)
    {
        $paths[] = plugin_dir_path(MY_BLOCKS_PLUGIN_FILE) . '/acf-json';

        return $paths;
    }

    /**
     * Register block types.
     */
    public function registerBlockTypes()
    {
        $blocks = [
            'Row',
            'Column',
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
        Assets::registerScript('my-column', plugins_url('build/column.js', MY_BLOCKS_PLUGIN_FILE));
        Assets::registerScript('my-row', plugins_url('build/row.js', MY_BLOCKS_PLUGIN_FILE));
    }

    public function printBlockSettings()
    {
        $screen = get_current_screen();

        if (!$screen || !$screen->is_block_editor) {
            return;
        }

        $settings = [];

        printf('<script>var myBlocksSettings = %s</script>', json_encode($settings));
    }
}
