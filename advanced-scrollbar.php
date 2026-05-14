<?php
/*
 * Plugin Name: Advanced Scrollbar – Custom Scrollbar Styling and Behavior
 * Author URI: http://bplugins.com
 * Description: Customize scrollbar of your website with unlimited styling and color using the plugin. 
 * Version: 1.1.12
 * Author: bPlugins
 * License: GPLv3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain: advanced-scrollbar
 */

// ABS PATH
if (!defined('ABSPATH')) {
	exit;
}

if ( function_exists( 'casb_fs' ) ) {
    casb_fs()->set_basename( true, __FILE__ );
} else {

        define('CASB_VERSION', defined('WP_DEBUG') && WP_DEBUG? time() : '1.1.12' );
        define('CASB_DIR_URL', plugin_dir_url(__FILE__));
        define('CASB_DIR_PATH', plugin_dir_path(__FILE__));
        define('CASB_PLUGIN_BASENAME', plugin_basename( __FILE__ ));
    if ( ! function_exists( 'casb_fs' ) ) {

    function casb_fs() {
        global $casb_fs;

        if ( ! isset( $casb_fs ) ) {

            require_once dirname(__FILE__) . '/vendor/freemius/wordpress-sdk/start.php';

            $casb_fs = fs_dynamic_init( array(
                'id'                  => '14870',
                'slug'                => 'advanced-scrollbar',
                'premium_slug'        => 'advanced-scrollbar-pro',
                'type'                => 'plugin',
                'public_key'          => 'pk_419d245dc8547a274d192990c096a',
                'is_premium'          => false,
                'has_addons'          => false,
                'menu'                => array(
                    'slug'           => 'advanced-scrollbar',
                    'contact'        => false,
                    'support'        => false,
                    'parent'         => array(
                        'slug' => 'options-general.php'
                    )
                )
            ) );
        }

        return $casb_fs;
    }

    casb_fs();
    do_action( 'casb_fs_loaded' );
}

if (!class_exists("CASB_Scrollbar")) {
    class CASB_Scrollbar {

        function __construct() {
            add_action('wp_footer',[$this,"casbFooter"]);
        }

        function casbFooter(){
            $casb_data = get_option('asb-advanced-scrollbar-thirds');
            $casb_data = json_encode($casb_data);
            echo '<div id="casbScrollbar" data-scrollbar="'. esc_attr( $casb_data ) .'"></div>';
        }
    }
    new CASB_Scrollbar();
}

/*-------------------------------------------------------------------------------*/
/*   Include all require file
/*-------------------------------------------------------------------------------*/
require_once "inc/EnqueueScripts.php";
require_once "inc/Settings.php";
require_once "inc/cursor.php";
require_once "inc/admin.php";
}