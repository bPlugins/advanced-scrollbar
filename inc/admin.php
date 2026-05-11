<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if( !class_exists('CSBAdmin') ){
    class CSBAdmin{
        function __construct(){
			add_action( 'admin_menu', [$this, 'adminMenu'] );
            add_filter( 'plugin_action_links_' . CSB_PLUGIN_BASENAME, [$this, 'adv_scrollbar_add_custom_action_links'] );
		}
	
		function adminMenu() {
			$menuIcon = '<svg version="1.1" id="svg2334" xml:space="preserve" width="682.66669" height="682.66669" viewBox="0 0 682.66669 682.66669" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"><defs id="defs2338"><clipPath clipPathUnits="userSpaceOnUse" id="clipPath2348"><path d="M 0,512 H 512 V 0 H 0 Z" id="path2346" /></clipPath></defs><g id="g2340" transform="matrix(1.3333333,0,0,-1.3333333,0,682.66667)"><g id="g2342"><g id="g2344" clip-path="url(#clipPath2348)"><g id="g2350" transform="translate(396,321)"><path d="M 0,0 H -57.53 C -76.76,24.36 -106.55,40 -140,40 -173.45,40 -203.24,24.36 -222.47,0 H -280 l 140,181 z" style="fill:none;stroke:#ffffff;stroke-width:20;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1" id="path2352" /></g><g id="g2354" transform="translate(116,191)"><path d="M 0,0 140,-181 280,0 H 222.47 C 203.24,-24.36 173.45,-40 140,-40 106.55,-40 76.76,-24.36 57.53,0 Z" style="fill:none;stroke:#ffffff;stroke-width:20;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:290, 45, 0, 45, 1000;stroke-dashoffset:0;stroke-opacity:1" id="path2356" /></g><g id="g2358" transform="translate(321,256)"><path d="m 0,0 c 0,-35.899 -29.102,-65 -65,-65 -35.899,0 -65,29.101 -65,65 0,35.898 29.101,65 65,65 C -29.102,65 0,35.898 0,0 Z" style="fill:none;stroke:#ffffff;stroke-width:20;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1" id="path2360" /></g><g id="g2362" transform="translate(260,231.5)"><path d="M 0,0 C 10.71,1.63 18.8,9.83 20.5,20.5" style="fill:none;stroke:#ffffff;stroke-width:20;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1" id="path2364" /></g><g id="g2366" transform="translate(231.5,260)"><path d="M 0,0 C 1.63,10.71 9.83,18.8 20.5,20.5" style="fill:none;stroke:#ffffff;stroke-width:20;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1"   id="path2368" /></g></g></g></g></svg>';
	
            add_options_page(
                __( 'Advanced Scrollbar Settings', 'advanced-scrollbar' ), // Page title
                __( 'Advanced Scrollbar Settings', 'advanced-scrollbar' ), // Menu title
                'manage_options',        // Capability
                'advanced-scrollbar',    // Menu slug
                [$this, 'dashboardPage'] // Callback
            );
		}

		function dashboardPage(){ ?>
			<div id='csbScrollbarDashboard' data-info=<?php echo esc_attr( wp_json_encode([
                'version' => CSB_VERSION,
                "dirUrl" => CSB_DIR_URL,
                "nonce" => wp_create_nonce("adv_scrollbar_nc"),
                "ajaxUrl" => admin_url('admin-ajax.php')
				]) ); ?>></div>
			<?php   
        }

        function adv_scrollbar_add_custom_action_links($links){
            $settings_link = '<a href="' . admin_url( 'admin.php?page=advanced-scrollbar/#settings' ) . '">' . __( 'Settings', 'advanced-scrollbar' ) . '</a>';
            array_unshift( $links, $settings_link );
            return $links;
        }


    }
    new CSBAdmin;
}