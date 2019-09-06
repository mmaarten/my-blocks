<?php
/**
 * [Description]
 *
 * @package My/Blocks
 */

namespace My\Blocks\BlockTypes;

class Modal extends Base
{
    /**
     * Construct
     */
    public function __construct()
    {
        parent::__construct(
            'modal',
            __('Modal', 'elixir'),
            array(
                'description' => __('Displays a modal.', 'elixir'),
                'category'    => 'common',
                'supports'    => array(
                    'anchor' => true,
                    'align'  => array(),
                ),
            )
        );
    }

    /**
     * Button Render.
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
         */
        $attributes = get_fields();

        /**
         * Wrapper HTML attributes
         */

        $wrapper = array();

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

        /**
         * Output
         */

        echo '<div ' . acf_esc_attr($wrapper) . '>';

        $this->renderModal($attributes);

        echo '</div>';
    }


    /**
     * Displays a Bootstrap modal.
     *
     * @link https://getbootstrap.com/docs/4.0/components/modal/
     *
     * @uses acf_esc_attr
     *
     * @param array $args The arguments.
     */
    public function renderModal($args)
    {
        $args = wp_parse_args(
            $args,
            array(
                'id'     => '',
                'title'  => '',
                'body'   => '',
                'footer' => '',
                'size'   => '',
                'fade'   => true,
                'center' => false,
            )
        );

        /**
         * HTML attributes
         */

        $modal = [
            'class'       => 'modal',
            'tabindex'    => '-1',
            'role'        => 'dialog',
            'aria-hidden' => 'true',
        ];

        $modal_dialog = [
            'class' => 'modal-dialog',
            'role'  => 'document',
        ];

        $modal_title = [
            'class' => 'h5 modal-title',
        ];

        $modal_close = [
            'type'         => 'button',
            'class'        => 'close',
            'data-dismiss' => 'modal',
            'aria-label'   => __('Close', 'elixir'),
        ];

        // Apply arguments.

        if ($args['id']) {
            $modal['id'] = $args['id'];
        }

        if ($args['fade']) {
            $modal['class'] .= ' fade';
        }

        if ($args['size']) {
            $modal_dialog['class'] .= " modal-{$args['size']}";
        }

        if ($args['center']) {
            $modal_dialog['class'] .= ' modal-dialog-centered';
        }

        if (isset($modal['id']) && $args['title']) {
            $modal_title['id']        = "{$modal['id']}Label";
            $modal['aria-labelledby'] = $modal_title['id'];
        }

        /**
         * Output
         */

        echo '<div ' . acf_esc_attr($modal) . '>';
        echo '<div ' . acf_esc_attr($modal_dialog) . '>';
        echo '<div class="modal-content">';

        echo '<div class="modal-header">';
        if ($args['title']) {
            echo '<h2 ' . acf_esc_attr($modal_title) . '>' . esc_html($args['title']) . '</h2>';
        }
        echo '<button ' . acf_esc_attr($modal_close) . '><span aria-hidden="true">&times;</span></button>';
        echo '</div>'; // .modal-header

		// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
        echo '<div class="modal-body">' . $args['body'] . '</div>';

        if ($args['footer']) {
			// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
            echo '<div class="modal-footer">' . $args['footer'] . '</div>';
        }

        echo '</div>'; // .modal-content
        echo '</div>'; // .modal-dialog
        echo '</div>'; // .modal
    }
}
