<?php

function cse_blocks_register_related_posts_block() {
	register_block_type( CSE_BLOCKS_ROOT_DIR . '/build/related-posts/', [
		'render_callback' => 'cse_blocks_render_related_posts_block'
	] );
}
add_action( 'init', 'cse_blocks_register_related_posts_block' );

function cse_blocks_render_related_posts_block( $attributes ) {
	$posts = new WP_Query( [
		'post_type' => 'post',
		'posts_per_page' => $attributes['pagesToShow'],
	] );

	if ( ! $posts->have_posts() ) {
		return '';
	}

	ob_start();
	?>
	<div <?php echo get_block_wrapper_attributes(); ?>>
		<h2 class="wp-block-cse-blocks-related-posts">Related Posts</h2>
		<ul>
			<?php foreach ( $posts->posts as $post ) : ?>
				<li><?php echo esc_html( get_the_title( $post ) ); ?></li>
			<?php endforeach; ?>
		</ul>
	</div>
	<?php

	return ob_get_clean();
}
