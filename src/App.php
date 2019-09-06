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
     * Version
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

        Library::init();
        Assets::init();
        Fields::init();
    }

    /**
     * Get version.
     *
     * @return string
     */
    public function getVersion()
    {
        return $this->version;
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
