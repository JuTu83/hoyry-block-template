<?php

namespace Hoyry\Plugin\BlockStylesManager;

class BlockstyleBlockTemplate {

	function __construct() {
		if( !function_exists( 'is_plugin_active' ) ) {
			include_once( ABSPATH . 'wp-admin/includes/plugin.php' );
		}
		if( is_plugin_active( 'hoyry-block-template/hoyry-block-template.php' ) ) {
			add_action( 'init', [ $this, 'register_block' ] );
		}
	}

	/**
	 * Register block
	 */
	public function register_block() {
		$args = array(
			'title' => __( 'Höyry: Block Template', 'hoyry-block-template' ),
			'description' => __( 'Create a style for the Höyry block template block.', 'hoyry-block-template' ),
		);
		register_block_type( dirname( __FILE__, 3 ) . '/build/blocks/blockstyle-block-template', $args );
	}

}
