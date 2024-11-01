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
		<title>Syra | Dashboard</title>
		<meta name="description" content="Latest updates and statistic charts">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">	

		<script>
			jQuery(document).ready(function(){
				wp_path = "<?php echo plugin_dir_url( __FILE__ ) ?>";
				urlEmail = decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent("email").replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
				key = decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent("key").replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
				userBrowserType = detectUserBrowserType();
				if (urlEmail.length > 0 && key.length > 0) {
					var form = new FormData();
					form.append("email", urlEmail);
					form.append("key", key);

					var settings = 
					{
						"async": true,
						"url": url_resource + "/syraconsumer/customer-authorization",
						"method": "POST",
						"processData": false,
						"contentType": false,
						"mimeType": "multipart/form-data",
						"data": form
					}
					jQuery.ajax(settings).done(function (response) 
					{
						response = JSON.parse(response);
						if (response.status === 200) 
						{
							swalWithBootstrapButtons.fire
							({
								text: 'Please Login to Start',
								icon: "success",
								confirmButtonText: 'Okay'
							})
							.then((value) => {   
								var access_token = decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent("access_token").replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));  
								var shop = decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent("shop").replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));                  
								window.location.href = 'index.html?access_token='+access_token+'&shop='+shop;
							});// if the user clicks on the OK buttonor out side of the swal then it will redirect to index page.
						}
						else 
						{
							
							swalWithBootstrapButtons.fire
							({
								text: response.message,
								icon: "error",
								confirmButtonText: 'Okay'
							});
						}
					})
					.fail(function(response) 
					{   
						swalWithBootstrapButtons.fire
						({
							text: 'customer-authorization'+' -> '+response.status+' -> '+response.statusText,
							icon: "error",
							confirmButtonText: 'Okay'
						});
					
					});
				}
								
				includeMobileHeader();
				var userDetails_Data = extractUserDetaisFromCookie();
				includeHeader(userDetails_Data["username"]);
				includeSidePanel();
				populateHelpTable();
				populateNotificationTable(email, access_token);
				fetchBot("dashboardPage");
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
												<h3 class="kt-subheader__title flex-column align-items-start">
													<span class="mb-1" id="projectArea">Chatbot Name</span>
													<small class="pl-0 mb-1">Created On : <strong id="generatedDateTime"></strong></small>
													<small class="pl-0" id="lastUserSessionLocation"></small>
												</h3>
												<span class="kt-subheader__separator kt-hidden"></span>
											</div>
											<div class="kt-subheader__main kt-subheader__toolbar">
												<!-- <div class="kt-subheader__wrapper">
													<h3 class="kt-subheader__title mb-1">Actions</h3>
													<ul class="list-inline mb-0">
														<li class="list-inline-item">
															<a style="cursor: pointer;" id="customizeTab" onclick="goToCustomize()" name="customize" class="userActivityLog">
																<button type="button" class="btn btn-label btn-label-brand m-0">
																	<i class="pix-png-icon pix-png-settings" style="margin-right: 5%; width: 25px; height: 25px;"></i>Customize
																</button>
															</a>
														</li>
														<li class="list-inline-item">
															<a href="training.html" id="trainingTab" name="buildKnowledgeBaseTab" class="userActivityLog">
																<button type="button" class="btn btn-label btn-label-brand m-0">
																	<i class=" pix-png-icon pix-png-training" style="margin-right: 5%;"></i> Training
																</button>
															</a>
														</li>
														<li class="list-inline-item">
															<a href="#" style="cursor: pointer;" id="previewTab" name="previewTab" class="userActivityLog">
																<button type="button" class="btn btn-label btn-label-brand m-0">
																	<i class="pix-png-icon pix-png-icon--md pix-png-search" style="height: 26px; width:26px; margin-right: 5%;"></i>Preview
																</button>
															</a>
														</li>
													</ul>
												</div> -->
											</div>
											<div class="kt-subheader__main kt-subheader__toolbar">
												<div class="kt-subheader__wrapper">
													<h3 class="kt-subheader__title mb-1">Publish in Various Channels</h3>
													<ul class="list-inline mb-0">
														<li class="list-inline-item">
															<a class="btn btn-label btn-label-brand btn-icon m-0 userActivityLog" name="publishAndRetrainTab" id="globeDashboardIcon">
																<i class="fa fa-globe"></i>
															</a>
														</li>
														<li class="list-inline-item">
															<a id="facebookDashboardIcon" class="btn btn-label btn-label-brand btn-icon m-0 userActivityLog" name="publishAndRetrainTab">
																<i class="fab fa-facebook-square"></i>
															</a>
														</li>
														<li class="list-inline-item">
															<a id="slackDashboardIcon" class="btn btn-label btn-label-brand btn-icon m-0 userActivityLog" name="publishAndRetrainTab">
																<i class="fab fa-slack"></i>
															</a>
														</li>
														<li class="list-inline-item">
															<a id="skypeDashboardIcon" class="btn btn-label btn-label-brand btn-icon m-0 userActivityLog" name="publishAndRetrainTab">
																<i class="fab fa-skype"></i>
															</a>
														</li>
														<li class="list-inline-item">
															<a id="appstoreDashboardIcon" class="btn btn-label btn-label-brand btn-icon m-0 userActivityLog" name="publishAndRetrainTab">
																<i class="fab fa-app-store-ios"></i>
															</a>
														</li>
													</ul>
												</div>
											</div>
										</div>
									</div>
									
									<!-- end:: Subheader -->
									
									<div class="kt-separator kt-separator--border-dashed kt-separator--space-lg"></div>
									
									<div class="row">
										<div class="col-lg-4">
											
											<!-- begin:: Iconbox -->
											<div class="kt-portlet kt-iconbox kt-iconbox--brand kt-iconbox--animate-slower h-lg-100 p-0 mb-lg-0">
												<div class="kt-portlet__body">
													<div class="kt-iconbox__body">
														<div class="kt-iconbox__desc">
															<h2 class="kt-iconbox__title" id="usersInMonth"></h2>
															<div class="kt-iconbox__content kt-iconbox__content--lg">Users This Month</div>
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
															<h2 class="kt-iconbox__title" id="sessionsInMonth"></h2>
															<div class="kt-iconbox__content kt-iconbox__content--lg">Sessions This Month</div>
														</div>
													</div>
												</div>
											</div>
											<!-- end:: Iconbox -->
										</div>
										<div class="col-lg-4" id="goalConvertedDiv">
											
											<!-- begin:: Iconbox -->
											<div class="kt-portlet kt-iconbox kt-iconbox--brand kt-iconbox--animate-slower h-lg-100 p-0 mb-lg-0">
												<div class="kt-portlet__body">
													<div class="kt-iconbox__body">
														<div class="kt-iconbox__desc">
															<h2 class="kt-iconbox__title" id="goalConvertedInMonth"></h2>
															<div class="kt-iconbox__content kt-iconbox__content--lg">Goals Coverted This Month</div>
														</div>
													</div>
												</div>
											</div>
											<!-- end:: Iconbox -->
										</div>

										<div class="col-lg-4" id="countChattersDemographicsDiv" style="display: none;">
											
											<!-- begin:: Iconbox -->
											<div class="kt-portlet kt-iconbox kt-iconbox--brand kt-iconbox--animate-slower h-lg-100 p-0 mb-lg-0">
												<div class="kt-portlet__body">
													<div class="kt-iconbox__body">
														<div class="kt-iconbox__desc">
															<h2 class="kt-iconbox__title" id="countChattersDemographics"></h2>
															<div class="kt-iconbox__content kt-iconbox__content--lg">Unique Countries This Month</div>
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
															<br />
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
															<br />
															Avg. Session Time Per Day
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
										
										<div class="col-lg-12">
											<div class="kt-portlet mb-0">
												<div class="kt-portlet__head">
													<div class="kt-portlet__head-label">
														<span class="kt-portlet__head-icon kt-hidden">
															<i class="la la-gear"></i>
														</span>
														<h3 class="kt-portlet__head-title">
															<span class="kt-badge kt-badge--warning kt-badge--inline kt-badge--pill mb-2">Last 30 Days</span>
															<br />
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
