<?php

/**
* @package SyraAIChatbot
* Trigger this file on plugin deactivation
**/

class SyraAIChatbotDeactivate {

	static function deactivate(){

		delete_transient('ai_chatbot_fname');
		delete_transient( 'ai_chatbot_lname');
		delete_transient( 'ai_chatbot_email');
		delete_transient( 'ai_chatbot_access_token');
        delete_transient( 'ai_chatbot_refresh_token');
        delete_transient( "projectId" );
        delete_transient( "syraBotNameTest");
        delete_transient( "pubunpubStatus");
        delete_transient( 'ai_chatbot_password_set');
		flush_rewrite_rules();
	}
}