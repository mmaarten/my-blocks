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
        return 'my-theme-script';
    }

    /**
     * Get block type style.
     *
     * @return string|array
     */
    public function getBlockTypeStyle()
    {
        return 'my-theme-style';
    }

    /**
     * Get block type editor script.
     *
     * @return string|array
     */
    public function getBlockTypeEditorScript()
    {
        return 'my-theme-editor-script';
    }

    /**
     * Get block type editor style.
     *
     * @return string|array
     */
    public function getBlockTypeEditorStyle()
    {
        return 'my-theme-editor-style';
    }
}
