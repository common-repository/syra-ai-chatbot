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
		<title>Syra | Setup Wizard</title>
		<meta name="description" content="Latest updates and statistic charts">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">		

		<script>
        var email = "";
		var access_token="";
		var userDetails = null;
		var totalQuestionCount=0;
		var selectedDomainId = null;
		var userExitstingChatbot = false;
		var userExistingTrainingUrls = false; 
		var customizeBtnClick = false;
		//first opening question change
		var previous_txt_ques1_Value = jQuery("#txt_ques1").val();
		var previous_txt_display_value1_Value = jQuery("#txt_display_value1").val();
		//second opening question change
		var previous_txt_ques2_Value = jQuery("#txt_ques2").val();
		var previous_txt_display_value2_Value = jQuery("#txt_display_value2").val();
		//third opening question change
		var previous_txt_ques3_Value = jQuery("#txt_ques3").val();
		var previous_txt_display_value3_Value = jQuery("#txt_display_value3").val();
		//fourth opening question change
		var previous_txt_ques4_Value = jQuery("#txt_ques4").val();
		var previous_txt_display_value4_Value = jQuery("#txt_display_value4").val();
		//fifth opening question change
		var previous_txt_ques5_Value = jQuery("#txt_ques5").val();
		var previous_txt_display_value5_Value = jQuery("#txt_display_value5").val();
		//adding user question by default
		userIcon = "images/user-icon/"+ "guest-icon.png";

        jQuery(document).ready(function () 
        {  
        	wp_path = "<?php echo plugin_dir_url( __FILE__ ) ?>";
			userBrowserType = detectUserBrowserType();
			includeMobileHeader();
			var userDetails_Data = extractUserDetaisFromCookie();
			email = userDetails_Data["email"];
			access_token = userDetails_Data["access_token"];
			includeHeader(userDetails_Data["username"]);
			includeSidePanel();
			populateHelpTable();
			populateNotificationTable(userDetails_Data["email"], userDetails_Data["access_token"]);
			customerFetch();
			fetchBot("setupWizardPage");
			if(userExitstingChatbot == false){
				jQuery("#previewTab").attr("onclick","displayPublishMessage();");
			}
        });
    </script>
	</head>
	
	<!-- end::Head -->
	
	<!-- begin::Body -->
	<body style="background-image: url(<?php echo plugin_dir_url( __FILE__ ) . 'images/bg-1.jpg'?>)" class="kt-quick-panel--right kt-demo-panel--right kt-offcanvas-panel--right kt-header-mobile--fixed kt-subheader--enabled kt-subheader--transparent kt-page--loading">
		
		<!-- begin:: Page -->
		
		<!-- begin:: Header Mobile -->
		<div id="kt_header_mobile" class="kt-header-mobile kt-header-mobile--fixed"></div>
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
									<li class="kt-menu__item kt-menu__item--here setup-wizard-li" id="setup-wizard-account-setup">
										<a href="#" class="kt-menu__link kt-menu__toggle userActivityLog" name="accountSetUp" onclick="closeChatbot()" data-toggle="tab" data-target="#kt_tabs_top_account_setup">
											<span class="kt-menu__link-text">Account Setup</span>
											<i class="kt-menu__link-icon la la-check-circle"></i>
										</a>
									</li>
									<li class="kt-menu__item setup-wizard-li" id="setup-wizard-chatbot-customize">
										<a href="#" class="kt-menu__link kt-menu__toggle userActivityLog" name="customize" onclick="showChatbot()" data-toggle="tab" data-target="#kt_tabs_top_customize">
											<span class="kt-menu__link-text">Customize</span>
											<i class="kt-menu__link-icon la la-check-circle"></i>
										</a>
									</li>
									<li class="kt-menu__item setup-wizard-li" id="setup-wizard-chatbot-train">
										<a href="#" class="kt-menu__link kt-menu__toggle userActivityLog" name="knowledgeBase" onclick="closeChatbot()" data-toggle="tab" data-target="#kt_tabs_top_build_knowledge_base">
											<span class="kt-menu__link-text">Build Knowledge Base</span>
											<i class="kt-menu__link-icon la la-check-circle"></i>
										</a>
									</li>
									<li class="kt-menu__item setup-wizard-li" id="setup-wizard-schedule-training">
										<a href="#" class="kt-menu__link kt-menu__toggle userActivityLog" name="scheduleTrainingTab" onclick="closeChatbot()" data-toggle="tab" data-target="#kt_tabs_top_schedule_ai_model_training">
											<span class="kt-menu__link-text">Schedule AI Model Training</span>
											<i class="kt-menu__link-icon la la-clock-o"></i>
										</a>
									</li>
									<li class="kt-menu__item setup-wizard-li" id="setup-wizard-chatbot-publish">
										<a href="#" class="kt-menu__link kt-menu__toggle" onclick="closeChatbot()" name="previewTab" data-toggle="tab" data-target="#kt_tabs_top_publish_or_retrain_ai_model">
											<span class="kt-menu__link-text">Publish or Retrain AI Model</span>
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
										
										<div class="tab-pane setup-wizard active" id="kt_tabs_top_account_setup" role="tabpanel">
											<div class="kt-grid kt-wizard-v2" id="kt_wizard_account_setup" data-ktwizard-state="step-first">
												<div class="kt-grid__item kt-wizard-v2__aside">
													<!--begin: Form Wizard Nav -->
													<div class="kt-wizard-v2__nav">
														<div class="kt-wizard-v2__nav-items kt-wizard-v2__nav-items--clickable">
															<div class="kt-wizard-v2__nav-item userActivityLog" name="personalTab" id="personalDetailsTab" data-ktwizard-type="step" data-ktwizard-state="current">
																<div class="kt-wizard-v2__nav-body">
																	<div class="kt-wizard-v2__nav-icon">
																		<i class="flaticon2-user-1"></i>
																	</div>
																	<div class="kt-wizard-v2__nav-label">
																		<div class="kt-wizard-v2__nav-label-title">Personal Details</div>
																		<div class="kt-wizard-v2__nav-label-desc"></div>
																	</div>
																	<div class="kt-wizard-v2__nav-state">
																		<i class="la la-check-circle"></i>
																	</div>
																</div>
															</div>
															<div class="kt-wizard-v2__nav-item userActivityLog" name="contactTab" id="contactDetailsTab" data-ktwizard-type="step">
																<div class="kt-wizard-v2__nav-body">
																	<div class="kt-wizard-v2__nav-icon">
																		<i class="flaticon2-sheet"></i>
																	</div>
																	<div class="kt-wizard-v2__nav-label">
																		<div class="kt-wizard-v2__nav-label-title">Contact Details</div>
																		<div class="kt-wizard-v2__nav-label-desc"></div>
																	</div>
																	<div class="kt-wizard-v2__nav-state">
																		<i class="la la-clock-o"></i>
																	</div>
																</div>
															</div>
															<div class="kt-wizard-v2__nav-item userActivityLog" name="companyTab" id="companyDetailsTab" data-ktwizard-type="step">
																<div class="kt-wizard-v2__nav-body">
																	<div class="kt-wizard-v2__nav-icon">
																		<i class="flaticon2-architecture-and-city"></i>
																	</div>
																	<div class="kt-wizard-v2__nav-label">
																		<div class="kt-wizard-v2__nav-label-title">Company Details</div>
																		<div class="kt-wizard-v2__nav-label-desc"></div>
																	</div>
																</div>
															</div>
														</div>
													</div>
													
													<!--end: Form Wizard Nav -->
												</div>
												
												<div class="kt-grid__item kt-grid__item--fluid kt-wizard-v2__wrapper">
													<!--begin: Form Wizard Form-->
													<form class="kt-form" id="kt_form_account_setup">
														
														<!--begin: Form Wizard Content-->
														<div class="kt-wizard-v2__content pb-0" id="personalDetailsContent" data-ktwizard-type="step-content" data-ktwizard-state="current">
															<div class="row">
																<div class="col-lg-6">
																	<div class="form-group">
																		<label>First Name</label>
																		<input type="text" class="form-control" id="txt_fname">
																	</div>
																</div>
																<div class="col-lg-6">
																	<div class="form-group">
																		<label>Last Name</label>
																		<input type="text" class="form-control" id="txt_lname">
																	</div>
																</div>
																<div class="col-lg-6">
																	<div class="form-group mb-lg-0">
																		<label>Email</label>
																		<input type="email" class="form-control" id="txt_email" readonly>
																	</div>
																</div>
																<div class="col-lg-6">
																	<div class="form-group mb-0">
																		<label>Job Title</label>
																		<input type="text" class="form-control" id="txt_title">
																	</div>
																</div>
																<input type="hidden" name="txt_passwd" id="txt_passwd">

															</div>
															<!-- <div class="kt-form__actions" style="margin-top: 5%;">
																<button class="btn btn-warning btn-md btn-tall btn-wide kt-font-bold kt-font-transform-u" type="button" onclick="updatePersonalDetails()" data-ktwizard-type="action-next">Save & Next</button>
															</div> -->
														</div>
														
														<!--end: Form Wizard Content-->
														
														<!--begin: Form Wizard Content-->
														<div class="kt-wizard-v2__content pb-0" id="contactDetailsContent" data-ktwizard-type="step-content">
															<div class="row">
																<!-- <div class="col-12">
																	<div class="form-group">
																		<label>Address</label>
																		<textarea class="form-control" rows="5" id="txt_add"></textarea>
																	</div>
																</div> -->
																<div class="col-lg-6">
																	<div class="form-group">
																		<label>Address1</label>
																		<textarea class="form-control" rows="5" id="txt_add"></textarea>
																	</div>
																</div>
																<div class="col-lg-6">
																	<div class="form-group">
																		<label>Address2</label>
																		<textarea class="form-control" rows="5" id="txt_address2"></textarea>
																	</div>
																</div>
																<div class="col-lg-6">
																	<div class="form-group">
																		<label>City</label>
																		<input type="text" class="form-control" id="txt_city">
																	</div>
																</div>
																<div class="col-lg-6">
																	<div class="form-group">
																		<label>Country</label>
																		<input type="text" class="form-control" id="txt_country">
																	</div>
																</div>
																<div class="col-lg-6">
																	<div class="form-group mb-lg-0">
																		<label>ZIP Code</label>
																		<input type="text" class="form-control" id="txt_zip">
																	</div>
																</div>
																<div class="col-lg-6">
																	<div class="form-group mb-0">
																		<label>Contact Number</label>
																		<input type="tel" class="form-control" id="txt_contact">
																	</div>
																</div>
																<input type="hidden" name="txt_add2" id="txt_add2">
															</div>
															<!-- <div class="kt-form__actions" style="margin-top: 5%;">
																<button class="btn btn-label-brand btn-label btn-md btn-tall btn-wide kt-font-bold kt-font-transform-u" type="button" data-ktwizard-type="action-prev">Previous</button>
																
																<button class="btn btn-warning btn-md btn-tall btn-wide kt-font-bold kt-font-transform-u" type="button" onclick="updateContactDetails()" data-ktwizard-type="action-next">Save & Next</button>
															</div> -->
														</div>
														
														<!--end: Form Wizard Content-->
														
														<!--begin: Form Wizard Content-->
														<div class="kt-wizard-v2__content pb-0" id="companyDetailsContent" data-ktwizard-type="step-content">
															<div class="row">
																<div class="col-lg-6">
																	<div class="form-group">
																		<label>Company Name</label>
																		<input type="text" class="form-control" id="txt_company">
																	</div>
																</div>
																<div class="col-lg-6">
																	<div class="form-group">
																		<label>Website URL</label>
																		<input type="url" class="form-control" id="txt_web">
																	</div>
																</div>
																<div class="col-lg-6">
																	<div class="form-group mb-lg-0">
																		<label>Facebook URL</label>
																		<input type="url" class="form-control" id="txt_fb">
																	</div>
																</div>
																<div class="col-lg-6">
																	<div class="form-group mb-0">
																		<label>LinkedIn URL</label>
																		<input type="url" class="form-control" id="txt_tax">
																	</div>
																</div>
																<!-- <input type="hidden" name="txt_tax" id="txt_tax"> -->
															</div>

															<!-- <div class="kt-form__actions" style="margin-top: 5%;">
																<button class="btn btn-label-brand btn-label btn-md btn-tall btn-wide kt-font-bold kt-font-transform-u" type="button" data-ktwizard-type="action-prev">Previous</button>
																<button class="btn btn-warning btn-md btn-tall btn-wide kt-font-bold kt-font-transform-u" type="button" data-current="#kt_tabs_top_account_setup" data-target="#kt_tabs_top_customize" data-ktwizard-type="action-submit" onclick="updateCompanyDetails()">Save & Next</button>
															</div> -->

														</div>
														
														<!--end: Form Wizard Content-->
														
														<div class="kt-separator kt-separator--border-dashed kt-separator--space-lg"></div>
														
														<!--begin: Form Actions -->
														<div class="kt-form__actions">
															<button class="btn btn-label-brand btn-label btn-md btn-tall btn-wide kt-font-bold kt-font-transform-u" type="button" data-ktwizard-type="action-prev">Previous</button>

															<button class="kt-tab-invoker  btn btn-warning btn-md btn-tall btn-wide kt-font-bold kt-font-transform-u userActivityLog" name="companyTab" type="button" id="updateUserInformation" data-ktwizard-type="action-submit" data-current="#kt_tabs_top_account_setup" data-target="#kt_tabs_top_customize" onclick="updateAllDetails()">Save & Next</button>
															
															<button class="btn btn-warning btn-md btn-tall btn-wide kt-font-bold kt-font-transform-u userActivityLog" name="contactTab" type="button" data-ktwizard-type="action-next">Save & Next</button>
														</div>
														
														<!--end: Form Actions -->
													</form>
													
													<!--end: Form Wizard Form-->
												</div>
											</div>
										</div>
										
										<div class="tab-pane setup-wizard" id="kt_tabs_top_customize" role="tabpanel">
											<div class="container kt-container--md">
												<!-- begin:: Subheader -->
												<div class="kt-subheader kt-grid__item my-0" id="kt_subheader">
													<div class="kt-container kt-container--fluid px-0">
														<div class="kt-subheader__main"></div>
														<div class="kt-subheader__toolbar">
															<div class="kt-subheader__wrapper">
																<a class="kt-link kt-font-bold" href="https://www.youtube.com/watch?v=3NQWGa4VUqI" target="_blank">How do I customize my Chatbot?</a>
															</div>
														</div>
													</div>
												</div>
												
												<!-- end:: Subheader -->
												
												<div class="kt-separator kt-separator--border-dashed kt-separator--space-lg"></div>
												
												<form class="kt-form" id="kt_form_customize">
													<div class="row">
														<div class="col-lg-6">
															<div class="form-group">
																<label>Chatbot Name</label>
																<label style="padding-left: 20%; color: #543244;" id="chatbotCounter"> </label>	
																<input type="text" maxlength="25" class="form-control" id="txt_name" onkeyup="changeBotName()" onkeydown="changeBotName()">
															</div>
														</div>
														<div class="col-lg-6">
															<div class="form-group">
																<label>Header Background Color</label>
																<input type="color" class="form-control" value="#8d3052" id="txt_bckcol" onchange="txtBckColorOnChange()">
															</div>
														</div>
														<div class="col-lg-6">
															<div class="form-group">
																<label>Chatbot Icon</label>
																<label class="custom-file">
																	<!--<input type="file" class="custom-file-input">-->
																	<span class="custom-file-label" id="chatbotIconImage" name="" data-toggle="modal" data-target="#chooseIconModal">
																		<img id="chatbotIconImg" src="<?php echo plugin_dir_url( __FILE__ ) .'images/chatbot-icons/icon-14.png'?>" name="icon-14.png" alt="Show User Icon" height="38" width="39" style="margin-top: -9px;">
																	</span>
																</label>
															</div>
														</div>
														<div class="col-lg-6">
															<div class="form-group">
																<label>User Icon</label>
																<label class="custom-file">
																	<!--<input type="file" class="custom-file-input">-->
																	<span class="custom-file-label" id="userIconImage" name="" data-toggle="modal" data-target="#chooseIconModalForUser">
																		<img id="storeVisitorIconImg" src="<?php echo plugin_dir_url( __FILE__ ) .'images/user-icon/u-icon.png'?>" name="u-icon.png" alt="Show User Icon" height="38" width="39" style="margin-top: -9px;">
																	</span>
																</label>
															</div>
														</div>
														<div class="col-lg-6">
															<div class="form-group">
																<label>Widget Background Color</label>
																<input type="color" class="form-control" value="#FBF9F9" id="widgetBackgroundColor" onchange="widgetBackgroundColorOnChange()">
															</div>
														</div>
														<div class="col-lg-6">
															<div class="form-group">
																<label>Button Color</label>
																<input type="color" class="form-control" value="#442262" id="leadOnBtnBackgroundColor" onchange="leadOnBtnBackgroundColorOnChange()">
															</div>
														</div>
														<div class="col-lg-6">
															<div class="form-group">
																<label>Response Background Color</label>
																<input type="color" class="form-control" value="#f8d3e3" id="botResponseBackgroundColor" onchange="botResponseBackgroundColorOnChange()">
															</div>
														</div>
														<div class="col-lg-6">
															<div class="form-group">
																<label>User Question Background Color</label>
																<input type="color" class="form-control" value="#f9f2d8" id="userQuestionBackgroundColor" onchange="userQuestionBackgroundColorOnChange()">
															</div>
														</div>
														<div class="col-12">
															<div class="form-group">
																<label>Header Text</label>
																<label id="headerTxtCount" style="padding-left: 20%; color: #543244;"></label>
																<input type="text" class="form-control" id="txt_description" rows="2" maxlength="55" onkeyup="changeBotDescription()" onkeydown="changeBotDescription()">
															</div>
														</div>
														<div class="col-12">
															<div class="form-group">
																<label>Greeting</label>
																<label id="welcomeMsgTxtCount" style="padding-left: 20%; color: #543244;"></label>
																<textarea class="form-control" maxlength="55" rows="2" id="txt_wmsg" onkeyup="changeBotWelcomeMsg()" onkeydown="changeBotWelcomeMsg()"></textarea>
															</div>
														</div>
														<div class="col-12">
															<div class="form-group">
																<label>Preview Message</label>
																<label style="padding-left: 20%; color: #543244;" id="counter"> </label>
																<input type="text" class="form-control" rows="2" maxlength="80" id="txt_preview" onkeyup="changeBotPreviewMsg(this)" onkeydown="changeBotPreviewMsg(this)">
															</div>
														</div>
														<div class="col-lg-6">
															<div class="form-group">
																<label>Preview Message Background Color</label>
																<input type="color" class="form-control" value="#F6B20E" id="badgeTextBackgroundColor" onchange="botBadgeTextBackgroundColorOnChange()">
															</div>
														</div>
														<div class="col-lg-6">
															<div class="form-group">
																<label for="badgeSelect" style="margin-right: 2.3%;">Do you want to show the preview message to store visitors?</label>
																<label class="kt-switch" style="border-radius: 4px; padding: 4px 5px 0 5px;">
																	<span>
																	<input type="checkbox" style="position: unset;" id="badgeSelect" checked>
																	<span>
																		
																	</span>
																	</span>
																</label>
															</div>
														</div>
														<div class="col-lg-6">
															<div class="form-group mb-0">
																<label>Contact URL</label>
																<label style="font-style: italic; font-size: 12px;">(So that site visitors can contact you).</label>
																<input type="url" class="form-control" id="contactURL" placeholder="https://cloudhiti.ai/contact/">
															</div>
														</div>
														<input type="hidden" id="txt_key">
													</div>
													
													<div class="kt-separator kt-separator--border-dashed kt-separator--space-lg"></div>
													
													<div class="row">
														<div class="col-auto">
															<button class="btn btn-label-brand btn-label btn-md btn-tall btn-wide kt-font-bold kt-font-transform-u userActivityLog" data-ktwizard-type="action-prev" name="prevDeployment" onclick="setupWizardAccount()" type="button">Previous</button>
															<button class="btn btn-danger btn-tall btn-wide kt-font-bold kt-font-transform-u userActivityLog" name="resetColor" type="button" onclick="resetColorsIconText()">Reset</button>
														</div>
														<div class="col-auto ml-auto">
															<button class="btn btn-label-brand btn-label btn-md btn-tall btn-wide kt-font-bold kt-font-transform-u userActivityLog" name="click_to_update_chabot" type="button" id="btnCustomize">Save</button>
															<button id="customizeNext" style="margin-left: 20px;" class="kt-tab-invoker btn btn-warning btn-tall btn-wide kt-font-bold kt-font-transform-u userActivityLog" name="click_to_update_chabot" onclick="customizeToNavigation()" type="button">Save & Next</button>
														</div>
													</div>
													<div class="row" style="margin-top: 2%;">
														<div class="col-auto ml-auto">
															<div id="msgArea"></div>
														</div>
													</div>
												</form>
												
												<!-- begin:: Preview Changes Button -->
										<!--		<a class="kt-preview-changes" href="javascript:;">
													<span class="kt-preview-changes__badge">Preview</span>
													<img class="kt-preview-changes__img" src="assets/dist/media/icons/pixeel/bot.png">
												</a> -->
												<!-- end:: Preview Changes Button -->
											</div>
										</div>
										
										<div class="tab-pane setup-wizard" id="kt_tabs_top_build_knowledge_base" role="tabpanel">
											<div class="kt-grid kt-wizard-v2" id="kt_wizard_build_knowledge_base" data-ktwizard-state="step-first">
												<div class="kt-grid__item kt-wizard-v2__aside">
													<!--begin: Form Wizard Nav -->
													<div class="kt-wizard-v2__nav">
														<div class="kt-wizard-v2__nav-items kt-wizard-v2__nav-items--clickable">
															<div class="kt-wizard-v2__nav-item userActivityLog" name="knowledgeBaseTab" data-ktwizard-type="step" data-ktwizard-state="current" onclick="getOpeningQuestions()">
																<div class="kt-wizard-v2__nav-body">
																	<div class="kt-wizard-v2__nav-icon">
																		<i class="flaticon2-rectangular"></i>
																	</div>
																	<div class="kt-wizard-v2__nav-label">
																		<div class="kt-wizard-v2__nav-label-title">Opening Questions</div>
																		<div class="kt-wizard-v2__nav-label-desc"></div>
																	</div>
																</div>
															</div>
															<div class="kt-wizard-v2__nav-item userActivityLog" name="knowledgeBankTab" data-ktwizard-type="step" onclick="getTrainingQuestions()">
																<div class="kt-wizard-v2__nav-body">
																	<div class="kt-wizard-v2__nav-icon">
																		<i class="flaticon2-open-text-book"></i>
																	</div>
																	<div class="kt-wizard-v2__nav-label">
																		<div class="kt-wizard-v2__nav-label-title">Training Questions</div>
																		<div class="kt-wizard-v2__nav-label-desc"></div>
																	</div>
																</div>
															</div>
															<div class="kt-wizard-v2__nav-item userActivityLog" data-ktwizard-type="step" name="knowledgeBaseURLTab">
																<div class="kt-wizard-v2__nav-body">
																	<div class="kt-wizard-v2__nav-icon">
																		<i class="flaticon2-browser-2"></i>
																	</div>
																	<div class="kt-wizard-v2__nav-label">
																		<div class="kt-wizard-v2__nav-label-title">Training URLs</div>
																		<div class="kt-wizard-v2__nav-label-desc"></div>
																	</div>
																</div>
															</div>
														</div>
													</div>
													
													<!--end: Form Wizard Nav -->
												</div>
												
												<div class="kt-grid__item kt-grid__item--fluid kt-wizard-v2__wrapper">
													<!--begin: Form Wizard Form-->
													<form class="kt-form" id="kt_form_build_knowledge_base">
														<!--begin: Form Wizard Content-->
														<div class="kt-wizard-v2__content pb-0" data-ktwizard-type="step-content" data-ktwizard-state="current">
															<div id="kt_form_build_knowledge_base_opening_questions">
																<ol class="kt-ordered-list" id="listOfOpeningQuestions"></ol>
																<div class="row">
																	<div class="col-auto ml-auto">
																		<button class="btn btn-label-brand btn-label btn-tall btn-wide kt-font-bold kt-font-transform-u" type="button" id="btnAddOpeningQuestion" data-repeater-create>
																			<i class="la la-plus pr-0 pr-lg-2"></i>
																			<span class="d-none d-lg-inline">Add New Opening Question</span>
																		</button>
																	</div>
																</div>
															</div>
														</div>
														
														<!--end: Form Wizard Content-->
														
														<!--begin: Form Wizard Content-->
														<div class="kt-wizard-v2__content pb-0" data-ktwizard-type="step-content">
															<div id="kt_form_build_knowledge_base_training_questions">
																<div class="table-responsive">
																	<table id="trainingQuestionTable" class="table table-striped kt-table--align-middle mb-0" style="min-width: 500px">
																		<thead class="thead-dark">
																		<tr>
																			<th>Question</th>
																			<th>Answer/URL</th>
																			<th style="width: 170px;">Create Date & Time</th>
																			<th style="width: 135px;"></th>
																		</tr>
																		</thead>
																		<tbody id="tbodyForTrainingQuestion" data-repeater-list>	
																		</tbody>
																	</table>
																</div>
																
																<div class="kt-separator kt-separator--dashed kt-separator--md"></div>
																
																<div class="row">
																	<div class="col-auto ml-auto">
																		<button class="btn btn-label-brand btn-label btn-tall btn-wide kt-font-bold kt-font-transform-u user userActivityLog" type="button" id="btnAddTrainingQues"data-repeater-create>
																			<i class="la la-plus pr-0 pr-lg-2"></i>
																			<span class="d-none d-lg-inline">Add New Training Question</span>
																		</button>
																	</div>
																</div>
															</div>
														</div>
														
														<!--end: Form Wizard Content-->
														
														<!--begin: Form Wizard Content-->
														<div class="kt-wizard-v2__content pb-0" data-ktwizard-type="step-content">
															<div id="kt_form_build_knowledge_base_training_urls">
																<div class="table-responsive">
																	<table id="trainingURLsTable" class="table table-striped kt-table--align-middle mb-0" style="min-width: 500px">
																		<thead class="thead-dark">
																		<tr>
																			<th>URL</th>
																			<th style="width: 100px;">Recursive</th>
																			<th style="width: 170px;">Create Date & Time</th>
																			<th style="width: 135px;"></th>
																		</tr>
																		</thead>
																		<tbody id="tbodyForTrainingURLs" data-repeater-list>
		
																		</tbody>
																	</table>
																</div>
																
																<div class="kt-separator kt-separator--dashed kt-separator--md"></div>
																
																<div class="row">
																	<div class="col-auto ml-auto">
																		<button class="btn btn-label-brand btn-label btn-tall btn-wide kt-font-bold kt-font-transform-u" type="button" id="btnAddTrainingURL" data-repeater-create>
																			<i class="la la-plus pr-0 pr-lg-2"></i>
																			<span class="d-none d-lg-inline">Add New Training URLs</span>
																		</button>
																	</div>
																</div>
															</div>
														</div>
														
														<!--end: Form Wizard Content-->
														
														<div class="kt-separator kt-separator--border-dashed kt-separator--space-lg"></div>
														
														<!--begin: Form Actions -->
														<div class="kt-form__actions">
															<!-- <button class="btn btn-label-brand btn-label btn-md btn-tall btn-wide kt-font-bold kt-font-transform-u" type="button" data-ktwizard-type="action-prev">Previous</button> -->
															<button class="btn btn-label-brand btn-label btn-md btn-tall btn-wide kt-font-bold kt-font-transform-u userActivityLog" type="button" data-ktwizard-type="action-submit" name="createKnowledgeBaseURL" id="finalSubmitBtn">Save</button>
															<button class="kt-tab-invoker btn btn-warning btn-md btn-tall btn-wide kt-font-bold kt-font-transform-u userActivityLog" type="button" style="margin-left: 2%;" data-ktwizard-type="action-submit" name="createKnowledgeBaseURL" onclick="knowledgeBaseToNavigation()">Save & Next</button>
															<button class="btn btn-warning btn-md btn-tall btn-wide kt-font-bold kt-font-transform-u userActivityLog btnDefault" type="button" id="defaultButton" data-ktwizard-type="action-next">Save & Next</button>
														</div>
														
														<!--end: Form Actions -->
													</form>
													
													<!--end: Form Wizard Form-->
												</div>
											</div>
										</div>
										
										<div class="tab-pane setup-wizard" id="kt_tabs_top_schedule_ai_model_training" role="tabpanel">
											<div class="container kt-container--md">
												<iframe id="kt_scheduler_schedule_ai_model_training_schedule_training" src="https://calendly.com/cloudhiti_ai_apps/support?embed_domain=chatbots.syra.ai&embed_type=Inline&hide_event_type_details=1" width="100%" height="750" frameborder="0"></iframe>
												
												<div class="row">
													<div class="col-auto ml-auto">
														<button class="btn btn-label-brand btn-label btn-md btn-tall btn-wide kt-font-bold kt-font-transform-u" type="button" data-ktwizard-type="action-prev" onclick="setupWizardTrain()">Previous</button>
														<button class="kt-tab-invoker btn btn-warning btn-md btn-tall btn-wide kt-font-bold kt-font-transform-u userActivityLog" name="scheduleTrainingTab" style="margin-left: 20px;" type="button" data-current="#kt_tabs_top_schedule_ai_model_training" data-target="#kt_tabs_top_publish_or_retrain_ai_model" onclick="createWizardForTraining()">Schedule &amp; Next</button>
													</div>
												</div>
											</div>
										</div>
										
										<div class="tab-pane setup-wizard" id="kt_tabs_top_publish_or_retrain_ai_model" role="tabpanel">
											<div class="kt-grid kt-wizard-v2" id="kt_wizard_publish_or_retrain_ai_model" data-ktwizard-state="step-first">
												<div class="kt-grid__item kt-wizard-v2__aside">
													<!--begin: Form Wizard Nav -->
													<div class="kt-wizard-v2__nav">
														<div class="kt-wizard-v2__nav-items kt-wizard-v2__nav-items--clickable">
															<div class="kt-wizard-v2__nav-item userActivityLog" name="previewTab" data-ktwizard-type="step" data-ktwizard-state="current">
																<div class="kt-wizard-v2__nav-body">
																	<div class="kt-wizard-v2__nav-icon">
																		<i class="flaticon2-shelter"></i>
																	</div>
																	<div class="kt-wizard-v2__nav-label">
																		<div class="kt-wizard-v2__nav-label-title">Publish</div>
																		<div class="kt-wizard-v2__nav-label-desc"></div>
																	</div>
																</div>
															</div>
															<div class="kt-wizard-v2__nav-item userActivityLog" name="previewTab" data-ktwizard-type="step">
																<div class="kt-wizard-v2__nav-body">
																	<div class="kt-wizard-v2__nav-icon">
																		<i class="flaticon2-shield"></i>
																	</div>
																	<div class="kt-wizard-v2__nav-label">
																		<div class="kt-wizard-v2__nav-label-title">Retrain AI Model</div>
																		<div class="kt-wizard-v2__nav-label-desc"></div>
																	</div>
																</div>
															</div>
														</div>
													</div>
													
													<!--end: Form Wizard Nav -->
												</div>
												
												<div class="kt-grid__item kt-grid__item--fluid kt-wizard-v2__wrapper">
													<!--begin: Form Wizard Form-->
													<form class="kt-form" id="kt_form_publish_or_retrain_ai_model">
														
														<!--begin: Form Wizard Content-->
														<div class="kt-wizard-v2__content pb-0" data-ktwizard-type="step-content" data-ktwizard-state="current">
															<div class="kt-section">
																<h2 class="kt-section__desc d-flex align-items-center mb-5">Now that you have configured your Syra AI Chatbot, customized it and set up the knowledge base, its time to test it out live on your site!</h2>
																<div class="kt-section__content">
																	<div class="row">
																		<div class="col-lg-6 mb-4">
																			<a class="kt-portlet kt-iconbox kt-iconbox--brand kt-iconbox--animate h-lg-100 mb-0" href="#">
																				<div class="kt-portlet__body">
																					<div class="kt-iconbox__body">
																						<div class="kt-iconbox__icon">
																							<i class="pix-png-icon pix-png-icon--md pix-png-search"></i>
																						</div>
																						<div class="kt-iconbox__desc">
																							<h3 class="kt-iconbox__title mb-0">
																								<div class="kt-link userActivityLog" name="previewTab" id="previewTab">Preview Syra AI Chatbot</div>
																							</h3>
																						</div>
																					</div>
																				</div>
																			</a>
																		</div>
																		<div class="col-lg-6 mb-4">
																			<a class="kt-portlet kt-iconbox kt-iconbox--brand kt-iconbox--animate h-lg-100 mb-0" onclick="publishTabNavigation()" style="cursor: pointer;">
																				<div class="kt-portlet__body">
																					<div class="kt-iconbox__body">
																						<div class="kt-iconbox__icon">
																							<i class="pix-png-icon pix-png-icon--md pix-png-publish"></i>
																						</div>
																						<div class="kt-iconbox__desc">
																							<h3 class="kt-iconbox__title mb-0">
																								<div class="kt-link">Publish Syra AI Chatbot</div>
																							</h3>
																						</div>
																					</div>
																				</div>
																			</a>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														
														<!--end: Form Wizard Content-->
														
														<!--begin: Form Wizard Content-->
														<div class="kt-wizard-v2__content pb-0" data-ktwizard-type="step-content">
															<div class="kt-section">
																<h2 class="kt-section__desc d-flex align-items-center mb-5">Remember that AI Chatbots need a lot of retraining to perform as per business expectations.
																	<br /> Therefore, retrain Syra AI Chabot’s AI model as frequently as you can. Response AnalysisLogs AnalysisSchedule Retraining Session</h2>
																<div class="kt-section__content">
																	<div class="row">
																		<div class="col-lg-6 mb-4">
																			<a class="kt-portlet kt-iconbox kt-iconbox--brand kt-iconbox--animate h-lg-100 mb-0" onclick="openAnalysis('Response Analysis')" style="cursor: pointer;">
																				<div class="kt-portlet__body">
																					<div class="kt-iconbox__body">
																						<div class="kt-iconbox__icon">
																							<i class="pix-png-icon pix-png-icon--md pix-png-search"></i>
																						</div>
																						<div class="kt-iconbox__desc">
																							<h3 class="kt-iconbox__title mb-0">
																								<div class="kt-link">Response Analysis</div>
																							</h3>
																						</div>
																					</div>
																				</div>
																			</a>
																		</div>
																		<div class="col-lg-6 mb-4">
																			<a class="kt-portlet kt-iconbox kt-iconbox--brand kt-iconbox--animate h-lg-100 mb-0" onclick="openAnalysis('Logs Analysis')" style="cursor: pointer;">
																				<div class="kt-portlet__body">
																					<div class="kt-iconbox__body">
																						<div class="kt-iconbox__icon">
																							<i class="pix-png-icon pix-png-icon--md pix-png-publish"></i>
																						</div>
																						<div class="kt-iconbox__desc">
																							<h3 class="kt-iconbox__title mb-0">
																								<div class="kt-link">Logs Analysis</div>
																							</h3>
																						</div>
																					</div>
																				</div>
																			</a>
																		</div>
																		<div class="col-lg-6 mb-4">
																			<a class="kt-portlet kt-iconbox kt-iconbox--brand kt-iconbox--animate h-lg-100 mb-0" onclick="openAnalysis('Schedule Retraining')" style="cursor: pointer;">
																				<div class="kt-portlet__body">
																					<div class="kt-iconbox__body">
																						<div class="kt-iconbox__icon">
																							<i class="pix-png-icon pix-png-icon--md pix-png-publish"></i>
																						</div>
																						<div class="kt-iconbox__desc">
																							<h3 class="kt-iconbox__title mb-0">
																								<div class="kt-link">Schedule Retraining Session</div>
																							</h3>
																						</div>
																					</div>
																				</div>
																			</a>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														
														<!--end: Form Wizard Content-->
														
														<!--end: Form Actions -->
													</form>
													
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
		
		<!--begin::Modal Feedback-->
		<div class="modal fade" id="kt_modal_feedback" tabindex="-1" role="dialog" aria-hidden="true">
			<div class="modal-dialog modal-lg" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title">Give your feedback</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<form class="kt-form">
							<div class="form-group">
								<label class="form-control-label">Answer/URL</label>
								<textarea class="form-control" rows="6"></textarea>
							</div>
						</form>
					</div>
					<div class="modal-footer justify-content-between">
						<button type="button" class="btn btn-danger btn-tall btn-wide kt-font-bold kt-font-transform-u" data-dismiss="modal">Delete</button>
						<button type="button" class="btn btn-warning btn-tall btn-wide kt-font-bold kt-font-transform-u">Update</button>
					</div>
				</div>
			</div>
		</div>
		
		<!--end::Modal Feedback-->
		
		<!-- begin::Quick Panel -->
		<div id="kt_quick_panel" class="kt-quick-panel"></div>
		<!-- end::Quick Panel -->

		<!--begin::User Icon Modal-->
		<div class="modal fade" id="chooseIconModal" tabindex="-1" role="dialog" aria-labelledby="chooseIconModalLabel"
	        aria-hidden="true">
	        <div class="modal-dialog modal-md" role="document">
	            <div class="modal-content">
	                <div class="modal-header" style="background-color: #651A43;">
	                    <h5 class="modal-title" style="color:white;">Choose Icon for Your Chatbot</h5>
	                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
	                        <span aria-hidden="true" style="color: white;">×</span>
	                    </button>
	                </div>
	                <div class="modal-body">

	                        <style>
	                                #chooseIconModal input
	                                {
	                                    -webkit-appearance: radio !important;
	                                }

	                        </style>

	                        <label>
	                            <input type="radio" name="chatbotIconRadioBtnGrp" value="icon-01.png">
	                            <img src="<?php echo plugin_dir_url( __FILE__ ) . 'images/chatbot-icons/icon-01.png'?>" width="35" height="35">
	                        </label>
	                        
	                        <label>
	                            <input type="radio" name="chatbotIconRadioBtnGrp" value="icon-02.png">
	                            <img src="<?php echo plugin_dir_url( __FILE__ ) . 'images/chatbot-icons/icon-02.png'?>" width="35" height="35">
	                        </label>

	                        <label>
	                            <input type="radio" name="chatbotIconRadioBtnGrp" value="icon-03.png">
	                            <img src="<?php echo plugin_dir_url( __FILE__ ) . 'images/chatbot-icons/icon-03.png'?>" width="35" height="35">
	                        </label>

	                        <label>
	                            <input type="radio" name="chatbotIconRadioBtnGrp" value="icon-04.png">
	                            <img src="<?php echo plugin_dir_url( __FILE__ ) . 'images/chatbot-icons/icon-04.png'?>" width="35" height="35">
	                        </label>


	                        <label>
	                            <input type="radio" name="chatbotIconRadioBtnGrp" value="icon-05.png">
	                            <img src="<?php echo plugin_dir_url( __FILE__ ) . 'images/chatbot-icons/icon-05.png'?>" width="35" height="35">
	                        </label>
	                        
	                        <label>
	                            <input type="radio" name="chatbotIconRadioBtnGrp" value="icon-06.png">
	                            <img src="<?php echo plugin_dir_url( __FILE__ ) . 'images/chatbot-icons/icon-06.png'?>" width="35" height="35">
	                        </label>

	                        <label>
	                            <input type="radio" name="chatbotIconRadioBtnGrp" value="icon-07.png">
	                            <img src="<?php echo plugin_dir_url( __FILE__ ) . 'images/chatbot-icons/icon-07.png'?>" width="35" height="35">
	                        </label>

	                        <label>
	                            <input type="radio" name="chatbotIconRadioBtnGrp" value="icon-08.png">
	                            <img src="<?php echo plugin_dir_url( __FILE__ ) . 'images/chatbot-icons/icon-08.png'?>" width="35" height="35">
	                        </label>


	                        <label>
	                            <input type="radio" name="chatbotIconRadioBtnGrp" value="icon-09.png">
	                            <img src="<?php echo plugin_dir_url( __FILE__ ) . 'images/chatbot-icons/icon-09.png'?>" width="35" height="35">
	                        </label>
	                        
	                        <label>
	                            <input type="radio" name="chatbotIconRadioBtnGrp" value="icon-10.png">
	                            <img src="<?php echo plugin_dir_url( __FILE__ ) . 'images/chatbot-icons/icon-10.png'?>" width="35" height="35">
	                        </label>

	                        <label>
	                            <input type="radio" name="chatbotIconRadioBtnGrp" value="icon-11.png">
	                            <img src="<?php echo plugin_dir_url( __FILE__ ) . 'images/chatbot-icons/icon-11.png'?>" width="35" height="35">
	                        </label>

	                        <label>
	                            <input type="radio" name="chatbotIconRadioBtnGrp" value="icon-12.png">
	                            <img src="<?php echo plugin_dir_url( __FILE__ ) . 'images/chatbot-icons/icon-12.png'?>" width="35" height="35">
	                        </label>


	                        <label>
	                            <input type="radio" name="chatbotIconRadioBtnGrp" value="icon-13.png">
	                            <img src="<?php echo plugin_dir_url( __FILE__ ) . 'images/chatbot-icons/icon-13.png'?>" width="35" height="35">
	                        </label>
	                        
	                        <label>
	                            <input type="radio" name="chatbotIconRadioBtnGrp" value="icon-14.png">
	                            <img src="<?php echo plugin_dir_url( __FILE__ ) . 'images/chatbot-icons/icon-14.png'?>" width="35" height="35">
	                        </label>

	                        <label>
	                            <input type="radio" name="chatbotIconRadioBtnGrp" value="icon-15.png">
	                            <img src="<?php echo plugin_dir_url( __FILE__ ) . 'images/chatbot-icons/icon-15.png'?>" width="35" height="35">
	                        </label>

	                        <label>
	                            <input type="radio" name="chatbotIconRadioBtnGrp" value="icon-16.png">
	                            <img src="<?php echo plugin_dir_url( __FILE__ ) . 'images/chatbot-icons/icon-16.png'?>" width="35" height="35">
	                        </label> 

	                        <label>
	                            <input type="radio" name="chatbotIconRadioBtnGrp" value="icon-36.png">
	                            <img src="<?php echo plugin_dir_url( __FILE__ ) . 'images/chatbot-icons/icon-36.png'?>" width="35" height="35">
	                        </label>

	                        <label>
	                            <input type="radio" name="chatbotIconRadioBtnGrp" value="icon-37.png">
	                            <img src="<?php echo plugin_dir_url( __FILE__ ) . 'images/chatbot-icons/icon-37.png'?>" width="35" height="35">
	                        </label>

	                        <label>
	                            <input type="radio" name="chatbotIconRadioBtnGrp" value="icon-38.png">
	                            <img src="<?php echo plugin_dir_url( __FILE__ ) . 'images/chatbot-icons/icon-38.png'?>" width="35" height="35">
	                        </label>

	                        <label>
	                            <input type="radio" name="chatbotIconRadioBtnGrp" value="icon-39.png">
	                            <img src="<?php echo plugin_dir_url( __FILE__ ) . 'images/chatbot-icons/icon-39.png'?>" width="35" height="35">
	                        </label>

	                        <label>
	                            <input type="radio" name="chatbotIconRadioBtnGrp" value="icon-40.png">
	                            <img src="<?php echo plugin_dir_url( __FILE__ ) . 'images/chatbot-icons/icon-40.png'?>" width="35" height="35">
	                        </label>

	                        <label>
	                            <input type="radio" name="chatbotIconRadioBtnGrp" value="icon-41.png">
	                            <img src="<?php echo plugin_dir_url( __FILE__ ) . 'images/chatbot-icons/icon-41.png'?>" width="35" height="35">
	                        </label>

	                        <label>
	                            <input type="radio" name="chatbotIconRadioBtnGrp" value="icon-42.png">
	                            <img src="<?php echo plugin_dir_url( __FILE__ ) . 'images/chatbot-icons/icon-42.png'?>" width="35" height="35">
	                        </label>

	                        <label>
	                            <input type="radio" name="chatbotIconRadioBtnGrp" value="icon-43.png">
	                            <img src="<?php echo plugin_dir_url( __FILE__ ) . 'images/chatbot-icons/icon-43.png'?>" width="35" height="35">
	                        </label>                      
	                </div>
	                <div class="modal-footer">
	                    <button class="kt-tab-invoker btn btn-warning btn-tall btn-wide kt-font-bold kt-font-transform-u userActivityLog" data-dismiss="modal" name="fetchradioButtonData" type="button" id="copy_to_clipboard" onclick="fetchradioButtonData()">Select</button>
	                </div>
	            </div>
	        </div>
	    </div>
		<!--end::User Icon Modal-->

		<!--begin::User Icon Modal-->
		<div class="modal fade" id="chooseIconModalForUser" tabindex="-1" role="dialog" aria-labelledby="chooseIconModalLabel"
        aria-hidden="true">
	        <div class="modal-dialog modal-md" role="document">
	            <div class="modal-content">
	                <div class="modal-header" style="background-color: #651A43;">
	                    <h5 class="modal-title" style="color:white;">Choose User Icon for Your Chatbot</h5>
	                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
	                        <span aria-hidden="true" style="color: white;">×</span>
	                    </button>
	                </div>
	                <div class="modal-body">

	                        <style>
	                                #chooseIconModalForUser input
	                                {
	                                    -webkit-appearance: radio !important;
	                                }

	                        </style>

	                        <label>
	                            <input type="radio" name="userIconRadioBtnGrp" value="young-lady.png">
	                            <img src="<?php echo plugin_dir_url( __FILE__ ) . 'images/user-icon/young-lady.png'?>" width="35" height="35">
	                        </label>
	                        <label>
	                            <input type="radio" name="userIconRadioBtnGrp" value="young-man.png">
	                            <img src="<?php echo plugin_dir_url( __FILE__ ) . 'images/user-icon/young-man.png'?>" width="35" height="35">
	                        </label>
	                        <label>
	                            <input type="radio" name="userIconRadioBtnGrp" value="bride.png">
	                            <img src="<?php echo plugin_dir_url( __FILE__ ) . 'images/user-icon/bride.png'?>" width="35" height="35">
	                        </label>
	                        <label>
	                            <input type="radio" name="userIconRadioBtnGrp" value="old-man.png">
	                            <img src="<?php echo plugin_dir_url( __FILE__ ) . 'images/user-icon/old-man.png'?>" width="35" height="35">
	                        </label>     
	                        <label>
	                            <input type="radio" name="userIconRadioBtnGrp" value="u-icon.png">
	                            <img src="<?php echo plugin_dir_url( __FILE__ ) . 'images/user-icon/u-icon.png'?>" width="35" height="35">
	                        </label>
	                        <label>
	                            <input type="radio" name="userIconRadioBtnGrp" value="guest-icon.png">
	                            <img src="<?php echo plugin_dir_url( __FILE__ ) . 'images/user-icon/guest-icon.png'?>" width="35" height="35">
	                        </label>                      
	                </div>
	                <div class="modal-footer">
	                    <button class="kt-tab-invoker btn btn-warning btn-tall btn-wide kt-font-bold kt-font-transform-u userActivityLog" data-dismiss="modal" name="copy_to_clipboard" type="button" id="copy_to_clipboard" onclick="fetchradioButtonDataForUser()">Select</button>
	                </div>
	            </div>
	        </div>
	    </div>
	    <!--end::User Icon Modal-->
		
		<!-- Added training question delete Modal -->
		<div class="modal fade" id="deleteKBankModal" tabindex="-1" role="dialog" aria-hidden="true">
			<div class="modal-dialog modal-lg" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title">Delete Training Questions</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<form class="kt-form">
							<div class="form-group">
								<label class="form-control-label">Are you sure you want to delete Training Questions?</label>
							</div>
							<div class="row" style="display:none">
                            	<input id="deleteKnowledgeBankId" type="text" class="col-md-6">
                        	</div>
						</form>
					</div>
					<div class="modal-footer justify-content-between">
						<button type="button" name="deleteKnowledgeBank" class="btn btn-danger btn-tall btn-wide kt-font-bold kt-font-transform-u userActivityLog" onclick="deleteTrainingQuestions()" data-dismiss="modal">Delete</button>
					</div>
				</div>
			</div>
		</div>
		<!-- End of delete Modal-->

		<!-- Added training urls delete Modal -->
		<div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-hidden="true">
			<div class="modal-dialog modal-lg" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title">Delete Training URLs</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<form class="kt-form">
							<div class="form-group">
								<label class="form-control-label">Are you sure you want to delete Training URls?</label>
							</div>
							<div class="row" style="display:none">
                            	<input id="deleteKnowledgeBaseURLId" type="text" class="col-md-6">
                        	</div>
						</form>
					</div>
					<div class="modal-footer justify-content-between">
						<button type="button" name="deleteKnowledgeBank" class="btn btn-danger btn-tall btn-wide kt-font-bold kt-font-transform-u" onclick="deleteKnowledgeBaseURL()" data-dismiss="modal">Delete</button>
					</div>
				</div>
			</div>
		</div>
		<!-- End of delete Modal-->

		<!--Start popupCaution modal-->
		<div class="modal fade" id="popupCautionModal" tabindex="-1" role="dialog" aria-hidden="true">
			<div class="modal-dialog modal-lg" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title">Caution</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<form class="kt-form">
							<div class="form-group">
								<div class="row">
									<div class="col-md-8">
										<label class="form-control-label">This will take some time and so hold on to your hats! We will email you when we fetch the full data.</label>
									</div>
									<div class="col-md-1">
										
									</div>
									<div class="col-md-2" style="margin-left: 7%;">
										<button type="button" class="btn userActivityLog" name="updateGoal" style="background-color: #661943; color: white" id="confirmIngestionButton" onclick="ingestAllData()">Continue</button>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
		<!--End popupCaution modal-->
		
		<!-- begin::Global Config(global config for global JS sciprts) -->
		<script>
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
		
		<script>
			var txt_website = "https://syra.ai/";
			var txt_key = null;
			var userCredentials = null;
			var chatbotIcon = "";
			var userIcon = "";
		
		</script>
		<script type="text/javascript">
			var setTrainingQuesId = 0;
			var setTrainingURLId = 0;
			var openingQuestionBody = '';
			var trainingQuesBody = '';
			var trainingURLBody = '';
			
			jQuery(document).on("click" ,"#btnAddOpeningQuestion",function()  
			{
				if(totalQuestionCount < 5)
				{
					totalQuestionCount ++;
					openingQuestionBody = '<li data-repeater-item id="openingQuestion_' + totalQuestionCount + '">' +																'<div class="row">' +
											'<div class="col-lg-6">' +
												'<div class="form-group">' +
													'<label>Opening Question\'s Text</label>'+
													'<textarea class="form-control" rows="3" id=txt_ques'+ totalQuestionCount +' onkeyup="changedemoBotQuestion'+ totalQuestionCount +'()" onkeydown="changedemoBotQuestion'+ totalQuestionCount +'()"></textarea>' +
												'</div>' +
											'</div>' +
											'<div class="col-lg-6">' +
												'<div class="form-group mb-lg-0">' +
													'<label>Opening Question\'s Button Text</label>' +
													'<textarea class="form-control" rows="3" id=txt_display_value' + totalQuestionCount +' onkeyup="changedemoBotQuestion'+ totalQuestionCount +'()" onkeydown="changedemoBotQuestion'+ totalQuestionCount +'()"></textarea>' +
												'</div>' +
											'</div>' +
											'<div class="col-lg-6">' +
												'<div class="form-group mb-lg-0">' +
													'<label>Answer Text or URL</label>' +
													'<textarea class="form-control" rows="3" id=txt_answer_value' + totalQuestionCount +'></textarea>' +
												'</div>' +
											'</div>' +
											'<div class="col-lg-6 text-right">' +
												'<div class="form-group mb-0">' +
													'<a class="kt-link kt-font-bold" href="javascript:;" onclick = "removeQuestion(' + totalQuestionCount +')"><i class="fas fa-trash-alt" style="color: #472235"></i></a>' +
												'</div>' +
											'</div>' +
										'</div>' +			
										'<div class="kt-separator kt-separator--dashed kt-separator--md"></div>' +
									'</li>';
					jQuery("#listOfOpeningQuestions").append(openingQuestionBody);
				}
				else
				{
					swalWithBootstrapButtons.fire({
						text: "Please add atmost 5 opening questions.",
						icon: 'info',
						showCancelButton: true,
						confirmButtonText: 'Okay'
					})
				}
	        });
			jQuery(document).on("click" ,"#btnAddTrainingQues",function()  
			{
				let dt = getCurrentDateTime();
				trainingQuesBody = '<tr data-repeater-item>' +
									'<td>' +
										'<textarea class="form-control kt-form-control--transparent kt-form-control--none-resizable" rows="2" id=kbQuestion' + setTrainingQuesId +'></textarea>' +
									'</td>' +
									'<td>' +
										'<textarea class="form-control kt-form-control--transparent kt-form-control--none-resizable" rows="2" id=kbAnswer' + setTrainingQuesId + '></textarea>' +
									'</td>' +
									'<td class="kt_form_build_knowledge_base_training_questions_date">'+ dt +'</td>' +
									'<td class="text-right" style="width:5%;">' +
									'<a class="kt-link kt-font-bold" href="javascript:;" data-repeater-delete><i class="fas fa-trash-alt" style="color: #472235"></i></a>' +
									'</td>' +
									'</tr>';
				
				jQuery('#tbodyForTrainingQuestion').append(trainingQuesBody);
		  		setTrainingQuesId ++;
	        });
			jQuery(document).on("click" ,"#btnAddTrainingURL",function()  {
				let dt = getCurrentDateTime();
				trainingURLBody = '<tr data-repeater-item>' +
					'<td>' +
						'<input class="form-control kt-form-control--transparent urltxt" type="url" id=webURL'+ setTrainingURLId +'>' +
					'</td>'+
					'<td>' +
						'<label class="kt-switch mb-0">' +
							'<span>' +
								'<input type="checkbox" id=recursiveBox_' + setTrainingURLId +'>' +
								'<span></span>' +
							'</span>' +
						'</label>' +
					'</td>' +
					'<td class="kt_form_build_knowledge_base_training_urls_date">'+ dt +'</td>' +
					'<td class="text-right" style="width:5%;">' +
						'<a class="kt-link kt-font-bold" href="javascript:;" data-repeater-delete><i class="fas fa-trash-alt" style="color: #472235"></i></a>' +
					'</td>' +
				'</tr>';
				
				jQuery('#tbodyForTrainingURLs').append(trainingURLBody);
		  		
		  		setTrainingURLId ++;
	        }); 
			jQuery(document).on("click" ,"#finalSubmitBtn",function()  {
				for(var elementId=0; elementId<setTrainingURLId; elementId++){
					var recusiveUrlCheck = jQuery("#recursiveBox_" + elementId).is(":checked");
					var recursiveValue = 'n';
					var search = jQuery("#webURL"+elementId).val();
					if(typeof search !== 'undefined'){
						if(recusiveUrlCheck){	
							recursiveValue = "y";
						}
						else{
							recursiveValue = "n";
						}
						addTrainingURLs(search, recursiveValue);
					}
				}
	        }); 
	        jQuery(document).on("click" ,"#submitTrainingQuestion",function()  {
				for(var elementId=0; elementId<setTrainingQuesId; elementId++){
					var search = jQuery("#kbQuestion"+elementId).val();
					if(typeof search !== 'undefined'){
						addTrainingQuestion(jQuery("#kbQuestion"+elementId).val(), jQuery("#kbAnswer"+elementId).val());
					}
				}
	        });
	        jQuery(document).on("click" ,"#submitOpeningQuestion",function()  {
				addOpeningQuestions(jQuery("#txt_ques1").val(), jQuery("#txt_display_value1").val(), jQuery("#txt_answer_value1").val(), jQuery("#txt_ques2").val(), jQuery("#txt_display_value2").val(), jQuery("#txt_answer_value2").val(), jQuery("#txt_ques3").val(), jQuery("#txt_display_value3").val(), jQuery("#txt_answer_value3").val(), jQuery("#txt_ques4").val(), jQuery("#txt_display_value4").val(), jQuery("#txt_answer_value4").val(), jQuery("#txt_ques5").val(),jQuery("#txt_display_value5").val(),  jQuery("#txt_answer_value5").val())
				this.id = 'submitTrainingQuestion';
	        }); 

	        jQuery(document).on("click", "#defaultButton", function(){
				jQuery( "#divShopifyPromotion" ).show();
				document.getElementsByClassName("btnDefault")[0].id = 'btnPageShopifyPromotion';
			});

			jQuery(document).on("click", "#btnPageShopifyPromotion", function(){
				document.getElementsByClassName("btnDefault")[0].id = 'submitOpeningQuestion';
			});

			function removeQuestion(id)
			{
				swalWithBootstrapButtons.fire({
					title: 'Are you sure?',
					text: "Question will be deleted permanatly.",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonText: 'Yes, delete it!'
					}).then((result) => {
					if (result.value) {
						var removeElementId = "#openingQuestion_" + id;
						jQuery(removeElementId).remove();
						totalQuestionCount --;
						swalWithBootstrapButtons.fire({
							text: "Question was deleted successfully.",
							icon: 'success',
							showCancelButton: true,
							confirmButtonText: 'Okay'
						})
					}
				})
			}
		
		</script>

		<script>
			
			function deployChatBot(){
				if(selectedDomainId == "10"){
					if(jQuery("#chatbotIconImage").attr("name") == "")
					{
						jQuery("#chatbotIconImage").attr("name","icon-40.png");
					}
				}
				else{
					if(jQuery("#chatbotIconImage").attr("name") == "")
					{
						jQuery("#chatbotIconImage").attr("name","icon-04.png");
					}
				}
				
				if(jQuery("#userIconImage").attr("name") == ""){
					jQuery("#userIconImage").attr("name","young-lady.png");
				}
				var isPreviewChecked = 0;
				var previewMessageCheck = jQuery("#badgeSelect").is(":checked");
				if(previewMessageCheck){	
					isPreviewChecked = 1;
				}
				else{
					isPreviewChecked = 0;
				}
			    var form = new FormData();        
			    form.append("customerId", email);
				form.append("name", jQuery('#txt_name').val().trim());
				if(jQuery('#txt_description').val() == ""){
					form.append("description", "Add a nice little description here!");
				}
				else{
					form.append("description", jQuery('#txt_description').val().trim());
				}
				if(jQuery('#txt_wmsg').val() == ""){
					form.append("welcomeMessage", "Change this message to something welcoming!");
				}
				else{
					form.append("welcomeMessage", jQuery('#txt_wmsg').val());
				}
				if(jQuery('#txt_preview').val() == ""){
					jQuery('#txt_preview').val("Can I help you?");
				}
				if(jQuery('#contactURL').val() == ""){
					jQuery('#contactURL').val("https://cloudhiti.ai/contact/")
				}
			    form.append("chatbotIcon", jQuery("#chatbotIconImage").attr("name"));
			    form.append("userIcon", jQuery("#userIconImage").attr("name"));
			    form.append("backGroundColor", jQuery('#txt_bckcol').val().replace('#',''));
			    form.append("widgetBackgroundColor", jQuery('#widgetBackgroundColor').val().replace('#',''));
			    form.append("botResponseBackgroundColor", jQuery('#botResponseBackgroundColor').val().replace('#',''));
			    form.append("userQuestionBackgroundColor", jQuery('#userQuestionBackgroundColor').val().replace('#',''));
			    form.append("leadOnBtnBackgroundColor", jQuery('#leadOnBtnBackgroundColor').val().replace('#',''));
				form.append("contactURL", jQuery('#contactURL').val());
				form.append("privacyURL", jQuery('#privacyURL').val());
			    form.append("isPlanActive", 1);
			    form.append("website", txt_website);
				form.append("apiKey", jQuery('#txt_key').val());
				form.append("previewMessage", jQuery('#txt_preview').val());
				form.append("previewMessageBackGroundColor", jQuery('#badgeTextBackgroundColor').val().replace('#',''));
				form.append("isPreviewChecked", isPreviewChecked);

			    var botName = jQuery('#txt_name').val().trim();

			    var domainId = "12";
				if(selectedDomainId == 11)
				{
					domainId = "11";
					form.append("domainId", domainId);
					form.append("question1", "Create new request.");
					form.append("displayValueOfQuestion1", "Create new Support Ticket");
					form.append("answerUrl1", "");
					form.append("question2", "Comment request");
					form.append("displayValueOfQuestion2", "Search in Comments");
					form.append("answerUrl2", "");
					form.append("question3", "Search request");
					form.append("displayValueOfQuestion3", "Search Support Tickets");
					form.append("answerUrl3", "");
					form.append("question4", "Show request");
					form.append("displayValueOfQuestion4", "Show Support Tickets");
					form.append("answerUrl4", "");
					form.append("question5", "List requests");
					form.append("displayValueOfQuestion5", "List Support Tickets");
					form.append("answerUrl5", "");

				}
				   
				else{
					form.append("domainId", domainId);
					form.append("question1", "");
					form.append("displayValueOfQuestion1", "");
					form.append("answerUrl1", "");
					form.append("question2", "");
					form.append("displayValueOfQuestion2", "");
					form.append("answerUrl2", "");
					form.append("question3", "");
					form.append("displayValueOfQuestion3", "");
					form.append("answerUrl3", "");
					form.append("question4", "");
					form.append("displayValueOfQuestion4", "");
					form.append("answerUrl4", "");
					form.append("question5", "");
					form.append("displayValueOfQuestion5", "");
					form.append("answerUrl5", "");
				}

			    if(jQuery('#txt_name').val().trim() == ""){
					jQuery("#txt_name").css("border","red 1px solid");
					swalWithBootstrapButtons.fire({
						text: "Please name your Syra AI Chatbot.",
						icon: 'info',
						showCancelButton: false,
						confirmButtonText: 'Okay'
					})
			        // jQuery("#msgArea").html("<b><font style='color:#5A679E;font-size:9x'>Chatbot should have a name</font></b>");
			        jQuery("#btnFinish").prop("disabled", false);//to enable the finish button
			        return;
			    }
			    else if((jQuery('#txt_key').val().trim() == "") && selectedDomainId!=10)//For Shopify We
			    {
			        jQuery("#msgArea").html("<b><font style='color:#5A679E;font-size:9x'>Project API Key Needed From Natura</font></b>");
			        jQuery("#btnFinish").prop("disabled", false);//to enable the finish button
			        return;
			    }  
			    var settings = {
			        "async": true,
			        "crossDomain": true,
			        "url": url_resource + "/syraconsumer/create-botDeploment",
			        "method": "POST",
			        headers: {
			                'Authorization': 'Bearer '+access_token,
			        },
			        "processData": false,
			        "contentType": false,
			        "mimeType": "multipart/form-data",
			        "data": form
			    }
			    jQuery.ajax(settings).done(function (response) 
			    {            

			        jQuery("#btnFinish").prop("disabled", false);//to enable the finish button

			        response = JSON.parse(response);
			        if(response.status === 201)
			        {
			            //deployedURL = "http://localhost/Syra-AI-Chatbots/frontend" + response.deployedURL;
						deployedURL = url_resource + response.deployedURL;
						userExitstingChatbot = true;
			            jQuery('#txt_website').val("");
			            jQuery('#txt_key').val("");
			            var botdeploymentId = response.botId;
			            var uuid = response.uuid;
			            var goalName = jQuery('#txt_goalName').val();
						var goalURL = jQuery('#txt_goalURL').val();
						insertNotificationData("3","Need to take action",email);
						if(!customizeBtnClick){
							setupWizardTrain();
						}
						if(selectedDomainId==10)//If the user select the Shopify in the Domain DropDown, then Shopify APi would be called
						{   
							
							var form = new FormData();
							form.append("botdeploymentId", botdeploymentId);
							form.append("storeName", shopify_store_name);
							form.append("secretKey", "");
							form.append("apikey", "");
							form.append("accessToken", shopify_access_token);
							form.append("apiVersion", "");
							var settings = 
							{
								"async": true,
								"url": url_resource + "/syraconsumer/create-shopify-store",
								"method": "POST",
								headers: {
									'Authorization': 'Bearer '+access_token,
								},
								"processData": false,
								"contentType": false,
								"mimeType": "multipart/form-data",
								"data": form
							}
							jQuery.ajax(settings).done(function (response) 
							{
								response=JSON.parse(response);
								if(response.status===200)
								{
									var api_key = "";
									var api_secret = "";
									var shop = shopify_store_name;
									var username = domainId + "_" + uuid;
									var password1="";
									var writedata = 1;
									CreateShopifyUserDatabaseAndPopulate(api_key,api_secret,shop,username,password1,deployedURL, writedata);
								}
								else
								{
									swalWithBootstrapButtons.fire
									({
										text: 'create-shopify-store Response Error!!',
										icon: "error",
										confirmButtonText: 'Okay'
									});
								}                        
							
							})
							.fail(function(response) 
							{           
								jQuery("#shopifyBotCreateMsgArea").html('create-shopify-store'+' -> '+response.status+' -> '+response.statusText);
								swalWithBootstrapButtons.fire
								({
									text: 'create-shopify-store'+' -> '+response.status+' -> '+response.statusText,
									icon: "error",
									confirmButtonText: 'Okay'
								});
							
							});
						}
						swalWithBootstrapButtons.fire({
							text: "Your Syra AI Chatbot was deployed successfully.",
							icon: 'success',
							showCancelButton: false,
							confirmButtonText: 'Okay'
						})
		                .then((value) => {
		                    if (value) {
								fetchBot();
								// window.open(deployedURL, '_blank');
								// setTimeout(() => { window.location.reload(); }, 2000);
		                    } 
		                });                  
			        }
			        else
			        {
			            jQuery("#deployBotMsgArea").html("<b><font style='color:#5A679E;font-size:9x'>"+response.message+"</font></b>");
			        }
			    })
			    .fail(function(response) 
			    {           

			        jQuery("#deployBotMsgArea").html(response.statusText);
			        swalWithBootstrapButtons.fire({
			            text: 'create-botDeploment'+' -> '+response.status+' -> '+response.statusText,
			            icon: "error",
			            confirmButtonText: 'Okay'
			        });
			        jQuery("#btnFinish").prop("disabled", false);//to enable the finish button

			    });
			}
			
		</script>
		<script>
			jQuery(function() {
				jQuery(".userActivityLog").click(function() {
					var pageName = "setupWizard";
					var activityName = this.name;
					if(activityName == undefined){
						activityName = jQuery(this).attr('name');
					}
					if(typeof(botDeploymentId) == "undefined"){
							botDeploymentId = "";
					}
					
					var form = new FormData();
					form.append("pageName", pageName);
					form.append("activityName", activityName);
					form.append("browser",userBrowserType);
					form.append("customerId", document.cookie.match(new RegExp('(^| )email=([^;]+)'))[2]);
					form.append("projectId", botDeploymentId);
		
					var settings = 
					{
						"async": true,
						"url": url_resource + "/syraconsumer/insert-into-user-activity-log",
						"method": "POST",
						headers: {
							'Authorization': 'Bearer '+access_token,
						},
						"processData": false,
						"contentType": false,
						"mimeType": "multipart/form-data",
						"data": form
					}
					jQuery.ajax(settings).done(function (response) {});
				});
			});
			//personal tab first name value change
			var previous_txt_fname_Value = jQuery("#txt_fname").val();
			jQuery("#txt_fname").keyup(function(e) {
				var currentValue = jQuery(this).val();
				if(currentValue != previous_txt_fname_Value) {
					previous_txt_fname_Value = currentValue;
					jQuery("#txt_fname").addClass("personal_tab_value-changed");
				}
			});

			//personal tab last name value change
			var previous_txt_lname_Value = jQuery("#txt_lname").val();
			jQuery("#txt_lname").keyup(function(e) {
				var currentValue = jQuery(this).val();
				if(currentValue != previous_txt_lname_Value) {
					previous_txt_lname_Value = currentValue;
					jQuery("#txt_lname").addClass("personal_tab_value-changed");
				}
			});

			//personal tab email value change
			var previous_txt_email_Value = jQuery("#txt_email").val();
			jQuery("#txt_email").keyup(function(e) {
				var currentValue = jQuery(this).val();
				if(currentValue != previous_txt_email_Value) {
					previous_txt_email_Value = currentValue;
					jQuery("#txt_email").addClass("personal_tab_value-changed");
				}
			});

			//personal tab email value change
			var previous_txt_title_Value = jQuery("#txt_title").val();
			jQuery("#txt_title").keyup(function(e) {
				var currentValue = jQuery(this).val();
				if(currentValue != previous_txt_title_Value) {
					previous_txt_title_Value = currentValue;
					jQuery("#txt_title").addClass("personal_tab_value-changed");
				}
			});

			//Contact Details address1 value change
			var previous_txt_add_Value = jQuery("#txt_add").val();
			jQuery("#txt_add").keyup(function(e) {
				var currentValue = jQuery(this).val();
				if(currentValue != previous_txt_add_Value) {
					previous_txt_add_Value = currentValue;
					jQuery("#txt_add").addClass("contact_tab_value_changed");
				}
			});

			//Contact details address2 value change
			var previous_txt_address2_Value = jQuery("#txt_address2").val();
			jQuery("#txt_address2").keyup(function(e) {
				var currentValue = jQuery(this).val();
				if(currentValue != previous_txt_address2_Value) {
					previous_txt_address2_Value = currentValue;
					jQuery("#txt_address2").addClass("contact_tab_value_changed");
				}
			});

			//Contact details city value change
			var previous_txt_city_Value = jQuery("#txt_city").val();
			jQuery("#txt_city").keyup(function(e) {
				var currentValue = jQuery(this).val();
				if(currentValue != previous_txt_city_Value) {
					previous_txt_city_Value = currentValue;
					jQuery("#txt_city").addClass("contact_tab_value_changed");
				}
			});

			//Contact details country value change
			var previous_txt_country_Value = jQuery("#txt_country").val();
			jQuery("#txt_country").keyup(function(e) {
				var currentValue = jQuery(this).val();
				if(currentValue != previous_txt_country_Value) {
					previous_txt_country_Value = currentValue;
					jQuery("#txt_country").addClass("contact_tab_value_changed");
				}
			});

			//Contact details zip value change
			var previous_txt_zip_Value = jQuery("#txt_zip").val();
			jQuery("#txt_zip").keyup(function(e) {
				var currentValue = jQuery(this).val();
				if(currentValue != previous_txt_zip_Value) {
					previous_txt_zip_Value = currentValue;
					jQuery("#txt_zip").addClass("contact_tab_value_changed");
				}
			});

			//Contact details zip value change
			var previous_txt_contact_Value = jQuery("#txt_contact").val();
			jQuery("#txt_contact").keyup(function(e) {
				var currentValue = jQuery(this).val();
				if(currentValue != previous_txt_contact_Value) {
					previous_txt_contact_Value = currentValue;
					jQuery("#txt_contact").addClass("contact_tab_value_changed");
				}
			});

			//Company Details company value change
			var previous_txt_company_Value = jQuery("#txt_company").val();
			jQuery("#txt_company").keyup(function(e) {
				var currentValue = jQuery(this).val();
				if(currentValue != previous_txt_company_Value) {
					previous_txt_company_Value = currentValue;
					jQuery("#txt_company").addClass("company_tab_value_changed");
				}
			});

			var previous_txt_web_Value = jQuery("#txt_web").val();
			jQuery("#txt_web").keyup(function(e) {
				var currentValue = jQuery(this).val();
				if(currentValue != previous_txt_web_Value) {
					previous_txt_web_Value = currentValue;
					jQuery("#txt_web").addClass("company_tab_value_changed");
				}
			});

			var previous_txt_fb_Value = jQuery("#txt_fb").val();
			jQuery("#txt_fb").keyup(function(e) {
				var currentValue = jQuery(this).val();
				if(currentValue != previous_txt_fb_Value) {
					previous_txt_fb_Value = currentValue;
					jQuery("#txt_fb").addClass("company_tab_value_changed");
				}
			});

			var previous_txt_tax_Value = jQuery("#txt_tax").val();
			jQuery("#txt_tax").keyup(function(e) {
				var currentValue = jQuery(this).val();
				if(currentValue != previous_txt_tax_Value) {
					previous_txt_tax_Value = currentValue;
					jQuery("#txt_tax").addClass("company_tab_value_changed");
				}
			});

			//Customize tab chatbot name change
			var previous_txt_name_Value = jQuery("#txt_name").val();
			jQuery("#txt_name").keyup(function(e) {
				var currentValue = jQuery(this).val();
				if(currentValue != previous_txt_name_Value) {
					previous_txt_name_Value = currentValue;
					jQuery("#txt_name").addClass("customize_tab_value_changed");
				}
			});

			//Customize tab description change
			var previous_txt_description_Value = jQuery("#txt_description").val();
			jQuery("#txt_description").keyup(function(e) {
				var currentValue = jQuery(this).val();
				if(currentValue != previous_txt_description_Value) {
					previous_txt_description_Value = currentValue;
					jQuery("#txt_description").addClass("customize_tab_value_changed");
				}
			});

			//Customize Welcome message change
			var previous_txt_wmsg_Value = jQuery("#txt_wmsg").val();
			jQuery("#txt_wmsg").keyup(function(e) {
				var currentValue = jQuery(this).val();
				if(currentValue != previous_txt_wmsg_Value) {
					previous_txt_wmsg_Value = currentValue;
					jQuery("#txt_wmsg").addClass("customize_tab_value_changed");
				}
			});

			//Customize contact url change
			var previous_contactURL_Value = jQuery("#contactURL").val();
			jQuery("#contactURL").keyup(function(e) {
				var currentValue = jQuery(this).val();
				if(currentValue != previous_contactURL_Value) {
					previous_contactURL_Value = currentValue;
					jQuery("#contactURL").addClass("customize_tab_value_changed");
				}
			});

			var chatbotbackgroundColorPicker = document.getElementById('txt_bckcol');
			var previous_txt_bckcol_Value = jQuery("#txt_bckcol").val();
			chatbotbackgroundColorPicker.addEventListener('focus', function(){
				var currentValue = jQuery(this).val();
				if(currentValue != previous_txt_bckcol_Value) {
					previous_txt_bckcol_Value = currentValue;
					jQuery("#txt_bckcol").addClass("customize_tab_value_changed");
				}
			});

			var chatbotWidgetColorPicker = document.getElementById('widgetBackgroundColor');
			var previous_widgetBackgroundColor_Value = jQuery("#widgetBackgroundColor").val();
			chatbotWidgetColorPicker.addEventListener('change', function(){
				var currentValue = jQuery(this).val();
				if(currentValue != previous_widgetBackgroundColor_Value) {
					previous_widgetBackgroundColor_Value = currentValue;
					jQuery("#widgetBackgroundColor").addClass("customize_tab_value_changed");
				}
			});

			var chatbotWidgetLeadOnColorPicker = document.getElementById('leadOnBtnBackgroundColor');
			var previous_leadOnBtnBackgroundColor_Value = jQuery("#leadOnBtnBackgroundColor").val();
			chatbotWidgetLeadOnColorPicker.addEventListener('change', function(){
				var currentValue = jQuery(this).val();
				if(currentValue != previous_leadOnBtnBackgroundColor_Value) {
					previous_leadOnBtnBackgroundColor_Value = currentValue;
					jQuery("#leadOnBtnBackgroundColor").addClass("customize_tab_value_changed");
				}
			});

			var userQuestionBackgroundColorPicker = document.getElementById('userQuestionBackgroundColor');
			var previous_userQuestionBackgroundColor_Value = jQuery("#userQuestionBackgroundColor").val();
			userQuestionBackgroundColorPicker.addEventListener('change', function(){
				var currentValue = jQuery(this).val();
				if(currentValue != previous_userQuestionBackgroundColor_Value) {
					previous_userQuestionBackgroundColor_Value = currentValue;
					jQuery("#userQuestionBackgroundColor").addClass("customize_tab_value_changed");
				}
			});

			var badgeTextBackgroundColorPicker = document.getElementById('badgeTextBackgroundColor');
			var previous_badgeTextBackgroundColor_Value = jQuery("#badgeTextBackgroundColor").val();
			badgeTextBackgroundColorPicker.addEventListener('change', function(){
				var currentValue = jQuery(this).val();
				if(currentValue != previous_badgeTextBackgroundColor_Value) {
					previous_badgeTextBackgroundColor_Value = currentValue;
					jQuery("#badgeTextBackgroundColor").addClass("customize_tab_value_changed");
				}
			});

			var botResponseBackgroundColorPicker = document.getElementById('botResponseBackgroundColor');
			var previous_botResponseBackgroundColor_Value = jQuery("#botResponseBackgroundColor").val();
			botResponseBackgroundColorPicker.addEventListener('change', function(){
				var currentValue = jQuery(this).val();
				if(currentValue != previous_botResponseBackgroundColor_Value) {
					previous_botResponseBackgroundColor_Value = currentValue;
					jQuery("#botResponseBackgroundColor").addClass("customize_tab_value_changed");
				}
			});

			var previous_badge_text = jQuery('#txt_preview').val();

		</script>
	</body>
	
	<!-- end::Body -->
</html>
