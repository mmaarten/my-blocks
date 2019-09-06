<?php
/**
* Plugin Name:  My Blocks
* Plugin URI:   https://github.com/mmaarten/my-blocks
* Description:  Block Library
* Version:      1.0.0
* Author:       Maarten Menten
* Author URI:   https://profiles.wordpress.org/maartenm/
* License:      GPL2 or later
* License URI:  https://www.gnu.org/licenses/gpl-2.0.html
* Text Domain:  my-blocks
* Domain Path:  /languages
*
* @package My/Blocks
*/

require_once(ABSPATH . 'wp-admin/includes/plugin.php');

$plugin = get_plugin_data(__FILE__);

/**
 * Check if autoloader is available.
 */

$autoloader = __DIR__ . '/vendor/autoload.php';

if (!is_readable($autoloader)) {
    error_log(
        sprintf(
            // translators: %1$s: The name of the application. %2$s: The code to run.
            __('%1$s is not ready. Run %2$s.', 'my-blocks'),
            $plugin['Name'],
            '<code>composer install</code>'
        )
    );
    return;
}

/**
 * Check WordPress blocks API.
 */
if (!function_exists('register_block_type')) {
    error_log(
        sprintf(
            // translators: %1$s: Application name. %2$s: CMS name.
            __('%1$s needs %2$s blocks API.', 'my-blocks'),
            $plugin['Name'],
            __('WordPress')
        )
    );
    return;
}

/**
 * Check ACF blocks API.
 */
if (!function_exists('acf_register_block_type')) {
    error_log(
        sprintf(
            // translators: %1$s: Application name. %2$s: plugin name.
            __('%1$s needs %2$s blocks API.', 'my-blocks'),
            $plugin['Name'],
            __('Advanced Custom Fields PRO', 'my-blocks')
        )
    );
    return;
}

/**
 * Fire up the application.
 */

defined('MY_BLOCKS_PLUGIN_FILE') || define('MY_BLOCKS_PLUGIN_FILE', __FILE__);

require $autoloader;

add_action('plugins_loaded', [\My\Blocks\App::instance(), 'init']);
