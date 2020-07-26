<?php

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
    protected $name = '';

    /**
     * Constructor
     *
     * @param string $name Block name.
     */
    public function __construct($name)
    {
        $this->name = $name;
    }

    /**
     * Registers the block type with WordPress.
     */
    public function registerBlockType()
    {
        register_block_type($this->namespace . '/' . $this->name, [
            'editor_script'   => 'my-' . $this->name,
            'editor_style'    => 'my-block-editor',
            'script'          => 'my-block-script',
            'style'           => 'my-block-style',
        ]);
    }
}
