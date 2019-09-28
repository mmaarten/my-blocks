<?php
/**
 * Config.
 *
 * @package My/Blocks
 */

namespace My\Blocks;

final class Config
{
    /**
     * Init.
     */
    public static function init()
    {
        $app = App::getInstance();

        // Load items from config file.
        $file = $app->getAbsPath() . 'config.php';
        if (file_exists($file)) {
            include $file;
            if (isset($config) && is_array($config)) {
                self::set($config);
            }
        }
    }

    /**
     * Items
     *
     * @var array
     */
    private static $items = [];

    /**
     * Get item.
     *
     * @return mixed
     */
    public static function get($key)
    {
        if (isset(self::$items[$key])) {
            return self::$items[$key];
        }
        return null;
    }

    /**
     * Set item(s).
     */
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
}
