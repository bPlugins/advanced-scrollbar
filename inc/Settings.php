<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if( !class_exists('CSBScrollBarSettings') ){
	class CSBScrollBarSettings{
		public function __construct(){
			add_action( 'wp_ajax_csbScrollbarOptions', [$this, 'bPlSettingsOptions'] );
			add_action( 'admin_enqueue_scripts', [$this, 'adminEnqueueScripts'] );
		}

		function adminEnqueueScripts( $hook ){
				wp_enqueue_media();
				wp_enqueue_editor();
		}

		function bPlSettingsOptions(){
			$nonce = isset( $_POST['_wpnonce'] ) ? sanitize_text_field( wp_unslash( $_POST['_wpnonce'] ) ) : '';
			
			if( !wp_verify_nonce( $nonce, "adv_scrollbar_nc" ) ){
				wp_send_json_error( 'Invalid Request' );
			}
			
			if ( !current_user_can( 'manage_options' ) ) {
				wp_send_json_error( 'Unauthorized Access' );
			}

			$js_data = json_decode( wp_kses_stripslashes( sanitize_text_field( wp_unslash($_POST['asb-advanced-scrollbar-thirds']) ) ), true );

			$db_data = get_option('asb-advanced-scrollbar-thirds', [] );
			if( !$js_data && $db_data ){
				wp_send_json_success($db_data);
			}

			if($js_data){
				update_option( 'asb-advanced-scrollbar-thirds', $js_data );
			}

			wp_send_json_success( $js_data );
		}
}
	new CSBScrollBarSettings();
}
