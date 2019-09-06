<?php
/**
 * [Description]
 *
 * @package My/Blocks
 */

namespace My\Blocks\BlockTypes;

class HandPickedPosts extends Base
{
    /**
     * Construct
     */
    public function __construct()
    {
        parent::__construct(
            'hand-picked-posts',
            __('Hand-picked posts', 'my-blocks'),
            [
                'description' => __('Displays posts.', 'my-blocks'),
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
         * @var array  posts
         * @var string columns
         * @var string post_template Template used for displaying an item.
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
         * Posts render arguments
         */

        $query_args = [
            'post_type'      => 'any',
            'post_status'    => 'publish',
            'order'          => 'DESC',
            'orderby'        => 'post__in',
            'posts_per_page' => count($attributes['posts']),
            'post__in'       => $attributes['posts'],
        ];

        $options = [
            'columns'       => $attributes['columns'],
            'post_template' => $attributes['post_template'],
        ];

        /**
         * Output
         */

        echo '<div ' . acf_esc_attr($wrapper) . '>';

        $this->renderPosts($query_args, $options);

        echo '</div>';
    }

    /**
     * Display posts
     *
     * @uses acf_esc_attr()
     *
     * @param array $query_args WP_Query arguments.
     * @param array $args       Component specific arguments.
     */
    public function renderPosts($query_args, $args = [])
    {

        /**
         * Arguments
         */

        $args = wp_parse_args(
            $args,
            [
                'columns'       => 4,
                'post_template' => '',
            ]
        );

        /**
         * WP Query
         */

        $the_query = new \WP_Query($query_args);

        if (! $the_query->have_posts()) {
            return;
        }

        /**
         * Wrapper HTML Attributes
         */

        $wrapper = [
            'class' => 'posts-list',
        ];

        /**
         * Post template
         */

        $post_template = locate_template($args['post_template']);

        /**
         * Output
         */

        echo '<div ' . acf_esc_attr($wrapper) . '>';

        echo '<div class="row">';

        while ($the_query->have_posts()) {
            $the_query->the_post();

            $column = [
                'class' => sprintf('col-md-%d', $args['columns']),
            ];

            echo '<div ' . acf_esc_attr($column) . '>';

            if ($post_template) {
                include $post_template;
            } else {
                $this->renderPost();
            }

            echo '</div><!-- .col… -->';
        }

        wp_reset_postdata();

        echo '</div><!-- .row -->';

        echo '</div><!-- .post-grid -->';
    }

    public function renderPost()
    {
        ?>

        <article id="post-<?php the_ID(); ?>" <?php post_class('card mb-3'); ?>>

            <?php the_post_thumbnail('large', [ 'class' => 'card-img-top' ]); ?>

            <div class="card-body">

                <?php the_title('<h2 class="h5 card-title entry-title">', '</h2>'); ?>

                <?php if (get_the_excerpt()) : ?>
                <div class="card-text entry-summary">

                    <?php the_excerpt(); ?>

                </div><!-- .card-text -->

                <?php endif; ?>

                <p class="mb-0">
                    <a href="<?php the_permalink(); ?>" class="btn btn-primary stretched-link"><?php esc_html_e('Read More', 'my-blocks'); ?></a>
                </p>

            </div><!-- .card-body -->

        </article><!-- #post-<?php the_ID(); ?> -->

        <?php
    }
}
