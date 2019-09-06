<?php
/**
 * [Description]
 *
 * @package My/Blocks
 */

namespace My\Blocks;

final class Common
{
    /**
     * Get grid breakpoints
     *
     * @return array
     */
    public static function getGridBreakpoints()
    {
        return apply_filters('my_blocks/grid_breakpoints', [
            'xs' => 0,
            'sm' => 576,
            'md' => 768,
            'lg' => 992,
            'xl' => 1200,
        ]);
    }
}
