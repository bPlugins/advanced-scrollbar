<?php
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
			$nonce = sanitize_text_field( $_POST['_wpnonce'] ?? null );
			
			if( !wp_verify_nonce( $nonce, "wp_rest" ) ){
				wp_send_json_error( 'Invalid Request' );
			}
			
			$js_data = json_decode( wp_kses_stripslashes( sanitize_text_field( $_POST['asb-advanced-scrollbar-thirds'] ?? null ) ), true );

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
