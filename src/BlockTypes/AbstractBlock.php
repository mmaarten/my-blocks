<?php
/**
 * Abstract block
 *
 * @package My/Blocks/BlockTypes
 */

namespace My\Blocks\BlockTypes;

abstract class AbstractBlock
{
    /**
     * Namespace.
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
     * Construct.
     *
     * @param string $block_name
     */
    public function __construct($block_name)
    {
        $this->block_name = $block_name;
    }

    /**
     * Get block type name.
     *
     * @return string
     */
    public function getBlockTypeName()
    {
        return $this->namespace . '/' . $this->block_name;
    }

    /**
     * Get block type script.
     *
     * @return string|array
     */
    public function getBlockTypeScript()
    {
        return 'my-blocks-script';
    }

    /**
     * Get block type style.
     *
     * @return string|array
     */
    public function getBlockTypeStyle()
    {
        return 'my-blocks-style';
    }

    /**
     * Get block type editor script.
     *
     * @return string|array
     */
    public function getBlockTypeEditorScript()
    {
        return 'my-blocks-editor-script';
    }

    /**
     * Get block type editor style.
     *
     * @return string|array
     */
    public function getBlockTypeEditorStyle()
    {
        return 'my-blocks-editor-style';
    }
}
