<?php
/**
 * Abstract dynamic block class.
 *
 * @package Blocks
 */

namespace My\Blocks\BlockTypes;

abstract class Base
{
    /**
     * Block name.
     *
     * @var string
     */
    protected $block_name = '';

    /**
     * Settings for registering block type.
     *
     * @var string
     */
    protected $args = [];

    public function __construct($name, $title, $args = [])
    {
        $this->block_name = $name;

        $this->args = [
            'name'            => $this->block_name,
            'title'           => $title,
            'render_callback' => [$this, 'render'],
            'enqueue_assets'  => [$this, 'enqueueAssets'],
            'supports'    => [
                'anchor' => true,
                'align'  => array( 'wide', 'full' ),
            ],
        ] + $args;
    }

    /**
     * Registers the block type with WordPress.
     */
    public function registerBlockType()
    {
        acf_register_block_type($this->args);
    }

    public function enqueueAssets()
    {
        wp_enqueue_script("my-{$this->block_name}-block");
    }

    /**
     * Render
     *
     * @param array      $block      The block settings and attributes.
     * @param string     $content    The block inner HTML (empty).
     * @param bool       $is_preview True during AJAX preview.
     * @param int|string $post_id    The post ID this block is saved to.
     */
    abstract public function render($block, $content = '', $is_preview = false, $post_id = 0);
}
