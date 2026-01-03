<?php

function cse_blocks_register_animated_hero_block() {
	register_block_type( CSE_BLOCKS_ROOT_DIR . '/build/animated-hero-block/' );
}
add_action( 'init', 'cse_blocks_register_animated_hero_block' );
