<?php
/*
 * Plugin Name: Advanced Scrollbar
 * Author URI: http://bplugins.com
 * Description: Customize scrollbar of your website with unlimited styling and color using the plugin. 
 * Version: 1.1.11
 * Author: bPlugins
 * License: GPLv3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain: advanced-scrollbar
 * @fs_premium_only /build/premium, /inc/LicenseActivation.php, /img
 */

// ABS PATH
if (!defined('ABSPATH')) {
	exit;
}

if ( function_exists( 'asb_fs' ) ) {
    asb_fs()->set_basename( true, __FILE__ );
} else {
        define('CSB_VERSION', isset( $_SERVER['HTTP_HOST'] ) && 'localhost' === $_SERVER['HTTP_HOST'] ? time() : '1.1.11' );
        define('CSB_DIR_URL', plugin_dir_url(__FILE__));
        define('CSB_DIR_PATH', plugin_dir_path(__FILE__));
        define('CSB_PLUGIN_BASENAME', plugin_basename( __FILE__ ));
    if ( ! function_exists( 'asb_fs' ) ) {

    function asb_fs() {
        global $asb_fs;

        if ( ! isset( $asb_fs ) ) {

            require_once dirname(__FILE__) . '/vendor/freemius/start.php';

            $asb_fs = fs_dynamic_init( array(
                'id'                  => '14870',
                'slug'                => 'advanced-scrollbar',
                'premium_slug'        => 'advanced-scrollbar-pro',
                'type'                => 'plugin',
                'public_key'          => 'pk_419d245dc8547a274d192990c096a',
                'is_premium'          => false,
                'premium_suffix'      => 'Pro',
                'has_premium_version' => true,
                'has_addons'          => false,
                'has_paid_plans'      => true,
                // 'trial'               => array(
                //     'days'               => 7,
                //     'is_require_payment' => false
                // ),
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

        return $asb_fs;
    }

    asb_fs();
    do_action( 'asb_fs_loaded' );
}

if (!class_exists("CSB_Scrollbar")) {
    class CSB_Scrollbar {

        function __construct() {
            add_action('wp_footer',[$this,"csbFooter"]);
        }

        function csbFooter(){
            $csb_data = get_option('asb-advanced-scrollbar-thirds');
            $csb_data = json_encode($csb_data);
            echo '<div id="csbScrollbar" data-scrollbar="'. esc_attr( $csb_data ) .'"></div>';
        }
    }
    new CSB_Scrollbar();
}

/*-------------------------------------------------------------------------------*/
/*   Include all require file
/*-------------------------------------------------------------------------------*/
require_once "inc/EnqueueScripts.php";
require_once "inc/Settings.php";
require_once "inc/cursor.php";
require_once "inc/admin.php";
require_once "inc/EnqueueScripts.php";
}