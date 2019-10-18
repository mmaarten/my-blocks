<?php
/**
 * Abstract dynamic block.
 *
 * @package My/Blocks
 */

namespace My\Blocks\BlockTypes;

abstract class AbstractDynamicBlock
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
     * Get block attributes.
     *
     * @return array
     */
    protected function getAttributes()
    {
        return [];
    }

    /**
     * Registers the block type with WordPress.
     */
    public function registerBlockType()
    {
        register_block_type(
            $this->namespace . '/' . $this->block_name,
            [
                'render_callback' => [$this, 'render'],
                'editor_script'   => 'my-' . $this->block_name,
                'editor_style'    => 'my-block-editor',
                'style'           => 'my-block-style',
                'attributes'      => $this->getAttributes(),
            ]
        );
    }

    /**
     * Include and render a dynamic block.
     *
     * @param array  $attributes Block attributes. Default empty array.
     * @param string $content    Block content. Default empty string.
     * @return string Rendered block type output.
     */
    abstract public function render($attributes = [), $content = '');
}
