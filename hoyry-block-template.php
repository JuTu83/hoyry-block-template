<?php
/**
 * Plugin Name:       Höyry: Block template
 * Description:       This is a collection of awesome media blocks.
 * Requires at least: 6.0
 * Requires PHP:      7.4
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       hoyry-block-template
 *
 * @package           hoyrymoottori-blocks
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_hoyry_block_template_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_hoyry_block_template_block_init' );
