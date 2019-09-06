<?php
/**
 * [Description]
 *
 * @package My/Blocks
 */

namespace My\Blocks\BlockTypes;

class Gallery extends Base
{
    /**
     * Construct
     */
    public function __construct()
    {
        parent::__construct(
            'gallery',
            __('Gallery', 'my-blocks'),
            [
                'description' => __('Displays an image gallery.', 'my-blocks'),
                'category'    => 'common',
            ]
        );
    }

    /**
     * Render.
     *
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
         * Attributes
         *
         * @var array  images
         * @var string columns
         * @var string size
         * @var string link
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

        /**
         * Output
         */

        echo '<div ' . acf_esc_attr($wrapper) . '>';

        $this->renderGallery([
            'images'  => $attributes['images'],
            'size'    => $attributes['size'],
            'link'    => $attributes['link'],
            'columns' => $attributes['columns'],
        ]);

        echo '</div>';
    }

    /**
     * Displays an image Gallery
     *
     * @uses acf_esc_attr()
     *
     * @param array $args List of arguments.
     */
    public function renderGallery($args)
    {

        static $instance = 0;

        $instance++;

        /**
         * Arguments
         */

        $args = wp_parse_args(
            $args,
            [
                'id'      => '',
                'images'  => [],
                'size'    => 'thumbnail',
                'link'    => '',
                'order'   => 'DESC',
                'orderby' => 'post__in',
                'columns' => 4, // Bootstrap column width.
            ]
        );

        /**
         * Requirements
         */

        if (empty($args['images']) || ! is_array($args['images'])) {
            return;
        }

        /**
         * Attachments
         */

        // Get attrachments.
        $attachments = get_posts(
            [
                'post_type'      => 'attachment',
                'post_status'    => 'inherit',
                'post_mime_type' => 'image',
                'order'          => $args['order'],
                'orderby'        => $args['orderby'],
                'post__in'       => $args['images'],
                'numberposts'    => count($args['images']),
            ]
        );

        // Stop when no attachments.
        if (! $attachments) {
            return;
        }

        /**
         * HTML attributes
         */

        $gallery = [
            'id'    => $args['id'] ? $args['id'] : "gallery-$instance",
            'class' => 'gallery',
        ];

        /**
         * Output
         */

        echo '<div ' . acf_esc_attr($gallery) . '>';

        echo '<div class="row">';

        foreach ($attachments as $attachment) {
            $atts = trim($attachment->post_excerpt) ? [ 'aria-describedby' => "{$gallery['id']}-{$attachment->ID}" ] : '';

            printf('<div class="col-md-%s gallery-column">', $args['columns']);

            echo '<figure class="gallery-item">';

            echo '<div class="gallery-icon">';

            if ('file' === $args['link']) {
                echo wp_get_attachment_link($attachment->ID, $args['size'], false, false, false, $atts);
            } elseif ('none' === $args['link']) {
                echo wp_get_attachment_image($attachment->ID, $args['size'], false, $atts);
            } elseif ('fancybox' === $args['link']) {
                // TODO : Don't use image size 'full'.
                list( $linked ) = (array) wp_get_attachment_image_src($attachment->ID, 'full');

                printf('<a href="%s" data-fancybox="%s">', esc_url($linked), esc_attr($gallery['id']));

                echo wp_get_attachment_image($attachment->ID, $args['size'], false, $atts);

                echo '</a>';
            } else {
                echo wp_get_attachment_link($attachment->ID, $args['size'], true, false, false, $atts);
            }

            echo '</div><!-- .gallery-icon -->';

            if (trim($attachment->post_excerpt)) {
                printf('<figcaption class="gallery-caption" id="%s">', esc_attr("{$gallery['id']}-{$attachment->ID}"));

                echo esc_html(wptexturize($attachment->post_excerpt));

                echo '</figcaption><!-- .gallery-caption -->';
            }

            echo '</figure><!-- .gallery-item -->';

            echo '</div><!-- .gallery-column -->';
        }

        echo '</div><!-- .row -->';

        echo '</div><!-- .gallery -->';
    }

    /**
     * Enqueue assets
     */
    public function enqueueAssets()
    {
        parent::enqueueAssets();

        wp_enqueue_script('fancybox');
        wp_enqueue_style('fancybox');
    }
}
