<?php

/**
* @package SyraAIChatbot
* Trigger this file on plugin activation
**/

if(array_key_exists('publishBotBtn',$_POST)){
	$syraBotDeploymentId = sanitize_text_field($_POST["publishBotBtn"]);
	$createPunUnpubTrackURL = 'https://chatbots.syra.ai/syraconsumer/create-wordpress-publish-unpublish-track';
	$response = wp_remote_post( $createPunUnpubTrackURL, array(
		'method' => 'POST',
		'timeout' => 45,
		'redirection' => 5,
		'httpversion' => '1.0',
		'blocking' => true,
		'headers' => array(),
		'body' => array( 'botdeploymentId' => sanitize_text_field($syraBotDeploymentId), 'published' => 'y' ),
		'cookies' => array()
		)
	);
	set_transient( "pubunpubStatus", "publish");
}
if(array_key_exists('unpublishBotBtn',$_POST)){
	$syraBotDeploymentId = sanitize_text_field($_POST["unpublishBotBtn"]);
	set_transient( "pubunpubStatus", "unpublish");
	$createPunUnpubTrackURL = 'https://chatbots.syra.ai/syraconsumer/create-wordpress-publish-unpublish-track';
	$response = wp_remote_post( $createPunUnpubTrackURL, array(
		'method' => 'POST',
		'timeout' => 45,
		'redirection' => 5,
		'httpversion' => '1.0',
		'blocking' => true,
		'headers' => array(),
		'body' => array( 'botdeploymentId' => sanitize_text_field($syraBotDeploymentId), 'published' => 'n' ),
		'cookies' => array()
		)
	);
}

?>
<!DOCTYPE html>

<!--
Template Name: Metronic - Responsive Admin Dashboard Template build with Twitter Bootstrap 4 & Angular 8
Author: KeenThemes
Website: http://www.keenthemes.com/
Contact: support@keenthemes.com
Follow: www.twitter.com/keenthemes
Dribbble: www.dribbble.com/keenthemes
Like: www.facebook.com/keenthemes
Purchase: http://themeforest.net/item/metronic-responsive-admin-dashboard-template/4021469?ref=keenthemes
Renew Support: http://themeforest.net/item/metronic-responsive-admin-dashboard-template/4021469?ref=keenthemes
License: You must have a valid license purchased only from themeforest(the above link) in order to legally use the theme for your project.
-->
<html lang="en">
	
	<!-- begin::Head -->
	<head>
		<base href="">
		<meta charset="utf-8" />
		<title>Syra | Publish</title>
		<meta name="description" content="Latest updates and statistic charts">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		
		<script>
			var publishChatbotButtonFlag = false;
			jQuery(document).ready(function(){
				includeMobileHeader();
				includeSidePanel();
				var userDetails_Data = extractUserDetaisFromCookie();
				includeHeader(userDetails_Data["username"]);
				populateHelpTable();
				populateNotificationTable(userDetails_Data["email"], userDetails_Data["access_token"]);
				jQuery('#userEmail').val(userDetails_Data["email"]);
				fetchUserDetails();
				fetchBot("publishPage");

			});
		</script>
	</head>
	
	<!-- end::Head -->
	
	<!-- begin::Body -->
	<body style="background-image: url(<?php echo plugin_dir_url( __FILE__ ) . 'images/bg-1.jpg'?>)" class="kt-quick-panel--right kt-demo-panel--right kt-offcanvas-panel--right kt-subheader--enabled kt-subheader--transparent kt-page--loading">
		
		<!-- begin:: Page -->
		
		<!-- begin:: Header Mobile -->
		<div id="kt_header_mobile" class="kt-header-mobile"></div>
		
		<!-- end:: Header Mobile -->
		<div class="kt-grid kt-grid--hor kt-grid--root">
			<div class="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--ver kt-page">
				<div class="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor kt-wrapper" id="kt_wrapper">
					
					<!-- begin:: Header -->
					<div id="kt_header" class="kt-header kt-grid__item"></div>
					<!-- end:: Header -->

					<div class="kt-container kt-container--fluid kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor kt-grid--stretch py-5">
						<!-- begin: Header Menu -->
						<div class="kt-header-menu-wrapper" id="kt_top_menu_wrapper">
							<div class="kt-header-menu kt-header-menu-mobile" id="kt_top_menu">
								<ul class="kt-menu__nav" role="tablist">
									<li class="kt-menu__item kt-menu__item--here">
										<a href="#" class="kt-menu__link kt-menu__toggle" data-toggle="tab" data-target="#kt_tabs_top_publish_embed_in_various_channels">
											<span class="kt-menu__link-text">Publish in Various Channels</span>
										</a>
									</li>
								</ul>
							</div>
						</div>
						
						<!-- end: Header Menu -->
						
						<div class="kt-body kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor kt-grid--stretch" id="kt_body">
							<button class="kt-header-mobile__toolbar-toggler" id="kt_top_mobile_toggler">
								<span></span>
							</button>
							
							<div class="kt-content kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor" id="kt_content">
								
								<!-- begin:: Content -->
								<div class="kt-container kt-container--fluid kt-grid__item kt-grid__item--fluid py-5">
									<div class="tab-content">										
										<div class="tab-pane active" id="kt_tabs_top_publish_embed_in_various_channels" role="tabpanel">
											<div class="kt-grid kt-wizard-v2" id="kt_wizard_publish_embed_in_various_channels" data-ktwizard-state="step-first">
												<div class="kt-grid__item kt-wizard-v2__aside">
													<!--begin: Form Wizard Nav -->
													<div class="kt-wizard-v2__nav">
														<div class="kt-wizard-v2__nav-items kt-wizard-v2__nav-items--clickable">
															<div class="kt-wizard-v2__nav-item" data-ktwizard-type="step" data-ktwizard-state="current">
																<div class="kt-wizard-v2__nav-body">
																	<div class="kt-wizard-v2__nav-icon">
																		<i class="fa fa-globe"></i>
																	</div>
																	<div class="kt-wizard-v2__nav-label">
																		<div class="kt-wizard-v2__nav-label-title">Website</div>
																		<div class="kt-wizard-v2__nav-label-desc"></div>
																	</div>
																</div>
															</div>
															<div class="kt-wizard-v2__nav-item" data-ktwizard-type="step" onclick="getExistingFBEmbedding()">
																<div class="kt-wizard-v2__nav-body">
																	<div class="kt-wizard-v2__nav-icon">
																		<i class="fab fa-facebook-square"></i>
																	</div>
																	<div class="kt-wizard-v2__nav-label">
																		<div class="kt-wizard-v2__nav-label-title">Facebook</div>
																		<div class="kt-wizard-v2__nav-label-desc"></div>
																	</div>
																</div>
															</div>
															<div class="kt-wizard-v2__nav-item" data-ktwizard-type="step" onclick="getExistingSlackEmbedding()">
																<div class="kt-wizard-v2__nav-body">
																	<div class="kt-wizard-v2__nav-icon">
																		<i class="fab fa-slack"></i>
																	</div>
																	<div class="kt-wizard-v2__nav-label">
																		<div class="kt-wizard-v2__nav-label-title">Slack</div>
																		<div class="kt-wizard-v2__nav-label-desc"></div>
																	</div>
																</div>
															</div>
															<div class="kt-wizard-v2__nav-item" data-ktwizard-type="step">
																<div class="kt-wizard-v2__nav-body">
																	<div class="kt-wizard-v2__nav-icon">
																		<i class="fab fa-skype"></i>
																	</div>
																	<div class="kt-wizard-v2__nav-label">
																		<div class="kt-wizard-v2__nav-label-title">Skype</div>
																		<div class="kt-wizard-v2__nav-label-desc"></div>
																	</div>
																</div>
															</div>
															<div class="kt-wizard-v2__nav-item" data-ktwizard-type="step">
																<div class="kt-wizard-v2__nav-body">
																	<div class="kt-wizard-v2__nav-icon">
																		<i class="fab fa-app-store-ios"></i>
																	</div>
																	<div class="kt-wizard-v2__nav-label">
																		<div class="kt-wizard-v2__nav-label-title">Mobile Chatbot App</div>
																		<div class="kt-wizard-v2__nav-label-desc"></div>
																	</div>
																</div>
															</div>
															
															<div class="kt-separator kt-separator--border-dashed kt-separator--space-md"></div>
															
															<a class="kt-wizard-v2__nav-item" href="https://chatbots.syra.ai/apis/" target="_blank">
																<div class="kt-wizard-v2__nav-body">
																	<div class="kt-wizard-v2__nav-icon">
																		<i class="la la-code-fork"></i>
																	</div>
																	<div class="kt-wizard-v2__nav-label">
																		<div class="kt-wizard-v2__nav-label-title">Build Your Own</div>
																		<div class="kt-wizard-v2__nav-label-desc"></div>
																	</div>
																</div>
															</a>
														</div>
													</div>
													
													<!--end: Form Wizard Nav -->
												</div>
												
												<div class="kt-grid__item kt-grid__item--fluid kt-wizard-v2__wrapper">
													<!--begin: Form Wizard Form-->
													<div class="kt-form" id="kt_form_publish_embed_in_various_channels">
														
														<!--begin: Form Wizard Content to embed chatbot on website-->
														<div class="kt-wizard-v2__content pb-0" data-ktwizard-type="step-content" data-ktwizard-state="current">
															
															<div class="row" style="margin-top: 7%;">
																<div class="col-12" id="publishChatbotButton" style="display: none; padding-top: 25px;">
																	<form method="post" action="admin.php?page=syra-publish">
																	<button type="submit" class="btn dropbtn userActivityLog" name="publishBotBtn" id="publishBotBtn" style="  background-color: #472235; 
																		border: none;
																		color: white;
																		/*padding: 20px 80px;*/
																		text-align: center;
																		text-decoration: none;
																		display: inline-block;
																		font-size: 16px;
																		padding-right: 8px;
																		border-radius: 7px;">
																	<img src="<?php echo plugin_dir_url( __FILE__ ) . 'images/publish_logo.png'?>" alt="" style="height: 35px;"> Publish Chatbot to your Store </button>
																</form>
																</div>
																<div class="col-12" id="unpublishChatbotButton" style="display: none; padding-top: 25px;">
																	<form method="post" action="admin.php?page=syra-publish&status=unpublish">
											                        <button type="submit" class="btn dropbtn userActivityLog" name="unpublishBotBtn" id="unpublishBotBtn" style="  background-color: #472235; 
											                        border: none;
											                        color: white;
											                        /*padding: 20px 80px;*/
											                        text-align: center;
											                        text-decoration: none;
											                        display: inline-block;
											                        font-size: 16px;
											                        padding-right: 8px;
											                        border-radius: 7px;">
											                            <img src="<?php echo plugin_dir_url( __FILE__ ) . 'images/publish_logo.png'?>" alt="" style="height: 35px;"> Unpublish Chatbot from your Store 
											                        </button>
											                    </form>
										                    	</div>
															</div>

															<div class="row" style="margin-top: 10%;">
																<div class="col-lg-6">
																	<div class="form-group" id="projectArea">
																		<label>Chatbot name</label>
																		<input type="text" id="chatBotName" class="form-control" value="" readonly>
																	</div>
																</div>
																<div class="col-lg-6">
																	<div class="form-group">
																		<label>Created on</label>
																		<input type="text" id="chatbotCreated" class="form-control" value="" readonly>
																	</div>
																</div>
																<div class="col-12">
																	<div class="form-group mb-0">
																		<label>You can also manually publish the Syra AI Chatbot in your Store by copying this code below:</label>
																		<div class="input-group">
																			<input type="text" class="form-control font-weight-bold" id="kt_clipboard_publish_copy_script" value='' readonly>
																			<div class="input-group-append">
																				<a href="javascript:;" class="btn btn-secondary" data-clipboard="true" data-clipboard-target="#kt_clipboard_publish_copy_script">
																					<i class="la la-copy"></i>
																				</a>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
															<div class="kt-separator kt-separator--border-dashed kt-separator--space-lg"></div>
															<div class="row">
																<div class="col-lg-12">
																	<span style="font-weight: bold;">Our world-class support team is always ready to help :</span>
																</div>
															</div>
															<div class="row" style="margin-top: 2%;">
																<div class="col-lg-3">
																	<button type="button" class="btn btn-label-brand btn-label btn-md btn-tall btn-wide kt-font-bold kt-font-transform-u userActivityLog" onclick="openSupportPage()">Support Channel</button>
																</div>
																<div class="col-lg-3">
																	<a type="button" target="_top" style="margin-left: 21%;" class="btn btn-label-brand btn-label btn-md btn-tall btn-wide kt-font-bold kt-font-transform-u userActivityLog" href="mailto:results@cloudhiti.ai">Email</a>
																</div>
																<div class="col-lg-3">
																	<button type="button" class="btn btn-label-brand btn-label btn-md btn-tall btn-wide kt-font-bold kt-font-transform-u userActivityLog" disabled>Live Chat</button>
																</div>
															</div>
														</div>
														<!--end: Form Wizard Content to embed chatbot on website-->
														
														<!--begin: Form Wizard Content to embed chatbot on facebook-->
														<div class="kt-wizard-v2__content pb-0" data-ktwizard-type="step-content">
															
															<div class="row">
																<div class="col-lg-6">
																	<label>Existing Facebook Embedding Pages</label>
																</div>
															</div>
															<div id="embedFBList" style="margin-top: 2%;"></div>

															<div class="row">
																<div class="col-lg-6">
																	<div class="form-group">
																		<label>Page Access Token</label>
																		<input id="fbPageAccessToken" type="text" class="form-control">
																	</div>
																</div>
																<div class="col-lg-6">
																	<div class="form-group">
																		<label>Page ID</label>
																		<input id="pageId" type="text" class="form-control">
																	</div>
																</div>
																<div class="col-12 text-right">
																	<a class="kt-link kt-font-bold" href="https://syra-ai.zendesk.com/hc/en-us/articles/360036935612-How-To-Install-Syra-Chatbot-On-Facebook-Messenger" target="_blank">How do I embed in Facebook?</a>
																</div>
															</div>
															
															<div class="kt-separator kt-separator--border-dashed kt-separator--space-lg"></div>
															
															<div class="row">
																<label id="facebookEmbedMsg"></label>
																<div class="col-auto ml-auto">
																	<button class="btn btn-warning btn-tall btn-wide kt-font-bold kt-font-transform-u" type="button" onclick="facebookEmbedAPIcall()">Update</button>
																</div>
															</div>
														</div>
														<!--end: Form Wizard Content to embed chatbot on facebook-->
														
														<!--begin: Form Wizard Content to embed chatbot on slack-->
														<div class="kt-wizard-v2__content pb-0" data-ktwizard-type="step-content">
															
															<div class="row">
																<div class="col-lg-6">
																	<label>Existing Slack Embedding Pages</label>
																</div>
															</div>
															<div id="embedSlackList" style="margin-top: 2%;"></div>

															<div class="row">
																<div class="col-lg-6">
																	<div class="form-group">
																		<label>Bot User OAuth access token</label>
																		<input type="text" class="form-control" id="botAccessToken">
																	</div>
																</div>
																<div class="col-lg-6">
																	<div class="form-group">
																		<label>Display Name</label>
																		<input type="text" class="form-control" id="botDisplayName">
																	</div>
																</div>
																<div class="col-12 text-right">
																	<a class="kt-link kt-font-bold" href="https://syra-ai.zendesk.com/hc/en-us/articles/360036940112-How-To-Install-Syra-AI-Chatbot-On-Slack-" target="_blank">How do I embed in Slack?</a>
																</div>
															</div>
															
															<div class="kt-separator kt-separator--border-dashed kt-separator--space-lg"></div>
															
															<div class="row">
																<label id="slackEmbedMsg"></label>
																<div class="col-auto ml-auto">
																	<button class="btn btn-warning btn-tall btn-wide kt-font-bold kt-font-transform-u userActivityLog" name="saveEmbedApi" type="button" onclick="slackEmbedAPIcall()">Update</button>
																</div>
															</div>
														</div>
														<!--end: Form Wizard Content to embed chatbot on slack-->
														
														<!--begin: Form Wizard Content to embed on skype-->
														<div class="kt-wizard-v2__content pb-0" data-ktwizard-type="step-content">
															<div class="row">
																<div class="col-lg-6">
																	<div class="form-group">
																		<label>Client ID</label>
																		<input type="text" class="form-control" id="skypeClientId">
																	</div>
																</div>
																<div class="col-lg-6">
																	<div class="form-group">
																		<label>Client Secret</label>
																		<input type="text" class="form-control" id="skypeClientSecret">
																	</div>
																</div>
																<div class="col-12 text-right">
																	<a class="kt-link kt-font-bold" href="https://syra-ai.zendesk.com/hc/en-us/articles/360036940592-How-To-Embed-Chatbots-on-Social-Media-like-Skype" target="_blank">How do I embed in Skype?</a>
																</div>
															</div>
															
															<div class="kt-separator kt-separator--border-dashed kt-separator--space-lg"></div>
															
															<div class="row">
																<label id="skypeEmbedMsg"></label>
																<div class="col-auto ml-auto">
																	<button class="btn btn-warning btn-tall btn-wide kt-font-bold kt-font-transform-u userActivityLog" name="saveSkype" type="button" onclick="skypeEmbedAPIcall()">Update</button>
																</div>
															</div>
														</div>
														<!--end: Form Wizard Content to embed on skype-->
														
														<!--begin: Form Wizard Content-->
														<div class="kt-wizard-v2__content pb-0" data-ktwizard-type="step-content">
															<div class="row">
																<div class="col-lg-4">
																	<div class="form-group">
																		<label>Name</label>
																		<input type="text" class="form-control" value="" id="userName">
																	</div>
																</div>
																<div class="col-lg-4">
																	<div class="form-group">
																		<label>Email</label>
																		<input type="email" class="form-control" value="" id="userEmail">
																	</div>
																</div>
																<div class="col-lg-4">
																	<div class="form-group">
																		<label>Type of mobile chatbot app</label>
																		<select class="kt-custom-select-auto-init" title="Select platform" data-width="100%" id="selPlatform">
																			<option value="Android">Android</option>
																			<option value="iOS">iOS</option>
																			<option value="Both">Both</option>
																		</select>
																	</div>
																</div>
																<div class="col-12">
																	<div class="form-group mb-0">
																		<label>Message</label>
																		<textarea class="form-control" rows="3" id="appInfotxt"></textarea>
																	</div>
																</div>
															</div>
															
															<div class="kt-separator kt-separator--border-dashed kt-separator--space-lg"></div>
															
															<div class="row">
																<label class="label label-default" id="mobileAppsMsg"></label>
																<div class="col-auto ml-auto">
																	<button class="btn btn-warning btn-tall btn-wide kt-font-bold kt-font-transform-u userActivityLog" name="mobileAppsInfo" type="button" onclick="saveMobileAppsInfo()">Update</button>
																</div>
															</div>
														</div>
													</div>
													
													<!--end: Form Wizard Form-->
												</div>
											</div>
										</div>
									</div>
								</div>
								
								<!-- end:: Content -->
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<!-- end:: Page -->
		
		<!-- begin::Quick Panel -->
		<div id="kt_quick_panel" class="kt-quick-panel"></div>
		
		<!-- end::Quick Panel -->
		
		<!-- begin::Global Config(global config for global JS sciprts) -->
		<script>
		    wp_path = "<?php echo plugin_dir_url( __FILE__ ) ?>";
			var global = window,
				KTAppOptions = {
					"colors": {
						"state": {
							"brand": "#716aca",
							"light": "#fff",
							"dark": "#282a3c",
							"primary": "#5867dd",
							"success": "#34bfa3",
							"info": "#36a3f7",
							"warning": "#ffb822",
							"danger": "#fd3995"
						},
						"base": {
							"label": ["#c5cbe3", "#a1a8c3", "#3d4465", "#3e4466"],
							"shape": ["#f0f3ff", "#d9dffa", "#afb4d4", "#646c9a"]
						}
					}
				};
		</script>
		
		<!-- end::Global Config -->

	</body>
	
	<!-- end::Body -->
</html>