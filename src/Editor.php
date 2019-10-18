<?php
/**
 * @package My/Blocks
 */

namespace My\Blocks;

/**
 * Editor class.
 */
class Editor
{
    /**
     * Initialize.
     */
    public static function init()
    {
        add_filter('block_editor_settings', [__CLASS__, 'blockEditorSettings']);
    }

    public static function blockEditorSettings($settings)
    {
        if (Config::get('set_editor_styles')) {
            $styles_file = plugin_dir_path(MY_BLOCKS_PLUGIN_FILE) . '/build/styles/editor-styles.css';
            if (file_exists($styles_file)) {
                $settings['styles'][] = ['css' => file_get_contents($styles_file)];
            }
        }

        return $settings;
    }
}
