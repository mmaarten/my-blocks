<?php
/**
 * [Description]
 *
 * @package My/Blocks
 */

namespace My\Blocks\BlockTypes;

class Button extends Base
{
    /**
     * Construct
     */
    public function __construct()
    {
        parent::__construct(
            'button',
            __('Button', 'my-blocks'),
            [
                'description' => __('Displays a button.', 'my-blocks'),
                'category'    => 'common',
            ]
        );
    }

    /**
     * Render.
     *
     * @link https://getbootstrap.com/docs/4.0/components/carousel/
     * @link https://www.advancedcustomfields.com/resources/acf_register_block_type/#examples
     *
     * @uses get_fields()
     * @uses acf_esc_attr()
     *
     * @param array      $block      The block settings and attributes.
     * @param string     $content    The block inner HTML (empty).
     * @param bool       $is_preview True during AJAX preview.
     * @param int|string $post_id    The post ID this block is saved to.
     */
    public function render($block, $content = '', $is_preview = false, $post_id = 0)
    {

        /**
         * Field settings
         *
         * @var string text
         * @var string link
         * @var bool   link_tab
         * @var string type
         * @var string size
         * @var bool   outline
         * @var bool   block
         * @var string toggle
         * @var string align
         */
        $attributes = get_fields();

        /**
         * Wrapper HTML attributes
         */

        $wrapper = [];

        // Add block specific class.
        $wrapper['class'] = ' wp-block-' . str_replace('/', '-', $block['name']);

        // Apply 'align' setting.
        if (! empty($block['align'])) {
            $wrapper['class'] .= " align{$block['align']}";
        }

        // Apply 'custom CSS classes' setting.
        if (! empty($block['className'])) {
            $wrapper['class'] .= " {$block['className']}";
        }

        // Apply 'anchor' setting.
        if (! empty($block['anchor'])) {
            $wrapper['id'] = $block['anchor'];
        }

        if ($attributes['align']) {
            $wrapper['class'] .= " text-{$attributes['align']}";
        }

        /**
         * Output
         */

        echo '<div ' . acf_esc_attr($wrapper) . '>';

        $this->renderButton($attributes);

        echo '</div>';
    }

    protected function renderButton($args)
    {
        /**
         * Arguments
         */

        $args = wp_parse_args(
            $args,
            [
                'text'     => __('Button', 'my-blocks'),
                'link'     => '#',
                'link_tab' => false,
                'type'     => 'primary',
                'size'     => '',
                'outline'  => false,
                'block'    => false,
                'toggle'   => '',
            ]
        );

        /**
         * HTML attributes
         */

        $button = [
            'class' => 'btn',
            'role'  => 'button',
        ];

        if ($args['link']) {
            $button['href'] = esc_url($args['link']);
        }

        if ($args['link_tab']) {
            $button['target'] = '_blank';
        }

        if ($args['outline']) {
            $button['class'] .= " btn-outline-{$args['type']}";
        } else {
            $button['class'] .= " btn-{$args['type']}";
        }

        if ($args['size']) {
            $button['class'] .= " btn-{$args['size']}";
        }

        if ($args['block']) {
            $button['class'] .= ' btn-block';
        }

        if ($args['toggle']) {
            $button['data-toggle'] = $args['toggle'];
        }

        /**
         * Output
         */

        echo '<a ' . acf_esc_attr($button) . '>' . esc_html($args['text']) . '</a>';
    }
}
