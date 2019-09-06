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

defined('ABSPATH') || exit;

require_once(ABSPATH . 'wp-admin/includes/plugin.php');

$plugin = get_plugin_data(__FILE__);

/**
 * Check if autoloader is available.
 */

$autoloader = __DIR__ . '/vendor/autoload.php';

if (!is_readable($autoloader)) {
    // translators: %1$s: The name of the application. %2$s: The code to run.
    error_log(
        sprintf(__('%1$s is not ready. Run %2$s.', 'my-blocks'), $plugin['Name'], '<code>composer install</code>')
    );
    return;
}

/**
 * Check ACF blocks API.
 */
if (!function_exists('register_block_type')) {
    // translators: %1$s: The name of the application.
    error_log(sprintf(__('%1$s needs WordPress blocks API.', 'my-blocks'), $plugin['Name']));
    return;
}

/**
 * Check ACF blocks API.
 */
if (!function_exists('acf_register_block_type')) {
    // translators: %1$s: The name of the application.
    error_log(sprintf(__('%1$s needs Advanced Custom Fields PRO blocks API.', 'my-blocks'), $plugin['Name']));
    return;
}

/**
 * Fire up the application.
 */

/**
 * Get Single instance of main class.
 *
 * @return \My\Blocks\App
 */
function my_blocks()
{
    return \My\Blocks\App::instance();
}

defined('MY_BLOCKS_PLUGIN_FILE') || define('MY_BLOCKS_PLUGIN_FILE', __FILE__);

require $autoloader;

add_action('plugins_loaded', [my_blocks(), 'init']);
