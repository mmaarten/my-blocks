<?php
/**
 * Block library.
 *
 * @package My/Blocks
 */

namespace My\Blocks;

final class Library
{
    /**
     * Init.
     */
    public static function init()
    {
        add_action('init', [__CLASS__, 'registerBlocks']);
    }

    /**
     * Register blocks.
     */
    public static function registerBlocks()
    {
        $blocks = Config::get('blocks');
        foreach ($blocks as $block) {
            register_block_type("my/$block", [
                'editor_script' => "my-$block",
                'editor_style'  => 'my-block-editor',
                'style'         => 'my-block-style',
            ]);
        }
    }
}
