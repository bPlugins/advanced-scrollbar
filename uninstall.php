<?php
/**
 * Uninstall handler for Advanced Scrollbar plugin.
 *
 * Fired when the plugin is deleted (uninstalled) from the WordPress admin.
 * Only removes data if the user has explicitly enabled the "Delete Data on Uninstall" option.
 *
 * @package AdvancedScrollbar
 */

// Exit if not called by WordPress uninstall process.
if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	exit;
}

// Check if the user opted in to delete data on uninstall.
$casb_delete_data = get_option( 'casb_delete_data_on_uninstall', false );


if ( !$casb_delete_data ) {
	return;
}

// ─── 1. Delete plugin options ───────────────────────────────────────────────

// Scrollbar settings option.
delete_option( 'asb-advanced-scrollbar-thirds' );

// Cursor/click effect settings option.
delete_option( 'csb_adv_scrollbar_cursor_settings' );

// The uninstall preference option itself.
delete_option( 'casb_delete_data_on_uninstall' );


// ─── 2. Delete post meta from all posts ─────────────────────────────────────

// Remove the cursor effect post meta from every post that has it.
delete_post_meta_by_key( 'csbAdvScrollBarCursor' );


// ─── 3. Clean up any Freemius data (if Freemius handles its own cleanup) ────

// Freemius SDK typically handles its own uninstall cleanup,
// but if there are leftover transients or options, remove them here.
// The Freemius SDK uninstall is handled by its own hooks, so we don't
// need to manually clean those up.
