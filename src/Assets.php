<?php

namespace My\Blocks;

final class Assets
{
    public static function registerScript($handle, $src, $deps = [], $has_i18n = true)
    {
        $asset = self::getAsset($src);
        wp_register_script($handle, $src, $asset['dependencies'] + $deps, $asset['version'], true);

        if ($has_i18n) {
            wp_set_script_translations($handle, 'my-blocks', plugin_dir_path(MY_BLOCKS_PLUGIN_FILE) . '/languages');
        }
    }

    public static function registerStyle($handle, $src, $deps = [], $media = 'all')
    {
        $asset = self::getAsset($src);
        wp_register_style($handle, $src, $deps, $asset['version'], $media);
    }

    public static function getPath($src)
    {
        return str_replace(WP_CONTENT_URL, WP_CONTENT_DIR, $src);
    }

    public static function getAsset($src)
    {
        $filename = str_replace(['.js', '.css'], '.asset.php', self::getPath($src));

        if (file_exists($filename)) {
            return require $filename;
        }

        return [
            'dependencies' => [],
            'version'      => filemtime(self::getPath($src)),
        ];
    }
}
