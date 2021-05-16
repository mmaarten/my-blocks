<?php
/**
 * Plugin Name:       My Blocks
 * Plugin URI:        https://github.com/mmaarten/my-blocks
 * Description:       Block library.
 * Version:           1.0.0
 * Requires at least: 5.0
 * Requires PHP:      5.6
 * Author:            Maarten Menten
 * Author URI:        https://profiles.wordpress.org/maartenm/
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       my-blocks
 * Domain Path:       /languages
 */

/**
 * Include autoloader.
 */

$autoloader = __DIR__ . '/vendor/autoload.php';

if (! is_readable($autoloader)) {
    error_log(
        sprintf(
            /* translators: 1: Composer command. 2: plugin directory */
            esc_html__(
                'Your installation of the My Blocks plugin is incomplete. Please run %1$s within the %2$s directory.',
                'my-blocks'
            ),
            '<code>composer install</code>',
            '<code>' . esc_html(str_replace(ABSPATH, '', __DIR__)) . '</code>'
        )
    );
    return;
}

require $autoloader;

/**
 * Define constants.
 */
define('MY_BLOCKS_PLUGIN_FILE', __FILE__);
define('MY_BLOCKS_PLUGIN_VERSION', '1.0.0');

/**
 * Initialize application.
 */
add_action('plugins_loaded', ['My\Blocks\App', 'init']);
