<?php
/**
 * Abstract block.
 *
 * @package My/Blocks
 */

namespace My\Blocks\BlockTypes;

abstract class AbstractBlock
{
    /**
     * Block namespace.
     *
     * @var string
     */
    protected $namespace = 'my';

    /**
     * Block name.
     *
     * @var string
     */
    protected $block_name = '';

    /**
     * Registers the block type with WordPress.
     */
    public function registerBlockType()
    {
        register_block_type(
            $this->namespace . '/' . $this->block_name,
            array(
                'editor_script' => 'my-' . $this->block_name,
                'editor_style'  => 'my-block-editor',
                'style'         => 'my-block-style',
            )
        );
    }
}
