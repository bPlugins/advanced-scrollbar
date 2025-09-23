<?php
/*
 * Plugin Name: Advanced scrollbar
 * Author URI: http://bplugins.com
 * Description: Customize scrollbar of your website with unlimited styling and color using the plugin. 
 * Version: 1.1.8
 * Author: bPlugins
 * License: GPLv3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain: advanced-scrollbar
 */

/*-------------------------------------------------------------------------------*/
/*   Rendering all javaScript
/*-------------------------------------------------------------------------------*/

if ( function_exists( 'asb_fs' ) ) {
    asb_fs()->set_basename( true, __FILE__ );
    // asb_fs()->add_settings_page();
} else {

        define('CSB_VERSION', isset( $_SERVER['HTTP_HOST'] ) && 'localhost' === $_SERVER['HTTP_HOST'] ? time() : '1.1.8' );
        define('CSB_DIR_URL', plugin_dir_url(__FILE__));
        define('CSB_DIR_PATH', plugin_dir_path(__FILE__));
        define('CSB_HAS_FREE', 'advanced-scrollbar/plugin.php' === plugin_basename(__FILE__));
        define('CSB_HAS_PRO', 'advanced-scrollbar-pro/plugin.php' === plugin_basename(__FILE__));
    if ( ! function_exists( 'asb_fs' ) ) {

    function asb_fs() {
        global $asb_fs;

        if ( ! isset( $asb_fs ) ) {

            require_once dirname(__FILE__) . '/freemius/start.php';

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
                'trial'               => array(
                    'days'               => 7,
                    'is_require_payment' => false
                ),
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


function asbIsPremium(){
	return asb_fs()->is__premium_only() && asb_fs()->can_use_premium_code();
}


if (!class_exists("CSB_Scrollbar")) {
    class CSB_Scrollbar {

        function __construct() {
            add_action("wp_enqueue_scripts", [$this,"enqueueScrollbarScript"]);
            add_action('wp_footer',[$this,"csbFooter"]);
            add_action('wp_head', [$this,"isPremium"]);
            add_action('admin_head', [$this,"isPremium"]);
            // add_action('edit_attachment_head"', [$this,"isPremium"]);
        }

        function csbFooter(){
            $csb_data = get_option('asb-advanced-scrollbar-thirds');
            $csb_data = json_encode($csb_data);
            echo '<div id="csbScrollbar" data-scrollbar="'. esc_attr( $csb_data ) .'"></div>';
        }

        function enqueueScrollbarScript(){
            wp_enqueue_script('csb-nicescroll-js', CSB_DIR_URL . 'assets/js/jquery.nicescroll.min.js', array('jquery'), CSB_VERSION, false);
            wp_enqueue_style( 'csb-scrollbar-style', CSB_DIR_URL . 'build/scrollbar.css', array(), CSB_VERSION );
            wp_enqueue_script( 'csb-scrollbar-script', CSB_DIR_URL . 'build/scrollbar.js', array('react','react-dom','jquery'), CSB_VERSION, true );
        }

        function isPremium () {
            ?>
            <script type="text/javascript">
                const csbIsPremium = <?php echo json_encode(asbIsPremium()); ?>;
            </script>
            <?php
        }
    }
    new CSB_Scrollbar();
}

/*-------------------------------------------------------------------------------*/
/*   Include all require file
/*-------------------------------------------------------------------------------*/
require_once "inc/Settings.php";
require_once "inc/import.php";
require_once "inc/cursor.php";
require_once "inc/admin.php";
}