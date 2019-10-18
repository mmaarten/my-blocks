<?php
/**
 * Application.
 *
 * @package My/Blocks
 */

namespace My\Blocks;

final class App
{
    /**
     * Instance.
     *
     * @var null|App
     */
    private static $instance = null;

    /**
     * Get instance.
     *
     * @return App
     */
    public static function getInstance()
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
     * Did init.
     *
     * @var boolean
     */
    private $did_init = false;

    /**
     * Construct.
     *
     * @var boolean
     */
    private function __construct()
    {
    }

    /**
     * Init.
     */
    public function init()
    {
        if ($this->did_init || ! $this->hasDependency()) {
            return;
        }

        $this->did_init = true;

        Config::init();
        Library::init();
        Assets::init();
        Editor::init();
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
     * Has Dependency.
     *
     * @return boolean
     */
    public function hasDependency()
    {
        return function_exists('register_block_type');
    }
}
