<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'CSBScrollBarEnqueueScripts' ) ) {
	class CSBScrollBarEnqueueScripts {
		public function __construct() {
      add_action("wp_enqueue_scripts", [$this,"enqueueScrollbarScript"]);
			add_action( 'admin_enqueue_scripts', [ $this, 'adminEnqueueScripts' ] );
      add_action('enqueue_block_editor_assets', [$this, 'enqueueScrollbarScriptEditor']);
      add_action("enqueue_block_assets",array( $this, 'enqueueBlockAssets'));
		}
      function enqueueScrollbarScriptEditor(){
          wp_enqueue_script('csb-adv-scrollbar-cursor-settings', CSB_DIR_URL . '/build/settings.js', array('wp-compose','wp-data','wp-editor','wp-plugins','wp-components','wp-i18n','react','react-dom'), CSB_VERSION, true);

          wp_enqueue_style("csb-adv-scrollbar-cursor-settings", CSB_DIR_URL . '/build/settings.css', array(), CSB_VERSION);
        }

        function enqueueScrollbarScript(){
          wp_enqueue_script('csb-nicescroll-js', CSB_DIR_URL . 'assets/js/jquery.nicescroll.min.js', array('jquery'), CSB_VERSION, false);
          wp_enqueue_style( 'csb-scrollbar-style', CSB_DIR_URL . 'build/scrollbar.css', array(), CSB_VERSION, false );

          wp_enqueue_script( 'csb-scrollbar-script', CSB_DIR_URL . 'build/scrollbar.js', array('react','react-dom','jquery'), CSB_VERSION, true );
        }
        public function adminEnqueueScripts($hook){

          if( str_contains( $hook, 'advanced-scrollbar' ) ){

            wp_enqueue_script( 'advanced-scrollbar-admin-script', CSB_DIR_URL . 'build/admin.js', [ 'react', 'react-dom',  'wp-components', 'wp-i18n', 'wp-api', 'wp-util' ,'lodash', 'wp-media-utils' ,'wp-data','wp-core-data','wp-api-request','wp-element','wp-edit-post','wp-block-editor' ], CSB_VERSION, true );

            //free styles
            wp_enqueue_media();
            wp_enqueue_style( 'advanced-scrollbar-admin-style', CSB_DIR_URL . 'build/admin.css', ['wp-components','wp-edit-blocks','wp-block-editor'], CSB_VERSION );

            wp_localize_script( 'advanced-scrollbar-admin-script', 'csbAdvScrollbarCursorConfig', array(
              'ajax_url' => admin_url( 'admin-ajax.php' ),
              'nonce'    => wp_create_nonce('adv_scrollbar_nc'),
              'dirUrl'   => CSB_DIR_URL
            ));

          }
        }

        public function enqueueBlockAssets() {

          wp_enqueue_script( 'csb-adv-scrollbar-cursor', CSB_DIR_URL . '/build/cursor.js', array('react', 'react-dom', 'wp-util'), CSB_VERSION, true);
          wp_enqueue_style( 'csb-adv-scrollbar-cursor', CSB_DIR_URL . '/build/cursor.css', array(), CSB_VERSION);

          wp_localize_script( 'csb-adv-scrollbar-cursor', 'csbAdvScrollbarCursorConfig', array(
            'ajax_url' => admin_url( 'admin-ajax.php' ),
            'nonce' => wp_create_nonce('adv_scrollbar_nc'),
            'dirUrl' => CSB_DIR_URL
          ));
        }
  }
	new CSBScrollBarEnqueueScripts();
}