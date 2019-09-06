<?php
/**
 * Hero Image block.
 *
 * @package MY\Blocks
 */

namespace MY\Blocks\BlockTypes;

class HeroImage extends Base
{
    public function __construct()
    {
        parent::__construct('hero-image', __('Hero image'), [
            'description' => __('Displays a hero image.'),
        ]);
    }

    /**
     * Render.
     *
     * @uses acf_esc_attr_e()
     *
     * @param array      $block      The block settings and attributes.
     * @param string     $content    The block inner HTML (empty).
     * @param bool       $is_preview True during AJAX preview.
     * @param int|string $post_id    The post ID this block is saved to.
     */
    public function render($block, $content = '', $is_preview = false, $post_id = 0)
    {
        /**
         * Block attributes.
         *
         * @var string title
         * @var string text
         * @var int    image
         */
        $attributes = get_fields();

        /**
         * Wrapper HTML attributes
         */

        $wrapper = [];

        $wrapper['class'] = 'wp-block-' . str_replace('/', '-', $block['name']);

        if (! empty($block['align'])) {
            $wrapper['class'] .= " align{$block['align']}";
        }

        if (! empty($block['className'])) {
            $wrapper['class'] .= " {$block['className']}";
        }

        if (! empty($block['anchor'])) {
            $wrapper['id'] = $block['anchor'];
        }

        /**
         * Jumbotron HTML attributes
         */

        $jumbotron = [
            'class' => 'hero-image jumbotron jumbotron-fluid',
        ];

        if ($attributes['image'] && 'attachment' == get_post_type($attributes['image'])) {
            list($image_url) = wp_get_attachment_image_src($attributes['image'], 'large');

            $jumbotron['style'] = sprintf('background-image:url(%s);', esc_url($image_url));
        }

        /**
         * Output.
         */

        ?>

        <div <?php acf_esc_attr_e($wrapper) ?>>

            <div <?php acf_esc_attr_e($jumbotron) ?>>

                <div class="container">

                    <div class="row">

                        <div class="col-md-9 col-lg-7">

                            <?php if ($attributes['title']) : ?>
                            <h1 class="display-4"><?php echo esc_html($attributes['title']); ?></h1>
                            <?php endif; ?>

                            <?php if ($attributes['text']) : ?>
                            <div class="lead">
                                <?php echo $attributes['text']; ?>
                            </div>
                            <?php endif; ?>

                        </div><!-- .col-… -->

                    </div><!-- .row -->

                </div><!-- .container -->

            </div><!-- .jumbotron -->

        </div><!-- .wp-block-acf-… -->

        <?php
    }
}
