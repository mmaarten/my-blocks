<?php
/**
 * My Blocks
 *
 * @package My/Blocks
 *
 * Plugin Name:       My Blocks (New)
 * Plugin URI:        https://github.com/mmaarten/my-blocks
 * Description:       Block library.
 * Version:           1.0.0
 * Requires at least: 5.2
 * Requires PHP:      5.4
 * Author:            Maarten Menten
 * Author URI:        https://profiles.wordpress.org/maartenm/
 * Text Domain:       my-blocks
 * License:           GPL v2 or later
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 */

/**
 * Check autoloader
 */

$autoloader = dirname(__FILE__) . '/vendor/autoload.php';

/**
 * Check autoloader.
 */
if (! is_readable($autoloader)) {
    trigger_error(
        sprintf(
            // translators: %1$s Code to run.
            __('Autoloader not found. Run %1$s', 'my-blocks'),
            '<code>composer install</code>'
        ),
        E_USER_WARNING
    );
    // TODO: admin notice
    add_action('admin_notices', function () {
    });
    return;
}

/**
 * Check build.
 */

$build_file = dirname(__FILE__) . '/build/editor.js';

if (! is_readable($build_file)) {
    trigger_error(
        sprintf(
            // translators: %1$s Code to run.
            __('Not build. Run %1$s', 'my-blocks'),
            '<code>npm install</code>'
        ),
        E_USER_WARNING
    );
    // TODO: admin notice
    add_action('admin_notices', function () {
    });
    return;
}

/**
 * Check WordPress blocks API.
 */
if (! function_exists('register_block_type')) {
    trigger_error(
        sprintf(
            // translators: %1$s Application name.
            __('%1$s blocks API is not available.', 'my-blocks'),
            __('WordPress')
        ),
        E_USER_WARNING
    );
    // TODO: admin notice
    add_action('admin_notices', function () {
    });
    return;
}

/**
 * Fire up the application
 */

defined('MY_BLOCKS_PLUGIN_FILE') || define('MY_BLOCKS_PLUGIN_FILE', __FILE__);

require $autoloader;

add_action('plugins_loaded', [\My\Blocks\App::getInstance(), 'init']);
