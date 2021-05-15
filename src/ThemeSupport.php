<?php
/**
 * Theme support
 *
 * @package My/Blocks
 */

namespace My\Blocks;

class ThemeSupport
{
    /**
     * Get feature settings.
     *
     * @param string $feature
     * @param mixed $default
     *
     * @return mixed
     */
    public static function get($feature, $default = false)
    {
        if (current_theme_supports($feature)) {
            return get_theme_support($feature);
        }

        return $default;
    }
}
