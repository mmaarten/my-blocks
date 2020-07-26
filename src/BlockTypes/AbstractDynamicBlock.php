<?php

namespace My\Blocks\BlockTypes;

abstract class AbstractDynamicBlock extends AbstractBlock
{
    /**
     * Registers the block type with WordPress.
     */
    public function registerBlockType()
    {
        register_block_type($this->namespace . '/' . $this->name, [
            'render_callback' => [$this, 'render'],
            'editor_script'   => 'my-' . $this->name,
            'editor_style'    => 'my-block-editor',
            'script'          => 'my-block-script',
            'style'           => 'my-block-style',
            'attributes'      => $this->getAttributes(),
        ]);
    }

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
     * Include and render a dynamic block.
     *
     * @param array  $attributes Block attributes. Default empty array.
     * @param string $content    Block content. Default empty string.
     * @return string Rendered block type output.
     */
    abstract public function render($attributes = [], $content = '');
}
