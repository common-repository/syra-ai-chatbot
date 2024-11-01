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
		<title>Syra | Analytics</title>
		<meta name="description" content="Latest updates and statistic charts">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		
		<script>
			wp_path = "<?php echo plugin_dir_url( __FILE__ ) ?>";
			jQuery(document).ready(function(){
				userBrowserType = detectUserBrowserType();
				includeMobileHeader();
				includeSidePanel();
				var userDetails_Data = extractUserDetaisFromCookie();
				includeHeader(userDetails_Data["username"]);
				populateHelpTable();
				populateNotificationTable(userDetails_Data["email"], userDetails_Data["access_token"]);
				fetchBot("analyticsPage");
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
					<div id="kt_header" class="kt-header kt-grid__item"></div>
					
					<!-- end:: Header -->
					<div class="kt-container kt-container--fluid kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor kt-grid--stretch py-5">
						<!-- begin: Header Menu -->
						<div class="kt-header-menu-wrapper" id="kt_top_menu_wrapper">
							<div class="kt-header-menu kt-header-menu-mobile" id="kt_top_menu">
								<ul class="kt-menu__nav" role="tablist">
									<li class="kt-menu__item kt-menu__item--here">
										<a href="#" class="kt-menu__link kt-menu__toggle userActivityLog" name="usersTab" data-toggle="tab" data-target="#kt_tabs_top_users">
											<span class="kt-menu__link-text">Users</span>
										</a>
									</li>
									<li class="kt-menu__item">
										<a href="#" class="kt-menu__link kt-menu__toggle userActivityLog" name="sessionTab" data-toggle="tab" data-target="#kt_tabs_top_sessions">
											<span class="kt-menu__link-text">Sessions</span>
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
									
									<!-- begin:: Subheader -->
									<div class="kt-subheader kt-grid__item my-0" id="kt_subheader">
										<div class="kt-container kt-container--fluid px-0">
											<div class="kt-subheader__main">
												<h3 class="kt-subheader__title" id="projectArea"></h3>
												<span class="kt-subheader__separator kt-hidden"></span>
											</div>
											<div class="kt-subheader__toolbar">
												<div class="kt-subheader__wrapper">
													<a class="kt-link kt-font-bold userActivityLog" target="_blank" href="https://syra.ai/support__trashed/easy-customer-analytics-on-syra-ai-chatbot/" name="howdoIanalyze">How do I analyze the performance of my Chatbot?</a>
												</div>
											</div>
										</div>
									</div>
									
									<!-- end:: Subheader -->
									
									<div class="kt-separator kt-separator--border-dashed kt-separator--space-lg"></div>
									
									<div class="tab-content">
										<div class="tab-pane active" id="kt_tabs_top_users" role="tabpanel">
											<div class="row">
												<div class="col-lg-4">
													
													<!-- begin:: Iconbox -->
													<div class="kt-portlet kt-iconbox kt-iconbox--brand kt-iconbox--animate-slower h-lg-100 p-0 mb-lg-0">
														<div class="kt-portlet__body">
															<div class="kt-iconbox__body">
																<div class="kt-iconbox__desc">
																	<h2 class="kt-iconbox__title" id="usersInMonth"></h2>
																	<div class="kt-iconbox__content kt-iconbox__content--lg">Users in Last 30 days</div>
																</div>
															</div>
														</div>
													</div>
													<!-- end:: Iconbox -->
												</div>
												<div class="col-lg-4">
													
													<!-- begin:: Iconbox -->
													<div class="kt-portlet kt-iconbox kt-iconbox--brand kt-iconbox--animate-slower h-lg-100 p-0 mb-lg-0">
														<div class="kt-portlet__body">
															<div class="kt-iconbox__body">
																<div class="kt-iconbox__desc">
																	<h2 class="kt-iconbox__title" id="uniqueCountry"></h2>
																	<div class="kt-iconbox__content kt-iconbox__content--lg">Unique Countries in Last 30 days</div>
																</div>
															</div>
														</div>
													</div>
													<!-- end:: Iconbox -->
												</div>
												<div class="col-lg-4">
													
													<!-- begin:: Iconbox -->
													<div class="kt-portlet kt-iconbox kt-iconbox--brand kt-iconbox--animate-slower h-lg-100 p-0 mb-lg-0">
														<div class="kt-portlet__body">
															<div class="kt-iconbox__body">
																<div class="kt-iconbox__desc">
																	<h2 class="kt-iconbox__title" id="avgQuestionsAskedByUser"></h2>
																	<div class="kt-iconbox__content kt-iconbox__content--lg">Avg. # of Questions Asked in Last 30 days</div>
																</div>
															</div>
														</div>
													</div>
													<!-- end:: Iconbox -->
												</div>
											</div>
											
											<div class="kt-separator kt-separator--dashed kt-separator--lg"></div>
											
											<div class="row">
												<div class="col-lg-6 mb-4">
													<div class="kt-portlet h-lg-100">
														<div class="kt-portlet__head">
															<div class="kt-portlet__head-label">
																<span class="kt-portlet__head-icon kt-hidden">
																	<i class="la la-gear"></i>
																</span>
																<h3 class="kt-portlet__head-title">
																	<span class="kt-badge kt-badge--warning kt-badge--inline kt-badge--pill mb-2">Last 30 Days</span>
																	<br>
																	# of Users Per Day
																</h3>
															</div>
															<div class="kt-portlet__head-toolbar">
																<div id="kt_amchart_number_of_users_per_day_export" class="kt-amchart-export-btn"></div>
															</div>
														</div>
														
														<div class="kt-portlet__body pt-0">
															<div id="kt_amchart_number_of_users_per_day" style="height: 400px;"></div>
														</div>
													</div>
												</div>
												
												<div class="col-lg-6 mb-4">
													<div class="kt-portlet h-lg-100">
														<div class="kt-portlet__head">
															<div class="kt-portlet__head-label">
																<span class="kt-portlet__head-icon kt-hidden">
																	<i class="la la-gear"></i>
																</span>
																<h3 class="kt-portlet__head-title">
																	<span class="kt-badge kt-badge--warning kt-badge--inline kt-badge--pill mb-2">Last 30 Days</span>
																	<br>
																	# of Questions Per User
																</h3>
															</div>
															<div class="kt-portlet__head-toolbar">
																<div id="kt_amchart_number_of_questions_per_user_export" class="kt-amchart-export-btn"></div>
															</div>
														</div>
														
														<div class="kt-portlet__body">
															<div id="kt_amchart_number_of_questions_per_user" style="height: 400px;"></div>
														</div>
													</div>
												</div>
												
												<div class="col-lg-6 mb-4">
													<div class="kt-portlet h-lg-100">
														<div class="kt-portlet__head">
															<div class="kt-portlet__head-label">
																<span class="kt-portlet__head-icon kt-hidden">
																	<i class="la la-gear"></i>
																</span>
																<h3 class="kt-portlet__head-title">
																	<span class="kt-badge kt-badge--warning kt-badge--inline kt-badge--pill mb-2">Last 30 Days</span>
																	<br>
																	Most Common Questions
																	<small>(# of Times)</small>
																</h3>
															</div>
															<div class="kt-portlet__head-toolbar">
																<div id="kt_amchart_most_common_questions_export" class="kt-amchart-export-btn"></div>
															</div>
														</div>
														
														<div class="kt-portlet__body">
															<div id="kt_amchart_most_common_questions" style="height: 400px;"></div>
														</div>
													</div>
												</div>
												
												<div class="col-lg-6 mb-4">
													<div class="kt-portlet h-lg-100">
														<div class="kt-portlet__head">
															<div class="kt-portlet__head-label">
																<span class="kt-portlet__head-icon kt-hidden">
																	<i class="la la-gear"></i>
																</span>
																<h3 class="kt-portlet__head-title">
																	<span class="kt-badge kt-badge--warning kt-badge--inline kt-badge--pill mb-2">Last 30 Days</span>
																	<br>
																	# of Questions Per Hour
																</h3>
															</div>
															<div class="kt-portlet__head-toolbar">
																<div id="kt_amchart_number_of_questions_per_hour_export" class="kt-amchart-export-btn"></div>
															</div>
														</div>
														
														<div class="kt-portlet__body pt-0">
															<div id="kt_amchart_number_of_questions_per_hour" style="height: 400px;"></div>
														</div>
													</div>
												</div>
												
												<div class="col-lg-6 mb-4">
													<div class="kt-portlet h-lg-100">
														<div class="kt-portlet__head">
															<div class="kt-portlet__head-label">
																<span class="kt-portlet__head-icon kt-hidden">
																	<i class="la la-gear"></i>
																</span>
																<h3 class="kt-portlet__head-title">
																	<span class="kt-badge kt-badge--warning kt-badge--inline kt-badge--pill mb-2">Last 30 Days</span>
																	<br>
																	Most Common Intents
																	<small>(# of Times)</small>
																</h3>
															</div>
															<div class="kt-portlet__head-toolbar">
																<div id="kt_amchart_most_common_intents_export" class="kt-amchart-export-btn"></div>
															</div>
														</div>
														
														<div class="kt-portlet__body">
															<div id="kt_amchart_most_common_intents" style="height: 400px;"></div>
														</div>
													</div>
												</div>
												
												<div class="col-lg-6 mb-4">
													<div class="kt-portlet h-lg-100">
														<div class="kt-portlet__head">
															<div class="kt-portlet__head-label">
																<span class="kt-portlet__head-icon kt-hidden">
																	<i class="la la-gear"></i>
																</span>
																<h3 class="kt-portlet__head-title">
																	<span class="kt-badge kt-badge--warning kt-badge--inline kt-badge--pill mb-2">Last 30 Days</span>
																	<br>
																	Top 10 Visited Links
																</h3>
															</div>
															<div class="kt-portlet__head-toolbar">
																<div id="kt_amchart_top_ten_visited_links_export" class="kt-amchart-export-btn"></div>
															</div>
														</div>
														
														<div class="kt-portlet__body">
															<div id="kt_amchart_top_ten_visited_links" style="height: 400px;"></div>
														</div>
													</div>
												</div>
												
												<div class="col-lg-12">
													<div class="kt-portlet mb-0">
														<div class="kt-portlet__head">
															<div class="kt-portlet__head-label">
																<span class="kt-portlet__head-icon kt-hidden">
																	<i class="la la-gear"></i>
																</span>
																<h3 class="kt-portlet__head-title">
																	<span class="kt-badge kt-badge--warning kt-badge--inline kt-badge--pill mb-2">Last 30 Days</span>
																	<br>
																	Unique Countries Users Visited From
																	<small>(# of Times)</small>
																</h3>
															</div>
															<div class="kt-portlet__head-toolbar">
																<div id="kt_amchart_unique_countries_users_visited_from_export" class="kt-amchart-export-btn"></div>
															</div>
														</div>
														
														<div class="kt-portlet__body">
															<div id="kt_amchart_unique_countries_users_visited_from" style="height: 500px;"></div>
														</div>
													</div>
												</div>
											</div>
										</div>
										
										<div class="tab-pane" id="kt_tabs_top_sessions" role="tabpanel">
											<div class="row">
												<div class="col-lg-4">
													
													<!-- begin:: Iconbox -->
													<div class="kt-portlet kt-iconbox kt-iconbox--brand kt-iconbox--animate-slower h-lg-100 p-0 mb-lg-0">
														<div class="kt-portlet__body">
															<div class="kt-iconbox__body">
																<div class="kt-iconbox__desc">
																	<h2 class="kt-iconbox__title" id="sessionsInMonth"></h2>
																	<div class="kt-iconbox__content kt-iconbox__content--lg">Sessions in Last 30 Days</div>
																</div>
															</div>
														</div>
													</div>
													<!-- end:: Iconbox -->
												</div>
												<div class="col-lg-4">
													
													<!-- begin:: Iconbox -->
													<div class="kt-portlet kt-iconbox kt-iconbox--brand kt-iconbox--animate-slower h-lg-100 p-0 mb-lg-0">
														<div class="kt-portlet__body">
															<div class="kt-iconbox__body">
																<div class="kt-iconbox__desc">
																	<h2 class="kt-iconbox__title" id="averageQuestionInMonth"></h2>
																	<div class="kt-iconbox__content kt-iconbox__content--lg">Avg. # of Questions Per Session in Last 30 Days</div>
																</div>
															</div>
														</div>
													</div>
													<!-- end:: Iconbox -->
												</div>
												<div class="col-lg-4">
													
													<!-- begin:: Iconbox -->
													<div class="kt-portlet kt-iconbox kt-iconbox--brand kt-iconbox--animate-slower h-lg-100 p-0 mb-lg-0">
														<div class="kt-portlet__body">
															<div class="kt-iconbox__body">
																<div class="kt-iconbox__desc">
																	<h2 class="kt-iconbox__title" id="averageTimeDurationInMonth"></h2>
																	<div class="kt-iconbox__content kt-iconbox__content--lg">Avg. Session Time in Last 30 Days</div>
																</div>
															</div>
														</div>
													</div>
													<!-- end:: Iconbox -->
												</div>
											</div>
											
											<div class="kt-separator kt-separator--dashed kt-separator--lg"></div>
											
											<div class="row">
												<div class="col-lg-6 mb-4 mb-lg-0">
													<div class="kt-portlet h-lg-100">
														<div class="kt-portlet__head">
															<div class="kt-portlet__head-label">
																<span class="kt-portlet__head-icon kt-hidden">
																	<i class="la la-gear"></i>
																</span>
																<h3 class="kt-portlet__head-title">
																	Avg. Session Time Per Day
																	<span class="kt-badge kt-badge--warning kt-badge--inline kt-badge--pill mb-2">Last 30 Days</span>
																	<br>
																</h3>
															</div>
															<div class="kt-portlet__head-toolbar">
																<div id="kt_amchart_average_sessions_time_per_day_export" class="kt-amchart-export-btn"></div>
															</div>
														</div>
														
														<div class="kt-portlet__body">
															<div id="kt_amchart_average_sessions_time_per_day" style="height: 400px;"></div>
														</div>
													</div>
												</div>
												
												<div class="col-lg-6">
													<div class="kt-portlet h-lg-100">
														<div class="kt-portlet__head">
															<div class="kt-portlet__head-label">
																<span class="kt-portlet__head-icon kt-hidden">
																	<i class="la la-gear"></i>
																</span>
																<h3 class="kt-portlet__head-title">
																	<span class="kt-badge kt-badge--warning kt-badge--inline kt-badge--pill mb-2">Last 30 Days</span>
																	<br>
																	# of Questions by Users Per Session
																</h3>
															</div>
															<div class="kt-portlet__head-toolbar">
																<div id="kt_amchart_number_of_questions_by_users_per_session_export" class="kt-amchart-export-btn"></div>
															</div>
														</div>
														
														<div class="kt-portlet__body">
															<div id="kt_amchart_number_of_questions_by_users_per_session" style="height: 400px;"></div>
														</div>
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
		<div id="kt_quick_panel" class="kt-quick-panel">
		</div>
		
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
					form.append("customerId", email);
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
		
	</body>
	
	<!-- end::Body -->
</html>
