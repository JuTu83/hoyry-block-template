<?php
/*
Plugin Name: Höyry: Block template
Description: A template for building Höyry blocks.
Author: Digi- ja mainostoimisto Höyry
Author URI: https://hoyry.net
Plugin URI: https://hoyry.net
Text Domain: hoyry-block-template
Domain Path: /languages
License: GPLv2 or later
Copyright: Digi- ja mainostoimisto Höyry
Version: 0.1.0
*/

namespace Hoyry\Plugin;

if( !defined( 'ABSPATH' ) ) die( '(ಠ_ಠ)' );

class BlockTemplate {

	public function __construct() {
		add_action( 'init', [ $this, 'load_textdomain' ], 0 );
		add_action( 'init', [ $this, 'register_block' ] );
		add_filter( 'block_categories_all', [ $this, 'register_block_category' ] );
	}

	/**
	 * Load text domain
	 */
	public function load_textdomain() {
		load_plugin_textdomain( 'hoyry-block-template', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );
	}

	/**
	 * Register blocks
	 */
	public function register_block() {

		$args = array(
			'title' => __( 'Höyry: Block template', 'hoyry-block-template' ),
			'description' => __( 'A template block.', 'hoyry-block-template' ),
		);
		$block = register_block_type( plugin_dir_path( __FILE__ ) . 'build/blocks/block-template', $args );
		if( $block && isset( $block->editor_script_handles[0] ) ) {
			wp_set_script_translations( $block->editor_script_handles[0], 'hoyry-block-template', plugin_dir_path( __FILE__ ) . 'languages' );
		}

		$args = array(
			'title' => __( 'Item', 'hoyry-block-template' ),
			'description' => __( 'Add an item.', 'hoyry-block-template' ),
			'render_callback' => [ $this, 'render_item_block' ],
		);
		$block = register_block_type( plugin_dir_path( __FILE__ ) . 'build/blocks/block-template-item', $args );
		if( $block && isset( $block->editor_script_handles[0] ) ) {
			wp_set_script_translations( $block->editor_script_handles[0], 'hoyry-block-template', plugin_dir_path( __FILE__ ) . 'languages' );
		}

	}

	/**
	 * Register block category
	 */
	public function register_block_category( $categories ) {

		foreach( $categories as $category ) {
			if( isset( $category['slug'] ) && 'hoyry' === $category['slug'] ) return $categories;
		}

		$hoyry_category = array(
			'slug'  => 'hoyry',
			'title' => 'Höyry',
		);

		array_splice( $categories, 3, 0, array( $hoyry_category ) );
		return $categories;

	}

	/**
	 * Render item block
	 *
	 * @param array $attributes 	Block attributes.
	 * @param string $content 		Block content.
	 * @return string 				Rendered block HTML
	 */
	public function render_item_block( $attributes, $content ) {
		ob_start();
		?>
		<div <?php echo wp_kses_data( get_block_wrapper_attributes( array( 'class' => 'hoyry-block-template-item' ) ) ); ?>>
			<?php if( isset( $attributes['mediaId'] ) && $attributes['mediaId'] > 0 ) { ?>
				<figure class="hoyry-block-template-item-media">
					<?php
					echo wp_get_attachment_image(
						$attributes['mediaId'],
						'full',
						false,
						array(
							'class' => 'hoyry-block-template-item-media-image',
						)
					);
					?>
				</figure>
			<?php } ?>
			<div class="hoyry-block-template-item-content">
				<?php echo wp_kses_post( $content ); ?>
			</div>
		</div>
		<?php
		return ob_get_clean();
	}

}

require_once plugin_dir_path( __FILE__ ) . 'inc/blocks/blockstyle-block-template.php';

add_action( 'after_setup_theme', fn() => new BlockTemplate() );
add_action( 'after_setup_theme', fn() => new \Hoyry\Plugin\BlockStylesManager\BlockstyleBlockTemplate() );
