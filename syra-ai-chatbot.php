<?php
/**
 * @package SyraAIChatbot
 * @version 1.5
 */
/* 
Plugin Name: Syra AI Chatbot
Plugin URI: https://syra.ai/ 
Description: Answer Your Customers Before They Ask Your Competitors 
Version: 1.5 
Author: ClouDhiti.ai 
Author URI: https://ClouDhiti.ai/ 
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html
*/
// namespace ai_chatbot;
if( !defined( 'ABSPATH' ) ) {
	define('ABSPATH', dirname(__FILE__) . '/');
}
require_once plugin_dir_path( __FILE__ ) . 'inc/activate.php';
register_activation_hook( __FILE__, array('SyraAIChatbotActivate','activate') );
require_once plugin_dir_path( __FILE__ ) . 'inc/deactivate.php';
register_deactivation_hook( __FILE__, array('SyraAIChatbotDeactivate','deactivate') );
require_once plugin_dir_path( __FILE__ ) . 'inc/uninstall.php';
register_uninstall_hook( __FILE__, array('SyraAIChatbotUninstall','uninstall') );

class SyraAIChatbot {
	function register(){
		add_action( 'admin_enqueue_scripts', array($this,'syra_ai_chatbot_scripts_styles') );
		add_action( 'init', array($this,'set_ai_chatbot_cookie') );
		add_action( 'admin_init', array($this,'wpse_remove_footer') );
		add_action( 'admin_menu',array($this,'addMenu'));
		add_action( 'plugin_action_links_' . plugin_basename( __FILE__ ), array($this,'plugin_links') );
		add_filter( 'clean_url', array($this,'add_syrScript_className'), 11, 1 );
		add_action( 'wp_enqueue_scripts', array($this,'publishUnpublishBot') );
	}
	function syra_ai_chatbot_scripts_styles(){
		if (get_current_screen()->base == 'toplevel_page_syraaichatbot_plugin' || get_current_screen()->base =='syra-ai-chatbot_page_syra-dashboard' || get_current_screen()->base == 'syra-ai-chatbot_page_syra-analytics' || get_current_screen()->base == 'syra-ai-chatbot_page_syra-goals' || get_current_screen()->base == 'syra-ai-chatbot_page_syra-customize' || get_current_screen()->base == 'syra-ai-chatbot_page_syra-training' || get_current_screen()->base == 'syra-ai-chatbot_page_syra-publish' || get_current_screen()->base == 'syra-ai-chatbot_page_syra-settings'){
			wp_enqueue_style( 'syra-ai-chatbot-google-fonts', 'https://fonts.googleapis.com/css?family=Poppins:300,300i,400,400i,500,500i,600,600i,700,700i|Roboto:300,300i,400,400i,500,500i,700,700i&display=swap', false, false, 'all' );
			wp_enqueue_style('syra-ai-chatbot-wizard-2-css', plugin_dir_url( __FILE__ ) . 'templates/css/pages/wizard/wizard-2.css', false, false, 'all');
			wp_enqueue_style('syra-ai-chatbot-plugins-bundle-css', plugin_dir_url( __FILE__ ) . 'templates/css/plugins.bundle.css', false, false, 'all');
			wp_enqueue_style('syra-ai-chatbot-style-bundle-css', plugin_dir_url( __FILE__ ) . 'templates/css/style.bundle.css', false, false, 'all');
			if ( sanitize_key($_GET['page']) === 'syra-analytics' || sanitize_key($_GET['page']) === 'syra-dashboard'  || sanitize_key($_GET['page']) === 'syraaichatbot_plugin') {
				wp_enqueue_style( 'syra-ai-chatbot-export-css', plugin_dir_url( __FILE__ ) .'templates/css/amcharts/export.css', false);
			}
			else if ( sanitize_key($_GET['page']) === 'syra-training' ) {
				wp_enqueue_style( 'syra-ai-chatbot-export-css', plugin_dir_url( __FILE__ ) .'templates/css/amcharts/export.css', false);
				wp_enqueue_style( 'syra-ai-chatbot-widget-css', 'https://assets.calendly.com/assets/external/widget.css', false);
			}
			wp_enqueue_script('jquery');
			wp_enqueue_script( 'mobile-headerjs', plugin_dir_url( __FILE__ ) . 'templates/js/custom/mobile-header.js');
	        wp_enqueue_script( 'headerjs', plugin_dir_url( __FILE__ ) . 'templates/js/custom/header.js');
	        wp_enqueue_script( 'side-paneljs', plugin_dir_url( __FILE__ ) . 'templates/js/custom/side-panel.js');
	        wp_enqueue_script( 'change-menubarjs', plugin_dir_url( __FILE__ ) . 'templates/js/custom/change-menubar.js');
	        wp_enqueue_script( 'cookie-detailsjs', plugin_dir_url( __FILE__ ) . 'templates/js/custom/cookie-details.js');
	        wp_enqueue_script( 'notificationjs', plugin_dir_url( __FILE__ ) . 'templates/js/custom/notification.js');
	        wp_enqueue_script( 'helpjs', plugin_dir_url( __FILE__ ) . 'templates/js/custom/help.js');
	        wp_enqueue_script( 'changeIpAddressjs', plugin_dir_url( __FILE__ ) . 'templates/js/custom/changeIpAddress.js');
	        wp_enqueue_script( 'syraScriptjs', plugin_dir_url( __FILE__ ) . 'templates/js/custom/syraScript.js', array( 'jquery' ), null, true);
	        wp_enqueue_script( 'sweetalert29js', plugin_dir_url( __FILE__ ) . 'templates/js/sweetalert2@9.js');
	        wp_enqueue_script( 'pluginsBundlejs', plugin_dir_url( __FILE__ ) . 'templates/js/plugins.bundle.js', array( 'jquery' ), null, true);
			wp_enqueue_script( 'scriptsBundlejs', plugin_dir_url( __FILE__ ) . 'templates/js/scripts.bundle.js', array( 'jquery' ), null, true);
			wp_enqueue_script( 'pixeelMainjs', plugin_dir_url( __FILE__ ) . 'templates/js/pixeel/main.js', array( 'jquery' ), null, true);
			
			if ( sanitize_key($_GET['page']) === 'syra-dashboard' ) {
				wp_enqueue_script( 'datetimejs', plugin_dir_url( __FILE__ ) . 'templates/js/custom/datetime.js' );
				wp_enqueue_script( 'pixeelDashboardjs', plugin_dir_url( __FILE__ ) . 'templates/js/pixeel/dashboard.js', array( 'jquery' ), null, true );
				wp_enqueue_script( 'amcharts-ammap', plugin_dir_url( __FILE__ ) . 'templates/js/amcharts/ammap.js', array( 'jquery' ), null, true);
				wp_enqueue_script( 'amcharts-usaLow', plugin_dir_url( __FILE__ ) . 'templates/js/amcharts/usaLow.js', array( 'jquery' ), null, true);
				wp_enqueue_script( 'amcharts-worldLow', plugin_dir_url( __FILE__ ) . 'templates/js/amcharts/worldLow.js', array( 'jquery' ), null, true);
				wp_enqueue_script( 'amcharts-worldHigh', plugin_dir_url( __FILE__ ) . 'templates/js/amcharts/worldHigh.js', array( 'jquery' ), null, true);
				wp_enqueue_script( 'amcharts-title', plugin_dir_url( __FILE__ ) . 'templates/js/amcharts/amcharts.js', array( 'jquery' ), null, true);
				wp_enqueue_script( 'amcharts-serial', plugin_dir_url( __FILE__ ) . 'templates/js/amcharts/serial.js', array( 'jquery' ), null, true);
				wp_enqueue_script( 'amcharts-pie', plugin_dir_url( __FILE__ ) . 'templates/js/amcharts/pie.js', array( 'jquery' ), null, true);
				wp_enqueue_script( 'amcharts-animate-min', plugin_dir_url( __FILE__ ) . 'templates/js/amcharts/animate.min.js', array( 'jquery' ), null, true);
				wp_enqueue_script( 'amcharts-export-min', plugin_dir_url( __FILE__ ) . 'templates/js/amcharts/export.min.js', array( 'jquery' ), null, true);
				wp_enqueue_script( 'amcharts-light', plugin_dir_url( __FILE__ ) . 'templates/js/amcharts/light.js', array( 'jquery' ), null, true);
			}
			else if ( sanitize_key($_GET['page']) === 'syra-goals' ) {
				wp_enqueue_script( 'datetimejs', plugin_dir_url( __FILE__ ) . 'templates/js/custom/datetime.js' );
				wp_enqueue_script( 'pixeelGoalsjs', plugin_dir_url( __FILE__ ) . 'templates/js/pixeel/goals.js', array( 'jquery' ), null, true );
				wp_enqueue_script( 'flotBundlejs', plugin_dir_url( __FILE__ ) . 'templates/js/flot.bundle.js', array( 'jquery' ), null, true);
			}
			else if(sanitize_key($_GET['page']) === 'syra-analytics'){
				wp_enqueue_script( 'pixeelAnalyticsjs', plugin_dir_url( __FILE__ ) . 'templates/js/pixeel/analytics.js', array( 'jquery' ), null, true);
				wp_enqueue_script( 'amcharts-ammap', plugin_dir_url( __FILE__ ) . 'templates/js/amcharts/ammap.js', array( 'jquery' ), null, true);
				wp_enqueue_script( 'amcharts-usaLow', plugin_dir_url( __FILE__ ) . 'templates/js/amcharts/usaLow.js', array( 'jquery' ), null, true);
				wp_enqueue_script( 'amcharts-worldLow', plugin_dir_url( __FILE__ ) . 'templates/js/amcharts/worldLow.js', array( 'jquery' ), null, true);
				wp_enqueue_script( 'amcharts-worldHigh', plugin_dir_url( __FILE__ ) . 'templates/js/amcharts/worldHigh.js', array( 'jquery' ), null, true);
				wp_enqueue_script( 'amcharts-title', plugin_dir_url( __FILE__ ) . 'templates/js/amcharts/amcharts.js', array( 'jquery' ), null, true);
				wp_enqueue_script( 'amcharts-serial', plugin_dir_url( __FILE__ ) . 'templates/js/amcharts/serial.js', array( 'jquery' ), null, true);
				wp_enqueue_script( 'amcharts-radar', plugin_dir_url( __FILE__ ) . 'templates/js/amcharts/radar.js', array( 'jquery' ), null, true);
				wp_enqueue_script( 'amcharts-pie', plugin_dir_url( __FILE__ ) . 'templates/js/amcharts/pie.js', array( 'jquery' ), null, true);
				wp_enqueue_script( 'amcharts-polarScatter-min', plugin_dir_url( __FILE__ ) . 'templates/js/amcharts/polarScatter.min.js', array( 'jquery' ), null, true);
				wp_enqueue_script( 'amcharts-animate-min', plugin_dir_url( __FILE__ ) . 'templates/js/amcharts/animate.min.js', array( 'jquery' ), null, true);
				wp_enqueue_script( 'amcharts-export-min', plugin_dir_url( __FILE__ ) . 'templates/js/amcharts/export.min.js', array( 'jquery' ), null, true);
				wp_enqueue_script( 'amcharts-light', plugin_dir_url( __FILE__ ) . 'templates/js/amcharts/light.js', array( 'jquery' ), null, true);
			}
			else if(sanitize_key($_GET['page']) === 'syra-customize'){
				wp_enqueue_script( 'flotBundlejs', plugin_dir_url( __FILE__ ) . 'templates/js/flot.bundle.js', array( 'jquery' ), null, true);
				wp_enqueue_script( 'syrajs', plugin_dir_url( __FILE__ ) . 'templates/projects/demo/syra.js#syraScript', array( 'jquery' ), null, true);
			}
			else if(sanitize_key($_GET['page']) === 'syra-settings'){
				wp_enqueue_script( 'flotBundlejs', plugin_dir_url( __FILE__ ) . 'templates/js/flot.bundle.js', array( 'jquery' ), null, true);
			}
			else if(sanitize_key($_GET['page']) === 'syra-publish'){
				wp_enqueue_script( 'flotBundlejs', plugin_dir_url( __FILE__ ) . 'templates/js/flot.bundle.js', array( 'jquery' ), null, true);
				wp_enqueue_script( 'pixeelPublishjs', plugin_dir_url( __FILE__ ) . 'templates/js/pixeel/publish.js', array( 'jquery' ), null, true );
			}
			else if(sanitize_key($_GET['page']) === 'syraaichatbot_plugin'){
				wp_enqueue_script( 'pixeelSetupWizzardNavigationjs', plugin_dir_url( __FILE__ ) . 'templates/js/pixeel/setup-wizard-tab-navigation.js', array( 'jquery' ), null, true);
				wp_enqueue_script( 'pixeelSetupWizzardjs', plugin_dir_url( __FILE__ ) . 'templates/js/pixeel/setup-wizzard.js', array( 'jquery' ), null, true);
				wp_enqueue_script( 'syraCustomizejs', plugin_dir_url( __FILE__ ) . 'templates/projects/demo/syraCustomize.js#syraScript', array( 'jquery' ), null, true);
				wp_enqueue_script( 'amcharts-title', plugin_dir_url( __FILE__ ) . 'templates/js/amcharts/amcharts.js', array( 'jquery' ), null, true);
				wp_enqueue_script( 'amcharts-serial', plugin_dir_url( __FILE__ ) . 'templates/js/amcharts/serial.js', array( 'jquery' ), null, true);
				wp_enqueue_script( 'amcharts-pie', plugin_dir_url( __FILE__ ) . 'templates/js/amcharts/pie.js', array( 'jquery' ), null, true);
				wp_enqueue_script( 'amcharts-animate-min', plugin_dir_url( __FILE__ ) . 'templates/js/amcharts/animate.min.js', array( 'jquery' ), null, true);
				wp_enqueue_script( 'amcharts-export-min', plugin_dir_url( __FILE__ ) . 'templates/js/amcharts/export.min.js', array( 'jquery' ), null, true);
				wp_enqueue_script( 'amcharts-light', plugin_dir_url( __FILE__ ) . 'templates/js/amcharts/light.js', array( 'jquery' ), null, true);
			}
	        else if(sanitize_key($_GET['page']) === 'syra-training'){
	        	wp_register_script( 'calendlyWidgetjs', 'https://assets.calendly.com/assets/external/widget.js', null, null, false );
				wp_enqueue_script( 'pixeelTrainingjs', plugin_dir_url( __FILE__ ) . 'templates/js/pixeel/training.js', array( 'jquery' ), null, true);
				wp_enqueue_script( 'amcharts-title', plugin_dir_url( __FILE__ ) . 'templates/js/amcharts/amcharts.js', array( 'jquery' ), null, true);
				wp_enqueue_script( 'amcharts-serial', plugin_dir_url( __FILE__ ) . 'templates/js/amcharts/serial.js', array( 'jquery' ), null, true);
				wp_enqueue_script( 'amcharts-pie', plugin_dir_url( __FILE__ ) . 'templates/js/amcharts/pie.js', array( 'jquery' ), null, true);
				wp_enqueue_script( 'amcharts-animate-min', plugin_dir_url( __FILE__ ) . 'templates/js/amcharts/animate.min.js', array( 'jquery' ), null, true);
				wp_enqueue_script( 'amcharts-export-min', plugin_dir_url( __FILE__ ) . 'templates/js/amcharts/export.min.js', array( 'jquery' ), null, true);
				wp_enqueue_script( 'amcharts-light', plugin_dir_url( __FILE__ ) . 'templates/js/amcharts/light.js', array( 'jquery' ), null, true);
			}	
		}
	}
	function wpse_remove_footer()
	{
	    add_filter( 'admin_footer_text',    '__return_false', 11 );
	    add_filter( 'update_footer',        '__return_false', 11 );
	}
	function addMenu()
	{
		add_menu_page('SyraAIChatbot','Syra AI Chatbot','manage_options','syraaichatbot_plugin',array($this,'admin_index'),plugin_dir_url( __FILE__ ) . 'assets/images/favicon.png',110);
		add_submenu_page('syraaichatbot_plugin', __('Setup Wizard', 'syra-menu'), __('Setup Wizard', 'syra-menu'), 'manage_options', 'syraaichatbot_plugin', array($this,'syraAiChatbotSetupWizard'), null, 9);
		// add_submenu_page('syraaichatbot_plugin', __('Dashboard', 'syra-menu'), __('Dashboard', 'syra-menu'), 'manage_options', 'syra-dashboard', array($this,'syraAiChatbotDashboard'), null, 9);
		add_submenu_page('syraaichatbot_plugin', __('Analytics', 'syra-menu'), __('Analytics', 'syra-menu'), 'manage_options', 'syra-analytics', array($this,'syraAiChatbotAnalytics'), null, 9);
		add_submenu_page('syraaichatbot_plugin', __('Goals', 'syra-menu'), __('Goals', 'syra-menu'), 'manage_options', 'syra-goals', array($this,'syraAiChatbotGoals'), null, 9);
		add_submenu_page('syraaichatbot_plugin', __('Customize', 'syra-menu'), __('Customize', 'syra-menu'), 'manage_options', 'syra-customize', array($this,'syraAiChatbotCustomize'), null, 9);
		add_submenu_page('syraaichatbot_plugin', __('Logs', 'syra-menu'), __('Training', 'syra-menu'), 'manage_options', 'syra-training', array($this,'syraAiChatbotTraining'), null, 9);
		add_submenu_page('syraaichatbot_plugin', __('Publish/Unpublish', 'syra-menu'), __('Publish/Unpublish', 'syra-menu'), 'manage_options', 'syra-publish', array($this,'syraAiChatbotPublishUnPublish'), null, 9);
		add_submenu_page('syraaichatbot_plugin', __('Settings', 'syra-menu'), __('Settings', 'syra-menu'), 'manage_options', 'syra-settings', array($this,'syraAiChatbotSettings'), null, 9);
	}
	function admin_index(){
		global $wpdb;
		$AI_Chatbot_tb_name = $wpdb->prefix . "syra_ai_chatbot_users"; 
		$results = $wpdb->get_results( "SELECT * FROM $AI_Chatbot_tb_name");
		if(!empty($results))
		{ 
			$registeredUser = sanitize_email($results[0]->user_email);
			if(!isset($_COOKIE['access_token'])) {
				$url = 'https://chatbots.syra.ai/syraconsumer/login';
				$response = wp_remote_post( $url, array(
					'method' => 'POST',
					'timeout' => 45,
					'redirection' => 5,
					'httpversion' => '1.0',
					'blocking' => true,
					'headers' => array(),
					'body' => array( 'email' => sanitize_email($results[0]->user_email), 'password' => sanitize_text_field($results[0]->user_password )),
					'cookies' => array()
					)
				);
				$json_body = json_decode($response['body'], TRUE);
				if($json_body["status"] == 200){

					set_transient( 'ai_chatbot_fname', $json_body["data"][0]["fName"], 2 * 3600 );
					set_transient( 'ai_chatbot_lname', $json_body["data"][0]["lName"], 2 * 3600 );
					set_transient( 'ai_chatbot_email', $json_body["data"][0]["email"], 2 * 3600 );
					set_transient( 'ai_chatbot_access_token', $json_body["access_token"], 2 * 3600 );
					set_transient( 'ai_chatbot_refresh_token', $json_body["refresh_token"], 2 * 3600 );
					require_once plugin_dir_path( __FILE__ ) . '/option.php';
				}
				else{
					require_once plugin_dir_path( __FILE__ ) . '/option.php';
				}
			}
			else{
				require_once plugin_dir_path( __FILE__ ) . 'templates/setup-wizard.php';
			}
		}
		else{
			$registeredUser = '';
			require_once plugin_dir_path( __FILE__ ) . '/option.php';
		}
	}
	function set_ai_chatbot_cookie(){
		$ai_chatbot_fname =  get_transient('ai_chatbot_fname');
		$ai_chatbot_lname = get_transient('ai_chatbot_lname');
		$ai_chatbot_email = get_transient('ai_chatbot_email');
		$ai_chatbot_access_token = get_transient('ai_chatbot_access_token');
		$ai_chatbot_refresh_token = get_transient('ai_chatbot_refresh_token');

		if($ai_chatbot_fname == ""){
			setcookie('fName', '', time()+7200);
		}
		else{
			setcookie('fName', $ai_chatbot_fname, time()+7200);
		}
		if($ai_chatbot_lname == ""){
			setcookie('lName', '', time()+7200);
		}
		else{
			setcookie('lName', $ai_chatbot_lname, time()+7200);
		}
		if($ai_chatbot_email == ""){
			setcookie('email', '', time()+7200);
		}
		else{
			setcookie('email', rawurldecode($ai_chatbot_email), time()+7200);
		}
		if($ai_chatbot_access_token == ""){
			setcookie('access_token', '', time()+7200);
			setcookie('CK_SESSION', '', time()+7200);
		}
		else{
			setcookie('access_token', $ai_chatbot_access_token, time()+7200);
			setcookie('CK_SESSION', time()+7200, time()+7200);
		}
		if($ai_chatbot_refresh_token == ""){
			setcookie('refresh_token', '', time()+7200);
		}
		else{
			setcookie('refresh_token', $ai_chatbot_refresh_token, time()+7200);
		}
		
	}
	function publishUnpublishBot()
	{
		$pubunpubStatus = get_transient("pubunpubStatus");
		$project_number = get_transient("syraBotNameTest");
		$project_url='https://chatbots.syra.ai/projects/'.$project_number.'/syra.js#syraScript';
		if (get_transient("pubunpubStatus") != ""){
			// echo $project_url;
			if ($pubunpubStatus == "unpublish") {
				wp_deregister_script( 'syraScript' );
				wp_dequeue_script( 'syraScript' );
			}
			if ($pubunpubStatus == "publish"){
				wp_register_script( 'syraScript',$project_url, array() );
				wp_enqueue_script( 'syraScript');
			}
		}
	}
	function add_syrScript_className($url)
	{
		if ( strpos( $url, '#syraScript') === false )
			return $url;
		else if ( is_admin() )
			return str_replace( '#syraScript', '', $url )."' class='syraScript";
		else
		return str_replace( '#syraScript', '', $url )."' class='syraScript"; 
	}
	function syraAiChatbotDashboard()
	{
		global $wpdb;
		$AI_Chatbot_tb_name = $wpdb->prefix . "syra_ai_chatbot_users"; 
		$results = $wpdb->get_results( "SELECT * FROM $AI_Chatbot_tb_name");
		if(!empty($results))
		{ 
			$registeredUser = sanitize_email($results[0]->user_email);
			if(!isset($_COOKIE['access_token'])) {
				$url = 'https://chatbots.syra.ai/syraconsumer/login';
				$response = wp_remote_post( $url, array(
					'method' => 'POST',
					'timeout' => 45,
					'redirection' => 5,
					'httpversion' => '1.0',
					'blocking' => true,
					'headers' => array(),
					'body' => array( 'email' => sanitize_email($results[0]->user_email), 'password' => sanitize_text_field($results[0]->user_password )),
					'cookies' => array()
					)
				);
				$json_body = json_decode($response['body'], TRUE);
				if($json_body["status"] == 200){

					set_transient( 'ai_chatbot_fname', $json_body["data"][0]["fName"], 2 * 3600 );
					set_transient( 'ai_chatbot_lname', $json_body["data"][0]["lName"], 2 * 3600 );
					set_transient( 'ai_chatbot_email', $json_body["data"][0]["email"], 2 * 3600 );
					set_transient( 'ai_chatbot_access_token', $json_body["access_token"], 2 * 3600 );
					set_transient( 'ai_chatbot_refresh_token', $json_body["refresh_token"], 2 * 3600 );
					require_once plugin_dir_path( __FILE__ ) . '/option.php';
				}
				else{
					require_once plugin_dir_path( __FILE__ ) . '/option.php';
				}
			}
			else{
				require_once plugin_dir_path( __FILE__ ) . 'templates/dashboard.php';
			}
			
		}
		else{
			$registeredUser = '';
			require_once plugin_dir_path( __FILE__ ) . '/option.php';
		}
	}
	function syraAiChatbotSetupWizard(){}
	function syraAiChatbotAnalytics()
	{
		global $wpdb;
		$AI_Chatbot_tb_name = $wpdb->prefix . "syra_ai_chatbot_users"; 
		$results = $wpdb->get_results( "SELECT * FROM $AI_Chatbot_tb_name");
		if(!empty($results))
		{ 
			$registeredUser = sanitize_email($results[0]->user_email);
			if(!isset($_COOKIE['access_token'])) {
				$url = 'https://chatbots.syra.ai/syraconsumer/login';
				$response = wp_remote_post( $url, array(
					'method' => 'POST',
					'timeout' => 45,
					'redirection' => 5,
					'httpversion' => '1.0',
					'blocking' => true,
					'headers' => array(),
					'body' => array( 'email' => sanitize_email($results[0]->user_email), 'password' => sanitize_text_field($results[0]->user_password )),
					'cookies' => array()
					)
				);
				$json_body = json_decode($response['body'], TRUE);
				if($json_body["status"] == 200){

					set_transient( 'ai_chatbot_fname', $json_body["data"][0]["fName"], 2 * 3600 );
					set_transient( 'ai_chatbot_lname', $json_body["data"][0]["lName"], 2 * 3600 );
					set_transient( 'ai_chatbot_email', $json_body["data"][0]["email"], 2 * 3600 );
					set_transient( 'ai_chatbot_access_token', $json_body["access_token"], 2 * 3600 );
					set_transient( 'ai_chatbot_refresh_token', $json_body["refresh_token"], 2 * 3600 );
					require_once plugin_dir_path( __FILE__ ) . '/option.php';
				}
				else{
					require_once plugin_dir_path( __FILE__ ) . '/option.php';
				}
			}
			else{
				require_once plugin_dir_path( __FILE__ ) . 'templates/analytics.php';
			}
		}
		else{
			$registeredUser = '';
			require_once plugin_dir_path( __FILE__ ) . '/option.php';
		}
	}
	function syraAiChatbotGoals()
	{
		global $wpdb;
		$AI_Chatbot_tb_name = $wpdb->prefix . "syra_ai_chatbot_users"; 
		$results = $wpdb->get_results( "SELECT * FROM $AI_Chatbot_tb_name");
		if(!empty($results))
		{ 
			$registeredUser = sanitize_email($results[0]->user_email);
			if(!isset($_COOKIE['access_token'])) {
				$url = 'https://chatbots.syra.ai/syraconsumer/login';
				$response = wp_remote_post( $url, array(
					'method' => 'POST',
					'timeout' => 45,
					'redirection' => 5,
					'httpversion' => '1.0',
					'blocking' => true,
					'headers' => array(),
					'body' => array( 'email' => sanitize_email($results[0]->user_email), 'password' => sanitize_text_field($results[0]->user_password )),
					'cookies' => array()
					)
				);
				$json_body = json_decode($response['body'], TRUE);
				if($json_body["status"] == 200){

					set_transient( 'ai_chatbot_fname', $json_body["data"][0]["fName"], 2 * 3600 );
					set_transient( 'ai_chatbot_lname', $json_body["data"][0]["lName"], 2 * 3600 );
					set_transient( 'ai_chatbot_email', $json_body["data"][0]["email"], 2 * 3600 );
					set_transient( 'ai_chatbot_access_token', $json_body["access_token"], 2 * 3600 );
					set_transient( 'ai_chatbot_refresh_token', $json_body["refresh_token"], 2 * 3600 );
					require_once plugin_dir_path( __FILE__ ) . '/option.php';
				}
				else{
					require_once plugin_dir_path( __FILE__ ) . '/option.php';
				}
			}
			else{
				require_once plugin_dir_path( __FILE__ ) . 'templates/goals.php';
			}		
		}
		else{
			$registeredUser = '';
			require_once plugin_dir_path( __FILE__ ) . '/option.php';
		}
	}
	function syraAiChatbotTraining()
	{
		global $wpdb;
		$AI_Chatbot_tb_name = $wpdb->prefix . "syra_ai_chatbot_users"; 
		$results = $wpdb->get_results( "SELECT * FROM $AI_Chatbot_tb_name");
		if(!empty($results))
		{ 
			$registeredUser = sanitize_email($results[0]->user_email);
			if(!isset($_COOKIE['access_token'])) {
				$url = 'https://chatbots.syra.ai/syraconsumer/login';
				$response = wp_remote_post( $url, array(
					'method' => 'POST',
					'timeout' => 45,
					'redirection' => 5,
					'httpversion' => '1.0',
					'blocking' => true,
					'headers' => array(),
					'body' => array( 'email' => sanitize_email($results[0]->user_email), 'password' => sanitize_text_field($results[0]->user_password )),
					'cookies' => array()
					)
				);
				$json_body = json_decode($response['body'], TRUE);
				if($json_body["status"] == 200){

					set_transient( 'ai_chatbot_fname', $json_body["data"][0]["fName"], 2 * 3600 );
					set_transient( 'ai_chatbot_lname', $json_body["data"][0]["lName"], 2 * 3600 );
					set_transient( 'ai_chatbot_email', $json_body["data"][0]["email"], 2 * 3600 );
					set_transient( 'ai_chatbot_access_token', $json_body["access_token"], 2 * 3600 );
					set_transient( 'ai_chatbot_refresh_token', $json_body["refresh_token"], 2 * 3600 );
					require_once plugin_dir_path( __FILE__ ) . '/option.php';
				}
				else{
					require_once plugin_dir_path( __FILE__ ) . '/option.php';
				}
			}
			else{
				require_once plugin_dir_path( __FILE__ ) . 'templates/training.php';
			}			
		}
		else{
			$registeredUser = '';
			require_once plugin_dir_path( __FILE__ ) . '/option.php';
		}
	}
	function syraAiChatbotCustomize()
	{
		global $wpdb;
		$AI_Chatbot_tb_name = $wpdb->prefix . "syra_ai_chatbot_users"; 
		$results = $wpdb->get_results( "SELECT * FROM $AI_Chatbot_tb_name");
		if(!empty($results))
		{ 
			$registeredUser = sanitize_email($results[0]->user_email);
			if(!isset($_COOKIE['access_token'])) {
				$url = 'https://chatbots.syra.ai/syraconsumer/login';
				$response = wp_remote_post( $url, array(
					'method' => 'POST',
					'timeout' => 45,
					'redirection' => 5,
					'httpversion' => '1.0',
					'blocking' => true,
					'headers' => array(),
					'body' => array( 'email' => sanitize_email($results[0]->user_email), 'password' => sanitize_text_field($results[0]->user_password )),
					'cookies' => array()
					)
				);
				$json_body = json_decode($response['body'], TRUE);
				if($json_body["status"] == 200){

					set_transient( 'ai_chatbot_fname', $json_body["data"][0]["fName"], 2 * 3600 );
					set_transient( 'ai_chatbot_lname', $json_body["data"][0]["lName"], 2 * 3600 );
					set_transient( 'ai_chatbot_email', $json_body["data"][0]["email"], 2 * 3600 );
					set_transient( 'ai_chatbot_access_token', $json_body["access_token"], 2 * 3600 );
					set_transient( 'ai_chatbot_refresh_token', $json_body["refresh_token"], 2 * 3600 );
					require_once plugin_dir_path( __FILE__ ) . '/option.php';
				}
				else{
					require_once plugin_dir_path( __FILE__ ) . '/option.php';
				}
			}
			else{
				require_once plugin_dir_path( __FILE__ ) . 'templates/customize.php';
			}		
		}
		else{
			$registeredUser = '';
			require_once plugin_dir_path( __FILE__ ) . '/option.php';
		}
	}
	function syraAiChatbotSettings()
	{
		global $wpdb;
		$AI_Chatbot_tb_name = $wpdb->prefix . "syra_ai_chatbot_users"; 
		$results = $wpdb->get_results( "SELECT * FROM $AI_Chatbot_tb_name");
		if(!empty($results))
		{ 
			$registeredUser = sanitize_email($results[0]->user_email);
			if(!isset($_COOKIE['access_token'])) {
				$url = 'https://chatbots.syra.ai/syraconsumer/login';
				$response = wp_remote_post( $url, array(
					'method' => 'POST',
					'timeout' => 45,
					'redirection' => 5,
					'httpversion' => '1.0',
					'blocking' => true,
					'headers' => array(),
					'body' => array( 'email' => sanitize_email($results[0]->user_email), 'password' => sanitize_text_field($results[0]->user_password )),
					'cookies' => array()
					)
				);
				$json_body = json_decode($response['body'], TRUE);
				if($json_body["status"] == 200){

					set_transient( 'ai_chatbot_fname', $json_body["data"][0]["fName"], 2 * 3600 );
					set_transient( 'ai_chatbot_lname', $json_body["data"][0]["lName"], 2 * 3600 );
					set_transient( 'ai_chatbot_email', $json_body["data"][0]["email"], 2 * 3600 );
					set_transient( 'ai_chatbot_access_token', $json_body["access_token"], 2 * 3600 );
					set_transient( 'ai_chatbot_refresh_token', $json_body["refresh_token"], 2 * 3600 );
					require_once plugin_dir_path( __FILE__ ) . '/option.php';
				}
				else{
					require_once plugin_dir_path( __FILE__ ) . '/option.php';
				}
			}
			else{
				require_once plugin_dir_path( __FILE__ ) . 'templates/settings.php';
			}		
		}
		else{
			$registeredUser = '';
			require_once plugin_dir_path( __FILE__ ) . '/option.php';
		}
	}
	function syraAiChatbotPublishUnPublish()
	{
		global $wpdb;
		$AI_Chatbot_tb_name = $wpdb->prefix . "syra_ai_chatbot_users"; 
		$results = $wpdb->get_results( "SELECT * FROM $AI_Chatbot_tb_name");
		if(!empty($results))
		{ 
			$registeredUser = sanitize_email($results[0]->user_email);
			if(!isset($_COOKIE['access_token'])) {
				$url = 'https://chatbots.syra.ai/syraconsumer/login';
				$response = wp_remote_post( $url, array(
					'method' => 'POST',
					'timeout' => 45,
					'redirection' => 5,
					'httpversion' => '1.0',
					'blocking' => true,
					'headers' => array(),
					'body' => array( 'email' => sanitize_email($results[0]->user_email), 'password' => sanitize_text_field($results[0]->user_password )),
					'cookies' => array()
					)
				);
				$json_body = json_decode($response['body'], TRUE);
				if($json_body["status"] == 200){

					set_transient( 'ai_chatbot_fname', $json_body["data"][0]["fName"], 2 * 3600 );
					set_transient( 'ai_chatbot_lname', $json_body["data"][0]["lName"], 2 * 3600 );
					set_transient( 'ai_chatbot_email', $json_body["data"][0]["email"], 2 * 3600 );
					set_transient( 'ai_chatbot_access_token', $json_body["access_token"], 2 * 3600 );
					set_transient( 'ai_chatbot_refresh_token', $json_body["refresh_token"], 2 * 3600 );
					require_once plugin_dir_path( __FILE__ ) . '/option.php';
				}
				else{
					require_once plugin_dir_path( __FILE__ ) . '/option.php';
				}
			}
			else{
				require_once plugin_dir_path( __FILE__ ) . 'templates/publish.php';
				add_filter('admin_footer_text', array($this,'syraFetchBot'));
				add_filter('admin_footer_text', array($this,'syraFetchBotStatus'));
			}		
		}
		else{
			$registeredUser = '';
			require_once plugin_dir_path( __FILE__ ) . '/option.php';
		}
		
	}
	function plugin_links( $links ) {
		$url = get_admin_url() . "admin.php?page=syra-settings";
	    $settings_link = '<a href="' . $url . '">' . __('Settings', 'textdomain') . '</a>';
	      $links[] = $settings_link;
	    return $links;
    }
	function syraFetchBot()
	{
		if (!empty( $_COOKIE['email'])){
			$syra_ai_chabot_user_emailid = sanitize_email($_COOKIE['email']);
			$fetchBotDeplomentURL = 'https://chatbots.syra.ai/syraconsumer/fetch-botDeploment-forWordpress';
			$response = wp_remote_post( $fetchBotDeplomentURL, array(
				'method' => 'POST',
				'timeout' => 45,
				'redirection' => 5,
				'httpversion' => '1.0',
				'blocking' => true,
				'headers' => array(),
				'body' => array( 'customerId' => sanitize_email($syra_ai_chabot_user_emailid) ),
				'cookies' => array()
				)
			);
			if ( is_wp_error( $response ) ) {
				$error_message = $response->get_error_message();
			}
			else{
				$json_body = json_decode($response['body']);
				if ($json_body != ""){
					$project_id = $json_body[0]->id;
					$syraBotNameTest = $json_body[0]->domainId_id."_".$json_body[0]->uuid;
					set_transient( "projectId", $project_id );
					set_transient( "syraBotNameTest", $syraBotNameTest );
				}
			}
		}	
	}
	function syraFetchBotStatus()
	{
		$botdeploymentId = get_transient( "projectId");
		if($botdeploymentId != ""){
			$fetchBotDeplomentURL = 'https://chatbots.syra.ai/syraconsumer/get-wordpress-publish-unpublish-track';
			$response = wp_remote_post( $fetchBotDeplomentURL, array(
				'method' => 'POST',
				'timeout' => 45,
				'redirection' => 5,
				'httpversion' => '1.0',
				'blocking' => true,
				'headers' => array(),
				'body' => array( 'botdeploymentId' => sanitize_key($botdeploymentId) ),
				'cookies' => array()
				)
			);
			if ( is_wp_error( $response ) ) {
				$error_message = $response->get_error_message();
			}
			else{
				$json_body = json_decode($response['body']);
				if ($json_body != ""){
					if($json_body[0]->status == "200" && $json_body[0]->published == 'y'){
						set_transient( "pubunpubStatus", "publish");
					}
				}
			}
		}
	}
}

if(class_exists('SyraAIChatbot')){
	$syraaichatbot=new SyraAIChatbot();
	$syraaichatbot->register();
}

?>