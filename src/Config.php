<?php
/**
 * Config.
 *
 * @package My/Blocks
 */

namespace My\Blocks;

final class Config
{
    private static $items = [];

    public static function init()
    {
        self::load(plugin_dir_path(MY_BLOCKS_PLUGIN_FILE) . 'config.php');
    }

    public static function get($key)
    {
        if (isset(self::$items)) {
            return self::$items[$key];
        }
        return null;
    }

    public static function set($key, $value = null)
    {
        if (is_array($key)) {
            $items = $key;
        } else {
            $items = [$key => $value];
        }

        foreach ($items as $key => $value) {
            self::$items[$key] = $value;
        }
    }

    private static function load($file)
    {
        if (file_exists($file)) {
            include $file;
            if (isset($config) && is_array($config)) {
                self::set($config);
            }
        }
    }
}
