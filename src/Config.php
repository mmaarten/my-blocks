<?php
/**
 * [Description]
 *
 * @package My/Blocks
 */

namespace My\Blocks;

final class Config
{
    protected static $items = [];

    public static function init()
    {
        if (is_readable(MY_BLOCKS_ABSPATH . 'config.php')) {
            include MY_BLOCKS_ABSPATH . 'config.php';
            if (isset($config)) {
                self::set($config);
            }
        }
    }

    public static function get($key)
    {
        if (isset(self::$items[$key])) {
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
            $value = apply_filters("my/blocks/config/key=$key", $value, $key);

            self::$items[$key] = $value;
        }
    }
}
