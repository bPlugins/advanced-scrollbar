<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'CASBScrollBarEnqueueScripts' ) ) {
	class CASBScrollBarEnqueueScripts {
		public function __construct() {
      add_action("wp_enqueue_scripts", [$this,"enqueueScrollbarScript"]);
			add_action('admin_enqueue_scripts', [ $this, 'adminEnqueueScripts' ] );
      add_action('enqueue_block_editor_assets', [$this, 'enqueueScrollbarScriptEditor']);
      add_action("enqueue_block_assets",array( $this, 'enqueueBlockAssets'));
		}
      function enqueueScrollbarScriptEditor(){
          wp_enqueue_script('casb-adv-scrollbar-cursor-settings', CASB_DIR_URL . '/build/settings.js', array('wp-compose','wp-data','wp-editor','wp-plugins','wp-components','wp-i18n','react','react-dom'), CASB_VERSION, true);

          wp_enqueue_style("casb-adv-scrollbar-cursor-settings", CASB_DIR_URL . '/build/settings.css', array(), CASB_VERSION);
        }

        function enqueueScrollbarScript(){
          wp_enqueue_script('casb-nicescroll-js', CASB_DIR_URL . 'assets/js/jquery.nicescroll.min.js', array('jquery'), CASB_VERSION, false);
          wp_enqueue_style( 'casb-scrollbar-style', CASB_DIR_URL . 'build/scrollbar.css', array(), CASB_VERSION, false );

          wp_enqueue_script( 'casb-scrollbar-script', CASB_DIR_URL . 'build/scrollbar.js', array('react','react-dom','jquery'), CASB_VERSION, true );
        }
        public function adminEnqueueScripts($hook){

          if( str_contains( $hook, 'advanced-scrollbar' ) ){

            wp_enqueue_script( 'advanced-scrollbar-admin-script', CASB_DIR_URL . 'build/admin.js', [ 'react', 'react-dom',  'wp-components', 'wp-i18n', 'wp-api', 'wp-util' ,'lodash', 'wp-media-utils' ,'wp-data','wp-core-data','wp-api-request','wp-element','wp-edit-post','wp-block-editor' ], CASB_VERSION, true );

            //free styles
            wp_enqueue_media();
            wp_enqueue_style( 'advanced-scrollbar-admin-style', CASB_DIR_URL . 'build/admin.css', ['wp-components','wp-edit-blocks','wp-block-editor'], CASB_VERSION );

            wp_localize_script( 'advanced-scrollbar-admin-script', 'casbAdvScrollbarCursorConfig', array(
              'ajax_url' => admin_url( 'admin-ajax.php' ),
              'nonce'    => wp_create_nonce('casb_scrollbar_nc'),
              'dirUrl'   => CASB_DIR_URL
            ));

          }
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
  }
	new CASBScrollBarEnqueueScripts();
}