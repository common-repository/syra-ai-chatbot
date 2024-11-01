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
		<title>Syra | Settings</title>
		<meta name="description" content="Latest updates and statistic charts">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">	

		<script>
			wp_path = "<?php echo plugin_dir_url( __FILE__ ) ?>";
			var email = "";
			var access_token="";
			var subscriptionLeadsData = [];
			var swalWithBootstrapButtons = Swal.mixin({
				customClass: {
				confirmButton: 'btn btn-warning btn-tall btn-wide kt-font-bold kt-font-transform-u userActivityLog',
				cancelButton: 'btn btn-label-brand btn-label btn-md btn-tall btn-wide kt-font-bold kt-font-transform-u userActivityLog'
				},
				buttonsStyling: false
			})
			jQuery(document).ready(function(){
				userBrowserType = detectUserBrowserType();
				var match = document.cookie.match(new RegExp('(^| )email=([^;]+)'));
                email = match[2];

                //to fetch access-token from cookies
                var match2 = document.cookie.match(new RegExp('(^| )access_token=([^;]+)'));
                access_token=match2[2];

                if (document.cookie.match(new RegExp('(^| )email=([^;]+)')) == null) {
                    window.location.href = 'index.html';
                }
                includeMobileHeader();
				includeSidePanel();
				var userDetails_Data = extractUserDetaisFromCookie();
				includeHeader(userDetails_Data["username"]);
				populateHelpTable();
				populateNotificationTable(userDetails_Data["email"], userDetails_Data["access_token"]);
				customerFetch();
				fetchBot('settingPage');
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
										<a href="#" class="kt-menu__link kt-menu__toggle userActivityLog" name="personalTab" data-toggle="tab" data-target="#kt_tabs_top_personal_details">
											<span class="kt-menu__link-text">Personal Details</span>
										</a>
									</li>	
									<li class="kt-menu__item">
										<a href="#" class="kt-menu__link kt-menu__toggle userActivityLog" name="contactTab" data-toggle="tab" data-target="#kt_tabs_top_company_details">
											<span class="kt-menu__link-text">Company Details</span>
										</a>
									</li>
									<li class="kt-menu__item" id="setup-wizard-get-subscription-plan">
										<a href="#" class="kt-menu__link kt-menu__toggle userActivityLog" name="subscriptionPlanTab" data-toggle="tab" data-target="#kt_tabs_top_get_subscription_plan">
											<span class="kt-menu__link-text">Subscription Plans</span>
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
										
										<div class="tab-pane active" id="kt_tabs_top_personal_details" role="tabpanel">
											<div class="container kt-container--md">
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
													<div class="col-lg-6" style="margin-top: 3%;">
														<div class="form-group">
															<label>Address 1</label>
															<textarea class="form-control" rows="5" id="txt_add"></textarea>
														</div>
													</div>
													<div class="col-lg-6" style="margin-top: 3%;">
														<div class="form-group">
															<label>Address 2</label>
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
												</div>
												
												<div class="kt-separator kt-separator--border-dashed kt-separator--space-lg"></div>
												
												<div class="row">
													<div class="col-lg-6">
														<div id="personalDetailsMsgArea"></div>
													</div>
													<div class="col-lg-6">
														<button class="btn btn-warning btn-tall btn-wide kt-font-bold kt-font-transform-u userActivityLog" name="updatePersonal" type="button" onclick="updatePersonalDetails(); updateContactDetails();">Update</button>
													</div>
												</div>
											</div>
										</div>

										<div class="tab-pane" id="kt_tabs_top_get_subscription_plan" role="tabpanel">
											<div class="container kt-container--md">
												<form class="kt-form" id="kt_form_subscribers">
													<div class="row">
														<div class="col-lg-12" style="top: 45%; position: absolute; left:20%;">
															<h4>For a limited time, all features of Syra AI Chatbot are being offered FREE!</h4>
														</div>
													</div>
												</form>
											</div>
										</div>

										<div class="tab-pane" id="kt_tabs_top_company_details" role="tabpanel">
											<div class="container kt-container--md">
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
															<input type="url" class="form-control">
														</div>
													</div>
												</div>
												
												<!-- <div class="kt-separator kt-separator--border-dashed kt-separator--space-lg"></div> -->
												
												<div class="row">
													<div class="col-lg-6">
														<div id="companyDetailsMsgArea"></div>
													</div>
													<div class="col-lg-6">
														<button class="btn btn-warning btn-tall btn-wide kt-font-bold kt-font-transform-u userActivityLog" name="updateCompany" onclick="updateCompanyDetails()" type="button">Update</button>
													</div>
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
		</script>
	</body>
	
	<!-- end::Body -->
</html>
