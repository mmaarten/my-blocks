<?php
/**
 * [Description]
 *
 * @package My/Blocks
 */

namespace My\Blocks;

final class App
{
    /**
     * Instance
     *
     * @var App
     */
    private static $instance = null;

    /**
     * Get single class instance.
     *
     * @return App
     */
    public static function instance()
    {
        if (is_null(self::$instance)) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    /**
     * Version.
     *
     * @var string
     */
    private $version = '1.0.0';

    /**
     * Check if already initialized.
     *
     * @var bool
     */
    private $did_init = false;

    /**
     * Construct.
     */
    private function __construct()
    {
    }

    public function init()
    {
        if (false !== $this->did_init || ! $this->hasDependency()) {
            return;
        }

        $this->did_init = true;

        $this->define('MY_BLOCKS_VERSION', $this->version);
        $this->define('MY_BLOCKS_ABSPATH', dirname(MY_BLOCKS_PLUGIN_FILE) . '/');

        Library::init();
        Assets::init();
        Fields::init();
    }

    /**
     * Define constant
     *
     * @param string $name The constant name.
     * @param mixed  $value The constant value.
     *
     * @return string
     */
    private function define($name, $value)
    {
        return defined($name) || define($name, $value);
    }

    /**
     * Has dependency.
     *
     * @return bool
     */
    public function hasDependency()
    {
        return function_exists('register_block_type') && function_exists('acf_register_block_type');
    }
}
