<?php

/**
* @package SyraAIChatbot
* Trigger this file on plugin uninstall
**/

class SyraAIChatbotUninstall {

	static function uninstall(){
        if (!defined('WP_UNINSTALL_PLUGIN')) {
            die;
        }
         
        // $option_name = 'wporg_option';
         
        // delete_option($option_name);
         
        // for site options in Multisite
        // delete_site_option($option_name);
         
        // drop a custom database table
        global $wpdb;
        $wpdb->query("DROP TABLE IF EXISTS {$wpdb->prefix}syra_ai_chatbot_users");
		
	}
}