<?php

function cse_blocks_register_related_posts_block() {
	register_block_type( CSE_BLOCKS_ROOT_DIR . '/build/related-posts/', [
		'render_callback' => 'cse_blocks_render_related_posts_block'
	] );
}
add_action( 'init', 'cse_blocks_register_related_posts_block' );

function cse_blocks_render_related_posts_block( $attributes ) {
	$current_post = get_queried_object();
	$is_editor = defined( 'REST_REQUEST' ) && REST_REQUEST;

	if ( $is_editor ) {
		$post_id = null;

		// Check if we have a post ID in the request
		if ( isset( $_GET['post'] ) ) {
			$post_id = intval( $_GET['post'] );
		} elseif ( isset( $_GET['post_id'] ) ) {
			$post_id = intval( $_GET['post_id'] );
		} elseif ( isset( $_POST['post_ID'] ) ) {
			$post_id = intval( $_POST['post_ID'] );
		}

		// If we found a post ID, get the post object
		if ( $post_id ) {
			$current_post = get_post( $post_id );
		}
	}

	// Get current post categories
	$current_categories = wp_get_post_categories( $current_post->ID );

	// If no categories, return early with an appropriate message
	if ( empty( $current_categories ) ) {
		if ( $is_editor ) {
			return '<div ' . get_block_wrapper_attributes() . '><p>No related posts found (post has no categories). Add categories to this post to see related content.</p></div>';
		}
		return '<div ' . get_block_wrapper_attributes() . '><p>No related posts found.</p></div>';
	}

	// Build query arguments
	$query_args = [
		'post_type'      => 'post',
		'posts_per_page' => $attributes['postsToShow'] ?? 3,
		'category__in'   => $current_categories,
		'post__not_in'   => [ $current_post->ID ], // Exclude current post
		'orderby'        => 'date',
		'order'          => 'DESC',
		'post_status'    => 'publish',
	];

	$posts = new WP_Query( $query_args );


	if ( ! $posts->have_posts() ) {
		return '<div ' . get_block_wrapper_attributes() . '><p>No related posts found.</p></div>';
	}

	ob_start();

	?>
	<div <?php echo get_block_wrapper_attributes(); ?>>
		<?php
		// Only render the heading on the frontend, not in the editor
		if ( ! $is_editor ) : ?>
			<h2><?php echo esc_html( $attributes['headingText'] ?? 'Related Posts' ); ?></h2>
		<?php endif; ?>
		<div class="related-posts-grid">
			<?php foreach ( $posts->posts as $post ) : ?>
				<article class="related-post">
					<h3><a href="<?php echo esc_url( get_permalink( $post ) ); ?>"><?php echo esc_html( get_the_title( $post ) ); ?></a></h3>
					<?php if ( has_excerpt( $post ) ) : ?>
						<p><?php echo esc_html( get_the_excerpt( $post ) ); ?></p>
					<?php endif; ?>
				</article>
			<?php endforeach; ?>
		</div>
	</div>
	<?php

	return ob_get_clean();
}
