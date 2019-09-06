<?php
/**
 * [Description]
 *
 * @package My/Blocks
 */

namespace My\Blocks\BlockTypes;

class Carousel extends Base
{
    /**
     * Construct
     */
    public function __construct()
    {
        parent::__construct(
            'carousel',
            __('Carousel', 'elixir'),
            array(
                'description' => __('Displays a carousel.', 'elixir'),
                'category'    => 'common',
            )
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
         * @var array  posts
         * @var array  enable
         * @var string post_template
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
         * Carousel arguments
         */

        $query_args = array(
            'post_type'      => 'any',
            'post_status'    => 'publish',
            'order'          => 'DESC',
            'orderby'        => 'post__in',
            'posts_per_page' => count($attributes['posts']),
            'post__in'       => $attributes['posts'],
        );

        $options = array(
            'autoplay'      => in_array('autplay', $attributes['enable'], true),
            'indicators'    => in_array('indicators', $attributes['enable'], true),
            'controls'      => in_array('controls', $attributes['enable'], true),
            'post_template' => $attributes['post_template'],
        );

        /**
         * Output
         */

        echo '<div ' . acf_esc_attr($wrapper) . '>';

        $this->renderCarousel($query_args, $options);

        echo '</div>';
    }

    /**
     * Display a Bootstrap carousel
     *
     * @link https://getbootstrap.com/docs/4.0/components/carousel/
     *
     * @uses acf_esc_attr()
     *
     * @param array $query_args WP_Query arguments.
     * @param array $args       Carousel specific arguments.
     */
    protected function renderCarousel($query_args, $args = array())
    {
        static $instance = 0;

        $instance++;

        /**
         * Arguments
         */

        $args = wp_parse_args(
            $args,
            array(
                'id'            => '',
                'autoplay'      => true,
                'indicators'    => true,
                'controls'      => true,
                'post_template' => '',
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

        // Set active post.
        $active = $the_query->posts[0];

        /**
         * Carousel HTML attributes
         */

        $carousel = array(
            'id'    => $args['id'] ? $args['id'] : "carousel-$instance",
            'class' => 'carousel slide',
        );

        if ($args['autoplay']) {
            $carousel['data-ride'] = 'carousel';
        }

        /**
         * Output
         */

        echo '<div ' . acf_esc_attr($carousel) . '>';

        echo '<div class="carousel-inner">';

        // Indicators.

        if ($args['indicators']) {
            echo '<ol class="carousel-indicators">';

            $i = 0;

            while ($the_query->have_posts()) {
                $the_query->the_post();

                $indicator = array(
                    'data-target'   => "#{$carousel['id']}",
                    'data-slide-to' => $i,
                );

                if (get_the_ID() === $active->ID) {
                    $indicator['class'] = 'active';
                }

                echo '<li ' . acf_esc_attr($indicator) . '></li>';

                $i++;
            }

            $the_query->rewind_posts();

            echo '</ol><!-- .carousel-indicators -->';
        }

        // Items.

        $post_template = locate_template($args['post_template']);

        while ($the_query->have_posts()) {
            $the_query->the_post();

            $item = array(
                'class' => 'carousel-item',
            );

            if (get_the_ID() === $active->ID) {
                $item['class'] .= ' active';
            }

            echo '<div ' . acf_esc_attr($item) . '>';

            if ($post_template) {
                include $post_template;
            } else {
                $this->renderCarouselItem();
            }

            echo '</div><!-- .carousel-item -->';
        }

        wp_reset_postdata();

        // Controls.

        if ($args['controls']) {
            printf('<a class="carousel-control-prev" href="#%s" role="button" data-slide="prev">', esc_attr($carousel['id']));
            echo '<span class="carousel-control-prev-icon" aria-hidden="true"></span>';
            printf('<span class="sr-only">%s</span>', esc_html__('Previous', 'elixir'));
            echo '</a>';

            printf('<a class="carousel-control-next" href="#%s" role="button" data-slide="next">', esc_attr($carousel['id']));
            echo '<span class="carousel-control-next-icon" aria-hidden="true"></span>';
            printf('<span class="sr-only">%s</span>', esc_html__('Next', 'elixir'));
            echo '</a>';
        }

        echo '</div><!-- .carousel-inner -->';

        echo '</div><!-- .carousel -->';
    }

    protected function renderCarouselItem()
    {
        ?>

        <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

            <?php the_post_thumbnail('large'); ?>

            <div class="carousel-caption d-none d-md-block">

                <?php the_title('<h2 class="h5 entry-title">', '</h2>'); ?>

                <?php the_excerpt(); ?>

            </div>

        </article><!-- #post-<?php the_ID(); ?> -->

        <?php
    }
}
