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
		<title>Syra | Customize</title>
		<meta name="description" content="Latest updates and statistic charts">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">	

		<script>
	        jQuery(document).ready(function () 
	        {
	        	wp_path = "<?php echo plugin_dir_url( __FILE__ ) ?>";     
				userBrowserType = detectUserBrowserType();
				includeMobileHeader();
				var userDetails_Data = extractUserDetaisFromCookie();
				includeHeader(userDetails_Data["username"]);
				includeSidePanel();
				populateHelpTable();
				populateNotificationTable(userDetails_Data["email"], userDetails_Data["access_token"]);
				fetchBot("customize");
			});
			
		</script>
	</head>
	
	<!-- end::Head -->
	
	<!-- begin::Body -->
	<body style="background-image: url(<?php echo plugin_dir_url( __FILE__ ) . 'images/bg-1.jpg'?>)" class="kt-quick-panel--right kt-demo-panel--right kt-offcanvas-panel--right kt-subheader--enabled kt-subheader--transparent kt-page--loading">
		
		<!-- begin:: Page -->
		
		<!-- begin:: Header Mobile -->
		<div id="kt_header_mobile" class="kt-header-mobile">
		</div>
		
		<!-- end:: Header Mobile -->
		<div class="kt-grid kt-grid--hor kt-grid--root">
			<div class="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--ver kt-page">
				<div class="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor kt-wrapper" id="kt_wrapper">
					
					<!-- begin:: Header -->
					<div id="kt_header" class="kt-header kt-grid__item">
						
					</div>
					
					<!-- end:: Header -->
					<div class="kt-container kt-container--fluid kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor kt-grid--stretch py-5">
						<div class="kt-body kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor kt-grid--stretch" id="kt_body">
							<div class="kt-content kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor" id="kt_content">
								<!-- begin:: Content -->
								<div class="kt-container kt-container--fluid kt-grid__item kt-grid__item--fluid py-5">
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
															<!-- <input type="file" class="custom-file-input"> -->
															<span class="custom-file-label" id="chatbotIconImage" name="" data-toggle="modal" data-target="#chooseIconModal">
																<img id="chatbotIconImg" src="<?php echo plugin_dir_url( __FILE__ ) .'images/chatbot-icons/icon-14.png'?>" name="icon-14.png" alt="Show User Icon" height="38" width="39" style="margin-top: -9px;">
															</span>
														</label>
													</div>
												</div>
												<div class="col-lg-6">
													<div class="form-group">
														<label id="userIconLabel">User Icon</label>
														<label class="custom-file">
															<!-- <input type="file" class="custom-file-input"> -->
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
														<input type="text" maxlength="55" class="form-control" id="txt_description" rows="2" onkeyup="changeBotDescription()" onkeydown="changeBotDescription()">
													</div>
												</div>
												<div class="col-12">
													<div class="form-group">
														<label>Greeting</label>
														<label id="welcomeMsgTxtCount" style="padding-left: 20%; color: #543244;"></label>
														<input type="text" class="form-control" maxlength="55" rows="2" id="txt_wmsg" onkeyup="changeBotWelcomeMsg()" onkeydown="changeBotWelcomeMsg()">
													</div>
												</div>
												<div class="col-12">
													<div class="form-group">
														<label>Preview Message</label>
														<label style="padding-left: 20%; color: #543244;" id="counter"> </label>
														<textarea class="form-control" rows="2" maxlength="80" id="txt_preview" onkeyup="changeBotPreviewMsg(this)" onkeydown="changeBotPreviewMsg(this)"></textarea>
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
														<input type="url" class="form-control" placeholder="https://cloudhiti.ai/contact/" id="contactURL">
													</div>
												</div>
												<div class="col-lg-6" style="display: none;" id="privacyDiv">
													<div class="form-group mb-0">
														<label>Privacy URL</label>
														<label style="font-style: italic; font-size: 12px;">(For site visitors giving their contact information).</label>
														<input type="url" class="form-control" id="privacyURL" placeholder="https://cloudhiti.ai/privacy-policy/">
													</div>
												</div>
												<input type="hidden" id="txt_key">
												
											</div>
											
											<div class="kt-separator kt-separator--border-dashed kt-separator--space-lg"></div>
											
											<div class="row">
												<div class="col-auto">
													<button class="btn btn-danger btn-tall btn-wide kt-font-bold kt-font-transform-u userActivityLog" name="resetColor" type="button" onclick="resetColorsIconText()">Reset</button>
												</div>
												<label id="msgArea"></label>
												<div class="col-auto ml-auto">
													<span id="shopifyDataRefreshStatus"></span>
													<button class="btn btn-warning btn-tall btn-wide kt-font-bold kt-font-transform-u userActivityLog" type="button" name="click_to_update_chabot" id="btnCustomize">Update</button>
												</div>
											</div>
										</form>
										
										<!-- begin:: Preview Changes Button -->
										<!-- <a class="kt-preview-changes" href="javascript:;">
											<span class="kt-preview-changes__badge">Preview</span>
											<img class="kt-preview-changes__img" src="assets/dist/media/icons/pixeel/bot.png">
										</a> -->
										<!-- end:: Preview Changes Button -->
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
		<div id="kt_quick_panel" class="kt-quick-panel">
			
		</div>
		
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
	                            <img src="<?php echo plugin_dir_url( __FILE__ ) . 'images/chatbot-icons/icon-40.png' ?>" width="35" height="35">
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
	                            <img src="<?php echo plugin_dir_url( __FILE__ ) . 'images/user-icon/old-man.png' ?>" width="35" height="35">
	                        </label>     
	                        <label>
	                            <input type="radio" name="userIconRadioBtnGrp" value="u-icon.png">
	                            <img src="<?php echo plugin_dir_url( __FILE__ ) . 'images/user-icon/u-icon.png' ?>" width="35" height="35">
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
			jQuery(function() {
				jQuery(".userActivityLog").click(function() {
					
					var path = window.location.pathname;
					var pageName = path.split("/").pop().split(".")[0];
			
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
		</script>
		<!--Setup-wizard Customize Tab-->
		<script>
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
			chatbotbackgroundColorPicker.addEventListener('change', function(){
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

			var botResponseBackgroundColorPicker = document.getElementById('botResponseBackgroundColor');
			var previous_botResponseBackgroundColor_Value = jQuery("#botResponseBackgroundColor").val();
			botResponseBackgroundColorPicker.addEventListener('change', function(){
				var currentValue = jQuery(this).val();
				if(currentValue != previous_botResponseBackgroundColor_Value) {
					previous_botResponseBackgroundColor_Value = currentValue;
					jQuery("#botResponseBackgroundColor").addClass("customize_tab_value_changed");
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

			var previous_privacyURL_Value = jQuery("#privacyURL").val();
			jQuery("#privacyURL").keyup(function(e) {
				var currentValue = jQuery(this).val();
				if(currentValue != previous_privacyURL_Value) {
					previous_privacyURL_Value = currentValue;
					jQuery("#privacyURL").addClass("customize_tab_value_changed");
				}
			});

			var previous_badge_text = jQuery('#txt_preview').val();
		</script>
	</body>
	
	<!-- end::Body -->
</html>
