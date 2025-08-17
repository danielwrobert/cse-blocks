<?php
/**
 * Plugin Name:       CSE Blocks
 * Description:       Example block from CSE Blocks course.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Daniel W. Robert
 * Update URI:        false
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       cse-blocks
 */

// This will cone in handy when registering accests, etc.
const CSE_BLOCKS_ROOT_DIR = __DIR__;

require_once __DIR__ . '/inc/blocks/related-posts.php';
require_once __DIR__ . '/inc/editor-customizations.php';
