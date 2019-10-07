<?php
/**
 * Plugin Name: My Blocks
 * Plugin URI: https://github.com/mmaarten/my-blocks
 * Description: Blocks for the Gutenberg editor.
 * Version: 1.0.0
 * Author: Maarten Menten
 * Author URI: https://profiles.wordpress.org/maartenm/
 * Text Domain:  my-blocks
 *
 * @package My\Blocks
 */

$plugin_name = __('My Blocks', 'my-blocks');

/**
 * Check PHP version.
 */
$php_version = '5.4.0';
if (version_compare(PHP_VERSION, $php_version, '<')) {
    error_log(
        sprintf(
            // translators: %1$s Plugin name, %2$s PHP version.
            __('%1$s requires at least PHP version %2$s.', 'my-blocks'),
            $plugin_name,
            $php_version
        )
    );
    return;
}

/**
 * Check WordPress version.
 */
$wp_version = '5.0.0';
if (! isset($GLOBALS['wp_version']) || version_compare($GLOBALS['wp_version'], $wp_version, '<')) {
    error_log(
        sprintf(
            // translators: %1$s Plugin name, %2$s WordPress version.
            __('%1$s requires at least WordPress version %2$s.', 'my-blocks'),
            $plugin_name,
            $wp_version
        )
    );
    return;
}

/**
 * Check autoloader.
 */
$autoloader = dirname(__FILE__) . '/vendor/autoload.php';
if (! is_readable($autoloader)) {
    error_log(
        sprintf(
            // translators: %1$s Plugin name, %2$s Code to run.
            __('%1$s installation is not complete. Run %2$s', 'my-blocks'),
            $plugin_name,
            '<code>composer install</code>'
        )
    );
    return;
}

/**
 * Check Node modules.
 */
$file = dirname(__FILE__) . '/node_modules';
if (! is_readable($file)) {
    error_log(
        sprintf(
            // translators: %1$s Plugin name, %2$s Code to run.
            __('%1$s installation is not complete. Run %2$s', 'my-blocks'),
            $plugin_name,
            '<code>npm install</code>'
        )
    );
    return;
}

/**
 * Check build.
 */
$build_file = dirname(__FILE__) . '/build/style.css';
if (! is_readable($build_file)) {
    error_log(
        sprintf(
            // translators: %1$s Plugin name, %2$s Code to run.
            __('%1$s installation is not complete. Run %2$s', 'my-blocks'),
            $plugin_name,
            '<code>npm run build</code>'
        )
    );
    return;
}

/**
 * Fire up the application.
 */
defined('MY_BLOCKS_PLUGIN_FILE') or define('MY_BLOCKS_PLUGIN_FILE', __FILE__);

require $autoloader;

add_action('plugins_loaded', [\My\Blocks\App::getInstance(), 'init']);
