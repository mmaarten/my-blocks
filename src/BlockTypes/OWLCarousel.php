<?php
/**
 * [Description]
 *
 * @package My/Blocks
 */

namespace My\Blocks\BlockTypes;

class OWLCarousel extends Base
{
    /**
     * Construct
     */
    public function __construct()
    {
        parent::__construct(
            'owl-carousel',
            __('OWL Carousel', 'elixir'),
            array(
                'description' => __('Displays an OWL carousel.', 'elixir'),
                'category'    => 'common',
            )
        );
    }

    /**
     * Render.
     *
     * @link https://owlcarousel2.github.io/OwlCarousel2/
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
         * @var array        posts   A list of post ids.
         * @var array        enable  List of features.
         * @var string|array items   The number of items to display.
         *                           Use an array to specify screensize e.g.:
         *                           [ 'xs'=>1, 'sm'=>2, 'md'=>3, 'lg'=>4, 'xl'=> 5 ]
         * @var string post_template Template used for displaying an item.
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
         * WP Query args
         */

        $query_args = array(
            'post_type'      => 'any',
            'post_status'    => 'publish',
            'order'          => 'DESC',
            'orderby'        => 'post__in',
            'posts_per_page' => min(ELIXIR_MAX_NUMBERPOSTS, $attributes['posts']),
            'post__in'       => $attributes['posts'],
        );

        /**
         * Carousel options
         */

        $responsive = array();

        if (false !== strpos($attributes['items'], '=')) {
            $items = wp_parse_args($attributes['items']);
        } else {
            $items = array( 'xs' => $attributes['items'] );
        }

        $breakpoints = Common::getGridBreakpoints();

        foreach ($breakpoints as $breakpoint => $width) {
            // Set items.
            if (isset($items[ $breakpoint ])) {
                $_items = intval($items[ $breakpoint ]);
                if ($_items) {
                    $responsive[ $width ]['items'] = $_items;
                }
            }
        }

        $options = array(
            'loop'       => in_array('loop', $attributes['enable'], true),
            'autoplay'   => in_array('autoplay', $attributes['enable'], true),
            'nav'        => in_array('nav', $attributes['enable'], true),
            'dots'       => in_array('dots', $attributes['enable'], true),
            'responsive' => $responsive,
        );

        /**
         * Output
         */

        echo '<div ' . acf_esc_attr($wrapper) . '>';

        $this->renderCarousel($query_args, $options);

        echo '</div>';
    }

    /**
     * Display an OWL carousel
     *
     * @link https://owlcarousel2.github.io/OwlCarousel2/
     *
     * @uses acf_esc_attr()
     *
     * @param array $query_args WP_Query arguments.
     * @param array $args       Carousel specific arguments.
     */
    public function renderCarousel($query_args, $args = array())
    {

        /**
         * Arguments
         */

        $args = wp_parse_args(
            $args,
            array(
                'id'            => '',
                'post_template' => '',
                // … OWL carousel options.
            )
        );

        /**
         * Query posts
         */

        $the_query = new \WP_Query($query_args);

        // Stop when no posts are found.
        if (! $the_query->have_posts()) {
            return;
        }

        /**
         * Javascript options
         */

        // Get options out of $args.
        $js_options = array_diff_key(
            $args,
            array(
                'id'            => true,
                'post_template' => true,
            )
        );

        /**
         * Carousel HTML attributes
         */

        $carousel = array(
            'id'           => $args['id'],
            'class'        => 'owl-carousel owl-theme',
            'data-options' => $js_options,
        );

        // Remove empty attributes.
        $carousel = array_filter($carousel);

        /**
         * Output
         */

        echo '<div ' . acf_esc_attr($carousel) . '>';

        while ($the_query->have_posts()) {
            $the_query->the_post();

            Common::getTemplatePart('owl-item', $args['post_template']);
        }

        wp_reset_postdata();

        echo '</div><!-- .owl-carousel -->';
    }

    public function renderCarouselItem()
    {
        ?>

        <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

            <?php the_post_thumbnail('large'); ?>

        </article><!-- #post-<?php the_ID(); ?> -->

        <?php
    }

    /**
     * Enqueue assets
     */
    public function enqueueAssets()
    {
        wp_enqueue_script('owl-carousel');
        wp_enqueue_style('owl-carousel');
        wp_enqueue_style('owl-carousel-theme');
        wp_enqueue_script('my-blocks');
    }
}
