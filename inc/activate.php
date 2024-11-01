<?php

/**
* @package SyraAIChatbot
* Trigger this file on plugin activation
**/

class SyraAIChatbotActivate {
	static function activate(){
		global $wpdb;
		$AI_Chatbot_tb_name = $wpdb->prefix . "syra_ai_chatbot_users";

		$AI_Chatbot_query = "CREATE TABLE IF NOT EXISTS`". $AI_Chatbot_tb_name . "`(	user_email varchar(100) DEFAULT '', user_password varchar(100) DEFAULT '' )";

		require_once(ABSPATH . "/wp-admin/includes/upgrade.php");
		dbDelta($AI_Chatbot_query);
		flush_rewrite_rules();
	}
}