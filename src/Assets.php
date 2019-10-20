<?php
/**
 * Initializes block assets.
 *
 * @package My/Blocks
 */

namespace My\Blocks;

/**
 * Assets class.
 */
class Assets
{
    /**
     * Initialize.
     */
    public static function init()
    {
        add_action('init', [__CLASS__, 'registerAssets']);
    }

    /**
     * Register block scripts & styles.
     */
    public static function registerAssets()
    {
        // Common.
        self::registerStyle('my-block-editor', plugins_url('build/editor.css', MY_BLOCKS_PLUGIN_FILE), ['wp-edit-blocks']);
        self::registerStyle('my-block-style', plugins_url('build/style.css', MY_BLOCKS_PLUGIN_FILE), []);

        // Individual blocks.
        self::registerScript('my-column', plugins_url('build/column.js', MY_BLOCKS_PLUGIN_FILE));
        self::registerScript('my-row', plugins_url('build/row.js', MY_BLOCKS_PLUGIN_FILE));
        self::registerScript('my-button', plugins_url('build/button.js', MY_BLOCKS_PLUGIN_FILE));
        self::registerScript('my-heading', plugins_url('build/heading.js', MY_BLOCKS_PLUGIN_FILE));
        self::registerScript('my-card', plugins_url('build/card.js', MY_BLOCKS_PLUGIN_FILE));
        self::registerScript('my-post', plugins_url('build/post.js', MY_BLOCKS_PLUGIN_FILE));
    }

    /**
     * Registers a script according to `wp_register_script`, additionally loading the translations for the file.
     *
     * @param string $handle    Name of the script. Should be unique.
     * @param string $src       Full URL of the script.
     * @param array  $deps      An array of registered script handles this script depends on.
     * @param bool   $has_i18n  Whether to add a script translation call to this file.
     */
    protected static function registerScript($handle, $src, $deps = [], $has_i18n = true)
    {
        $deps = array_merge(self::getScriptDependencies($src), $deps);
        $ver  = self::getFileVersion($src);
        wp_register_script($handle, $src, $deps, $ver, true);

        if ($has_i18n && function_exists('wp_set_script_translations')) {
            wp_set_script_translations($handle, 'my-blocks', plugin_dir_path(MY_BLOCKS_PLUGIN_FILE) . 'languages');
        }
    }

    /**
     * Register style.
     *
     * @param string $handle Unique name of the stylesheet.
     * @param string $src    Full URL of the stylesheet.
     * @param array  $deps   An array of registered stylesheet handles this stylesheet depends on.
     * @param string $media  The media for which this stylesheet has been defined.
     */
    protected static function registerStyle($handle, $src, $deps = [], $media = 'all')
    {
        $ver = self::getFileVersion($src);
        wp_register_style($handle, $src, $deps, $ver, $media);
    }

    /**
     * Converts file URL to file directory path.
     *
     * @param string $src
     * @return string
     */
    protected static function getFilePath($src)
    {
        $base_url  = plugins_url('/', MY_BLOCKS_PLUGIN_FILE);
        $base_path = plugin_dir_path(MY_BLOCKS_PLUGIN_FILE);
        return str_replace($base_url, $base_path, $src);
    }

    /**
     * Get file version.
     *
     * @param string $src
     * @return string
     */
    protected static function getFileVersion($src)
    {
        if (defined('SCRIPT_DEBUG') && SCRIPT_DEBUG) {
            $file = self::getFilePath($src);
            if (file_exists($file)) {
                return filemtime($file);
            }
        }
        return App::getInstance()->getVersion();
    }

    /**
     * Get script dependencies from `.asset.php` file.
     *
     * @param string $src
     * @return array
     */
    protected static function getScriptDependencies($src)
    {
        $file = str_replace('.js', '.asset.php', self::getFilePath($src));
        if (file_exists($file)) {
            ob_start();
            $data = include $file;
            ob_get_clean();
            return $data['dependencies'];
        }
        return [];
    }
}
