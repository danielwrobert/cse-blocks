<?php

/**
 * Register block categories
 */
function cse_blocks_register_block_category( $block_categories ) {
	$categories = array(
		'slug' => 'cse-blocks',
		'title' => 'CSE Blocks',
	);
	return array_merge( array( $categories ), $block_categories );
}
add_filter( 'block_categories_all', 'cse_blocks_register_block_category' );

// NOTE: If we want to insert the category at a specific index, we can use array_merge(), as follows:
// function cse_blocks_register_block_category( $block_categories ) {
// 	foreach ( $block_categories as $index => $category ) {
// 		if ( $category['slug'] === 'text' ) {
// 			array_splice(
// 				$block_categories,
// 				$index + 1,
// 				0,
// 				[
// 					[
// 						'slug' => 'cse-blocks',
// 						'title' => 'CSE Blocks',
// 					]
// 				]
// 			);

// 			break;
// 		}
// 	}

//    return $block_categories;
// }
// add_filter( 'block_categories_all', 'cse_blocks_register_block_category' );
