<?php

namespace My\Blocks;

final class ThemeSupport
{
    public static function get($feature, $default = false)
    {
        $theme_support = get_theme_support($feature);
        return is_array($theme_support) ? $theme_support[0] : $default;
    }
}
