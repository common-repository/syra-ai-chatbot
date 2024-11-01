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
		<title>Syra | Goals</title>
		<meta name="description" content="Latest updates and statistic charts">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

		<script>
			jQuery(document).ready(function(){
				includeMobileHeader();
				includeSidePanel();
				var userDetails_Data = extractUserDetaisFromCookie();
				includeHeader(userDetails_Data["username"]);
				populateNotificationTable(userDetails_Data["email"], userDetails_Data["access_token"]);
				fetchBot("goalConversionPage");
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
									
									<div class="row">
										<div class="col-lg-4">
											<h5 class="kt-subheader__title flex-column align-items-start">
												<span class="mb-1">Generated on <strong id="generatedDateTime"></strong></span>
											</h5>
										</div>
									</div>

									<div class="row">
										<div class="col-lg-4">
											
											<!-- begin:: Iconbox -->
											<div class="kt-portlet kt-iconbox kt-iconbox--brand kt-iconbox--animate-slower h-lg-100 p-0 mb-lg-0">
												<div class="kt-portlet__body">
													<div class="kt-iconbox__body">
														<div class="kt-iconbox__desc">
															<h2 class="kt-iconbox__title" id="goalConvertedInMonth"></h2>
															<div class="kt-iconbox__content kt-iconbox__content--lg">Goals Converted in Last 30 days</div>
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
															<h2 class="kt-iconbox__title" id="goalConversionPercentageInMonth"></h2>
															<div class="kt-iconbox__content kt-iconbox__content--lg">Goal Conversion % in Last 30 days</div>
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
															<h2 class="kt-iconbox__title" id="avgQuesForGoalConversion"></h2>
															<div class="kt-iconbox__content kt-iconbox__content--lg">Avg. # of Questions for Each Goal Conversion in Last 30 days</div>
														</div>
													</div>
												</div>
											</div>
											<!-- end:: Iconbox -->
										</div>
									</div>
									
									<div class="kt-separator kt-separator--dashed kt-separator--lg"></div>
									
									<div class="container kt-container--md">
										<div id="kt_repeater_goals">
											<ol class="kt-ordered-list" id="userExistingGoals" data-repeater-list></ol>
											
											<div class="row">
												<div class="col-lg-4">
													<label id="goalCreateMessage"></label>
												</div>
											</div>

											<div class="row" style="margin-top: 2%;">
												<div class="col-auto">
													<button class="btn btn-warning btn-tall btn-wide kt-font-bold kt-font-transform-u" type="button" onclick="updateNewGoal()">Update</button>
												</div>
												<div class="col-auto ml-auto">
													<button class="btn btn-label-brand btn-label btn-tall btn-wide kt-font-bold kt-font-transform-u" type="button" data-repeater-create onclick="addNewGoal()">
														<i class="la la-plus pr-0 pr-lg-2"></i>
														<span class="d-none d-lg-inline">Add New Goal</span>
													</button>
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

		<!--main-content ends here-->
		<div class="modal fade" tabindex="-1" role="dialog" aria-hidden="true" id="editModal">
			<div class="modal-dialog modal-lg" role="document">
				<div class="modal-content">
					<!-- Modal Header -->
					<div class="modal-header">
						<h4 id="modalHeader" class="modal-title">Edit Goal</h4>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
					</div>
					<!-- Modal body -->
					<div id="modalBody" class="modal-body">
						<div class="row">
							<span class="offset-md-1 col-md-3" style="margin-top:1.5%"><b>Name :
								</b></span>
							<input id="editGoalName" type="text" class="col-md-7 form-control"></input>
						</div>
						<div class="row" style="padding-top:15px">
							<span class="offset-md-1 col-md-3" style="margin-top:1.5%"><b>URL :
								</b></span>
							<input id="editGoalUrl" type="text" class="col-md-7 form-control"></input>
						</div>
						<div class="row" style="padding-top:15px">
							<span class="offset-md-1 col-md-3" style="margin-top:1.5%"><b>Choose Intent(s):
								</b></span>
						</div>
						<div id="intentBelongsDiv" class="row" style="margin-left: 7%; margin-top: 2%;"></div>
						<div class="row" style="display:none">
							<input id="editGoalId" type="text" class="col-md-6"></input>
						</div>
					</div>
					<!-- Modal footer -->
					<div class="modal-footer">                            
						<button type="button" class="btn userActivityLog" name="updateGoal" style="background-color: #661943; color: white"
						data-dismiss="modal" onclick="updateGoal()">Update</button>
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