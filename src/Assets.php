<?php
/**
 * Assets
 *
 * @package My/Blocks
 */

namespace My\Blocks;

class Assets
{
    /**
     * Register script.
     *
     * @param string  $handle
     * @param string  $src
     * @param array   $deps
     * @param boolean $has_i18n
     */
    public static function registerScript($handle, $src, $deps = [], $has_i18n = true)
    {
        $asset = self::getAsset($src);

        wp_register_script($handle, $src, $asset['dependencies'] + $deps, $asset['version'], true);

        if ($has_i18n) {
            wp_set_script_translations($handle, 'my-blocks', plugin_dir_path(MY_BLOCKS_PLUGIN_FILE) . 'languages');
        }
    }

    /**
     * Register style.
     *
     * @param string $handle
     * @param string $src
     * @param array  $deps
     * @param string $media
     */
    public static function registerStyle($handle, $src, $deps = [], $media = 'all')
    {
        $asset = self::getAsset($src);

        wp_register_style($handle, $src, $deps, $asset['version'], $media);
    }

    /**
     * Get asset.
     *
     * @param string $src
     * @return array
     */
    public static function getAsset($src)
    {
        $path = str_replace(WP_CONTENT_URL, WP_CONTENT_DIR, $src);
        $file = str_replace(['.js', '.css'], '.asset.php', $path);

        if (file_exists($file)) {
            return require $file;
        }

        return [
            'dependencies' => [],
            'version'      => MY_BLOCKS_PLUGIN_VERSION,
        ];
    }
}
