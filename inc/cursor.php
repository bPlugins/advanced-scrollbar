<?php
// ABS PATH
if (!defined('ABSPATH')) {
	exit;
}


if( !class_exists( 'CASBAdvScrollbarCursor' ) ){
	class CASBAdvScrollbarCursor{
		function __construct(){
			add_action( 'init', [ $this, 'registerPostMeta' ] );
			add_action( 'the_content', [ $this, 'theContent' ] );
			add_action("enqueue_block_assets",array( $this, 'enqueueBlockAssets'));
			add_action("enqueue_block_editor_assets",array( $this, 'enqueueBlockEditorAssets' ));
			add_action('wp_ajax_casb_adv_scrollbar_cursor_data_settings', [$this, 'casb_adv_scrollbar_cursor_data_settings']);
			add_action('wp_ajax_casb_get_adv_scrollbar_cursor_data_settings', [$this, 'casb_get_adv_scrollbar_cursor_data_settings']);
			add_action('wp_ajax_nopriv_casb_get_adv_scrollbar_cursor_data_settings', [$this, 'casb_get_adv_scrollbar_cursor_data_settings']);
		}

		function registerPostMeta(){
			register_post_meta( '', 'csbAdvScrollBarCursor', [
				'show_in_rest' => true,
				'single' => true,
				'type' => 'string',
				'sanitize_callback' => 'sanitize_text_field',
			] );
		}

		function theContent( $content ){
			$id = get_the_ID();
			$postMeta = get_post_meta( $id, 'csbAdvScrollBarCursor', true );

			if( !$postMeta ){
				return $content;
			}

			return $content . '<div id="casbAdvScrollBarCursor" data-cursor="'. esc_attr( $postMeta ) .'"></div>';
		}

		public function casb_adv_scrollbar_cursor_data_settings(){

			if ( !isset( $_POST['nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['nonce'] ) ), 'casb_scrollbar_nc' ) ) {
				wp_send_json_error( 'invalid request' );
			}

			if (!current_user_can( 'manage_options' ) ) {
						wp_send_json_error( 'Unauthorized Access' );
				}
			$data = json_decode(sanitize_text_field( wp_unslash($_POST['csbAvScrData'] ?? '') ), true);

			if(!$data){
				$data = get_option('csb_adv_scrollbar_cursor_settings', []);
				wp_send_json_success($data);
			}

			update_option('csb_adv_scrollbar_cursor_settings', $data);
			
			wp_send_json_success($data);

		}

		public function casb_get_adv_scrollbar_cursor_data_settings(){
			if ( ! isset( $_POST['nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['nonce'] ) ), 'casb_scrollbar_nc' ) ) {
				wp_send_json_error('invalid request');
			}

			$data = get_option('csb_adv_scrollbar_cursor_settings', []);
			wp_send_json_success($data);
			

		}

		public function enqueueBlockAssets() {

			wp_enqueue_script( 'casb-adv-scrollbar-cursor', CASB_DIR_URL . '/build/cursor.js', array('react', 'react-dom', 'wp-util'), CASB_VERSION, true);
			wp_enqueue_style( 'casb-adv-scrollbar-cursor', CASB_DIR_URL . '/build/cursor.css', array(), CASB_VERSION);

			wp_localize_script( 'casb-adv-scrollbar-cursor', 'casbAdvScrollbarCursorConfig', array(
				'ajax_url' => admin_url( 'admin-ajax.php' ),
				'nonce' => wp_create_nonce('casb_scrollbar_nc'),
				'dirUrl' => CASB_DIR_URL
			));
		}
		

		function enqueueBlockEditorAssets(){
			wp_enqueue_script('casb-adv-scrollbar-cursor-settings', CASB_DIR_URL . '/build/settings.js', array('wp-compose','wp-data','wp-editor','wp-plugins','wp-components','wp-i18n','react','react-dom'), CASB_VERSION, true);
			wp_enqueue_style("casb-adv-scrollbar-cursor-settings", CASB_DIR_URL . '/build/settings.css', array(), CASB_VERSION);
		}

	}
	new CASBAdvScrollbarCursor();	
}