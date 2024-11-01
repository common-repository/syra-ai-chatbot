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
		<title>Syra | Training</title>
		<meta name="description" content="Latest updates and statistic charts">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		
		<script>
			var email;
			var access_token;
			jQuery(document).ready(function(){
				wp_path = "<?php echo plugin_dir_url( __FILE__ ) ?>";
				includeMobileHeader();
				includeSidePanel();
				var userDetails_Data = extractUserDetaisFromCookie();
				includeHeader(userDetails_Data["username"]);
				populateHelpTable();
				populateNotificationTable(userDetails_Data["email"], userDetails_Data["access_token"]);
				fetchBot("trainingPage");
			});
		</script>
		<style>
			
			div.pager span {
				display: inline-block;
				width: 2.5em;
				height: 2.5em;
				line-height: 2.5;
				text-align: center;
				cursor: pointer;
				background: #646c9a;;
				color: #fff;
				margin-right: 0.5em;
			}

			div.pager span.active {
				background: #543244;
			}
		</style>
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
					<div id="kt_header" class="kt-header kt-grid__item">
					</div>
					
					<!-- end:: Header -->
					<div class="kt-container kt-container--fluid kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor kt-grid--stretch py-5">
						<!-- begin: Header Menu -->
						<div class="kt-header-menu-wrapper" id="kt_top_menu_wrapper">
							<div class="kt-header-menu kt-header-menu-mobile" id="kt_top_menu">
								<ul class="kt-menu__nav" role="tablist">
									<li class="kt-menu__item kt-menu__item--here">
										<a href="#" class="kt-menu__link kt-menu__toggle" data-toggle="tab" data-target="#kt_tabs_top_build_knowledge_base">
											<span class="kt-menu__link-text">Build Knowledge Base</span>
										</a>
									</li>
									<li class="kt-menu__item">
										<a href="#" class="kt-menu__link kt-menu__toggle" data-toggle="tab" data-target="#kt_tabs_top_schedule_ai_model_training">
											<span class="kt-menu__link-text">Schedule AI Model Training</span>
										</a>
									</li>
									<li class="kt-menu__item">
										<a href="#" class="kt-menu__link kt-menu__toggle" data-toggle="tab" data-target="#kt_tabs_top_give_feedback_for_re_training">
											<span class="kt-menu__link-text">Give Feedback for Re-Training</span>
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
										
										<div class="tab-pane active" id="kt_tabs_top_build_knowledge_base" role="tabpanel">
											<div class="kt-grid kt-wizard-v2" id="kt_wizard_build_knowledge_base" data-ktwizard-state="step-first">
												<div class="kt-grid__item kt-wizard-v2__aside">
													<!--begin: Form Wizard Nav -->
													<div class="kt-wizard-v2__nav">
														<div class="kt-wizard-v2__nav-items kt-wizard-v2__nav-items--clickable">
															<div class="kt-wizard-v2__nav-item" data-ktwizard-type="step" data-ktwizard-state="current" onclick="getOpeningQuestions()">
																<div class="kt-wizard-v2__nav-body">
																	<div class="kt-wizard-v2__nav-icon">
																		<i class="flaticon2-rectangular"></i>
																	</div>
																	<div class="kt-wizard-v2__nav-label" onclick="">
																		<div class="kt-wizard-v2__nav-label-title">Opening Questions</div>
																		<div class="kt-wizard-v2__nav-label-desc"></div>
																	</div>
																</div>
															</div>
															<div class="kt-wizard-v2__nav-item" data-ktwizard-type="step" onclick="getTrainingQuestions()">
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
															<div class="kt-wizard-v2__nav-item" data-ktwizard-type="step">
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
																<ol class="kt-ordered-list" id="listOfOpeningQuestions" data-repeater-list></ol>
																
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
																			<th style="width: 75px;"></th>
																		</tr>
																		</thead>
																		<tbody id="tbodyForTrainingQuestion" data-repeater-list></tbody>
																	</table>
																</div>
																
																<div class="kt-separator kt-separator--dashed kt-separator--md"></div>
																
																<div class="row">
																	<div class="col-auto ml-auto">
																		<button class="btn btn-label-brand btn-label btn-tall btn-wide kt-font-bold kt-font-transform-u" type="button" id="btnAddTrainingQues" data-repeater-create>
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
																			<th style="width: 75px;"></th>
																		</tr>
																		</thead>
																		<tbody id="tbodyForTrainingURLs" data-repeater-list></tbody>
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
															<button class="btn btn-label-brand btn-label btn-md btn-tall btn-wide kt-font-bold kt-font-transform-u" type="button" data-ktwizard-type="action-prev">Previous</button>
															<!-- <button class="kt-tab-invoker btn btn-warning btn-md btn-tall btn-wide kt-font-bold kt-font-transform-u" type="button" data-ktwizard-type="action-submit" data-current="#kt_tabs_top_build_knowledge_base" data-target="#kt_tabs_top_schedule_ai_model_training" id="finalSubmitBtn">Update & Next</button> -->
															<button class="kt-tab-invoker btn btn-warning btn-md btn-tall btn-wide kt-font-bold kt-font-transform-u" type="button" data-ktwizard-type="action-submit" id="finalSubmitBtn">Save</button>
															<button class="btn btn-warning btn-md btn-tall btn-wide kt-font-bold kt-font-transform-u userActivityLog btnDefault" type="button" id="defaultButton" data-ktwizard-type="action-next">Save & Next</button>
														</div>
														<!--end: Form Actions -->
													</form>
													
													<!--end: Form Wizard Form-->
												</div>
											</div>
										</div>
										
										<div class="tab-pane" id="kt_tabs_top_schedule_ai_model_training" role="tabpanel">
											<div class="container kt-container--md">
												<iframe id="kt_scheduler_schedule_ai_model_training_schedule_training" src="https://calendly.com/cloudhiti_ai_apps/support?embed_domain=chatbots.syra.ai&embed_type=Inline&hide_event_type_details=1" width="100%" height="750" frameborder="0"></iframe>
												
												<div class="kt-separator kt-separator--border-dashed kt-separator--space-lg"></div>
												
												<div class="row">
													<div class="col-auto ml-auto">
														<button class="kt-tab-invoker btn btn-warning btn-md btn-tall btn-wide kt-font-bold kt-font-transform-u" type="button" data-current="#kt_tabs_top_schedule_ai_model_training" onclick="createWizardForTraining()" data-target="#kt_tabs_top_give_feedback_for_re_training">Schedule &amp; Next</button>
													</div>
												</div>
											</div>
										</div>
										
										<div class="tab-pane" id="kt_tabs_top_give_feedback_for_re_training" role="tabpanel">
											<div class="kt-grid kt-wizard-v2" id="kt_wizard_publish_or_retrain_ai_model" data-ktwizard-state="step-first">
												<div class="kt-grid__item kt-wizard-v2__aside">
													<!--begin: Form Wizard Nav -->
													<div class="kt-wizard-v2__nav">
														<div class="kt-wizard-v2__nav-items kt-wizard-v2__nav-items--clickable">
															<div class="kt-wizard-v2__nav-item" data-ktwizard-type="step" data-ktwizard-state="current">
																<div class="kt-wizard-v2__nav-body">
																	<div class="kt-wizard-v2__nav-icon">
																		<i class="flaticon2-shelter"></i>
																	</div>
																	<div class="kt-wizard-v2__nav-label">
																		<div class="kt-wizard-v2__nav-label-title">Response Analysis</div>
																		<div class="kt-wizard-v2__nav-label-desc"></div>
																	</div>
																</div>
															</div>
															<div class="kt-wizard-v2__nav-item" data-ktwizard-type="step">
																<div class="kt-wizard-v2__nav-body">
																	<div class="kt-wizard-v2__nav-icon">
																		<i class="flaticon2-shield"></i>
																	</div>
																	<div class="kt-wizard-v2__nav-label">
																		<div class="kt-wizard-v2__nav-label-title">Logs Analysis</div>
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
																<h2 class="kt-section__title d-flex align-items-center">
																	Analysis of Chatbot Response
<!--																	<span class="btn btn-label btn-label-brand btn-tall btn-wide kt-font-bold kt-font-transform-u ml-auto">Last Month</span>-->
																</h2>
																<div class="kt-section__content">
																	<div id="kt_amchart_schedule_ai_model_training_response_analysis" style="height: 500px;"></div>
																	
																	<div class="kt-separator kt-separator--dashed kt-separator--md"></div>
																	
																	<div class="row align-items-end">
																		<div class="col">
																			<div class="row">
																				<div class="col-lg col-xl-4 mb-4">
																					<div class="form-group mb-lg-0">
																						<label>Type of Questions:</label>
																						<select class="kt-custom-select-auto-init" id="responseFilter" data-width="100%">
																							<option value="Right" selected>Right</option>
																							<option value="Wrong">Wrong</option>
																						</select>
																					</div>
																				</div>
																				<div class="col-lg col-xl-8 mb-4">
																					<div class="form-group mb-lg-0">
																						<label>Period:</label>
																						<div class="kt-control-group btn-group w-100" role="group">
																							<label class="kt-control-group__item btn btn-outline-secondary responseTime active" name="7">
																								<input class="kt-control-group__item-control" type="radio" name="period">
																								Last 7 Days
																							</label>
																							<label class="kt-control-group__item btn btn-outline-secondary responseTime" name="30">
																								<input class="kt-control-group__item-control" type="radio" name="period" checked="">
																								Last Month
																							</label>
																							<label class="kt-control-group__item btn btn-outline-secondary responseTime" name="90">
																								<input class="kt-control-group__item-control" type="radio" name="period">
																								Last 3 Months
																							</label>
																							<label class="kt-control-group__item btn btn-outline-secondary responseTime" name="365">
																								<input class="kt-control-group__item-control" type="radio" name="period">
																								Last Year
																							</label>
																						</div>
																					</div>
																				</div>
																			</div>
																		</div>
																		<div class="col-auto mb-4">
																			<button class="btn btn-label-brand btn-label btn-wide kt-font-bold" type="button" onclick="retrieveResponseAnalysisLog()">Get Responses</button>
																		</div>
																	</div>
																	
																	<div class="kt-separator kt-separator--dashed kt-separator--md"></div>
																	
																	<div id="kt_repeater_schedule_ai_model_training_response_analysis">
																		
																		<div style="text-align:center;font-size:20px;" >
																			<img id="showLoadGif" src="<?php echo plugin_dir_url( __FILE__ ) .'images/syra-spinner.gif'?>" height="35" style="margin-bottom:20px; display: none;"/>
																		</div>
																		<div id="listID" style="text-align:center;font-size:20px" ></div>
																		<div id="noRecord" style="text-align:center;margin-top: 20px;font-size:20px" ></div>
																		
																		<div class="table-responsive" style="margin-top: 5%" id="responseTableDiv">
																			<table id="responseAnalysisTable" class="table table-striped kt-table--align-middle mb-0" style="min-width: 860px">
																				<thead class="thead-dark">
																				<tr>
																					<th>Question</th>
																					<th>Answer</th>
																					<th style="width: 100px;">IP Address</th>
																					<th style="width: 200px;">Date/Time</th>
																					<th class="text-center" style="width: 60px;">Feedback</th>
																				</tr>
																				</thead>
																				<tbody data-repeater-list id="tablebodyForQuestions"></tbody>
																			</table>
																		</div>

																		<div class="pager">

																		</div>
																		
																		<div class="kt-separator kt-separator--dashed kt-separator--md"></div>
																		
																		<div class="row">
																			<div class="col-auto ml-auto">
																				<button class="btn btn-label-brand btn-label btn-tall btn-wide kt-font-bold kt-font-transform-u" type="button" data-toggle="modal" data-target="#feedbackFormModal">
																					<span class="d-none d-lg-inline">Add New Feedback</span>
																				</button>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														
														<!--end: Form Wizard Content-->
														
														<!--begin: Form Wizard Content-->
														<div class="kt-wizard-v2__content pb-0" data-ktwizard-type="step-content">
															<div id="kt_repeater_schedule_ai_model_training_logs_analysis">
																<div class="row align-items-end">
																	<div class="col">
																		<div class="row">
																			<div class="col-lg col-xl-8 mb-4">
																				<div class="form-group mb-lg-0">
																					<label>Period:</label>
																					<div class="kt-control-group btn-group w-100" role="group">
																						<label class="kt-control-group__item btn btn-outline-secondary active">
																							<input class="kt-control-group__item-control" type="radio" name="period" checked="" onclick="logFilter(7)">
																							Last 7 Days
																						</label>
																						<label class="kt-control-group__item btn btn-outline-secondary">
																							<input class="kt-control-group__item-control" type="radio" name="period" onclick="logFilter(30)">
																							Last Month
																						</label>
																						<label class="kt-control-group__item btn btn-outline-secondary">
																							<input class="kt-control-group__item-control" type="radio" name="period" onclick="logFilter(90)">
																							Last 3 Months
																						</label>
																						<label class="kt-control-group__item btn btn-outline-secondary">
																							<input class="kt-control-group__item-control" type="radio" name="period" onclick="logFilter(365)">
																							Last Year
																						</label>
																					</div>
																				</div>
																			</div>
																			<div class="col-lg-auto col-xl-4 mb-4">
																				<div class="form-group mb-lg-0">
																					<label>Date Range:</label>
																					<div class="input-daterange input-group kt-datepicker-auto-init">
																						<input type="text" class="form-control kt-input" name="start" id="fromDate" placeholder="From">
																						<div class="input-group-append">
																									<span class="input-group-text">
																										<i class="la la-ellipsis-h"></i>
																									</span>
																						</div>
																						<input type="text" class="form-control kt-input" name="end" id="toDate" placeholder="To">
																					</div>
																				</div>
																			</div>
																		</div>
																	</div>
																	<div class="col-auto mb-4">
																		<button class="btn btn-label-brand btn-label btn-wide kt-font-bold" onclick="getLogs()" type="button">Get Logs</button>
																	</div>
																</div>
																
																<div class="kt-separator kt-separator--dashed kt-separator--md"></div>
																
																<div class="table-responsive">
																	<table class="table table-striped kt-table--align-middle mb-0" style="min-width: 860px">
																		<thead class="thead-dark">
																		<tr>
																			<th>Question</th>
																			<th>Answer</th>
																			<th style="width: 100px;">IP Address</th>
																			<th style="width: 150px;">Date/Time</th>
																			<th class="text-center" style="width: 60px;">Feedback</th>
																			<th style="width: 80px;"></th>
																		</tr>
																		</thead>
																		<tbody id="logBody" data-repeater-list></tbody>
																	</table>
																</div>
																<div class="container" id="paginationDiv"></div>
																<div class="kt-separator kt-separator--dashed kt-separator--md"></div>
																
																<div class="row">
																	<div class="col-auto ml-auto">
																		<button class="btn btn-label-brand btn-label btn-tall btn-wide kt-font-bold kt-font-transform-u" type="button" data-toggle="modal" data-target="#feedbackFormModal">
																			<span class="d-none d-lg-inline">Add New Feedback</span>
																		</button>
																	</div>
																</div>
															</div>
														</div>
														
														<!--end: Form Wizard Content-->
														
														<div class="kt-separator kt-separator--border-dashed kt-separator--space-lg"></div>
														
														<!--begin: Form Actions -->
														<div class="kt-form__actions">
															<button class="btn btn-label-brand btn-label btn-md btn-tall btn-wide kt-font-bold kt-font-transform-u" type="button" data-ktwizard-type="action-prev">Previous</button>
															<button class="btn btn-warning btn-md btn-tall btn-wide kt-font-bold kt-font-transform-u" type="button" data-ktwizard-type="action-next">Update &amp; Next</button>
														</div>
														
														<!--end: Form Actions -->
														
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
								<textarea id="feedbackAnswer" class="form-control" rows="6"></textarea>
							</div>
							<div class="row" style="display:none">
                                <input id="feedbackLogQuestion" type="text" class="col-md-6"></input>
                            </div>
                            <div class="row" style="display:none">
                                <input id="feedbackIpAddress" type="text" class="col-md-6"></input>
                            </div>
                            <div class="row" style="display:none">
                                <input id="feedbackDateTime" type="text" class="col-md-6"></input>
                            </div>
                            <div class="row" style="display:none">
                                <input id="feedbackBtnId" type="text" class="col-md-6"></input>
                            </div>

                            <div class="row" style="display:none">
                                <input id="pageTypeID" type="text" value="" class="col-md-6"></input>
                            </div>
						</form>
					</div>
					<div class="modal-footer justify-content-between">
						<button type="button" class="btn btn-warning btn-tall btn-wide kt-font-bold kt-font-transform-u" id="feedbackSubmitBtn" onclick="submitFeedback()" data-dismiss="modal">Add</button>
						<button type="button" class="btn btn-danger btn-tall btn-wide kt-font-bold kt-font-transform-u" style="display: none;" id="feedbackDeleteBtn" onclick="deleteFeedback()" data-dismiss="modal">Delete</button>
						<button type="button" class="btn btn-warning btn-tall btn-wide kt-font-bold kt-font-transform-u" style="display: none;" id="feedbackUpdateBtn" onclick="updateFeedback()" data-dismiss="modal">Update</button>
					</div>
				</div>
			</div>
		
		
		</div>
		<!--end::Modal Feedback-->
		
		<!-- begin::Quick Panel -->
		<div id="kt_quick_panel" class="kt-quick-panel">
		</div>
		
		<!-- end::Quick Panel -->

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
						<button type="button" name="deleteKnowledgeBank" class="btn btn-danger btn-tall btn-wide kt-font-bold kt-font-transform-u" onclick="deleteTrainingQuestions()" data-dismiss="modal">Delete</button>
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
						<h5 class="modal-title">Delete Training Questions</h5>
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

		<!--Start custom feedback modal-->
		<div class="modal fade" id="feedbackFormModal" tabindex="-1" role="dialog" aria-hidden="true">
			<div class="modal-dialog modal-lg" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title">Feedback Form</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<form class="kt-form">
							<div class="form-group">
								<div class="row">
									<div class="col-md-2">
										<label class="form-control-label">Your Feedback</label>
									</div>
									<input id="feedbackFormInput" type="text" class="col-md-7 form-control">
									<div class="col-md-2" style="margin-left: 7%;">
										<button type="button" class="btn userActivityLog" name="updateGoal" style="background-color: #661943; color: white" id="feedbackFormButton" onclick="submitGenericFeedback()">Submit</button>
									</div>
								</div>
							</div>
						</form>
						
						<div class="row">
							<table id="feedbackTable" class="table table-bordered display" style="margin-top:15px; display: none;">
								<thead>
									<tr>
										<th>Feedback</th>
										<th>Created Date-Time <i class="fa fa-sort userActivityLog" name="sortLogDataSet" aria-hidden="true" onclick="sortLogDataSet()"></i></th>
										<th>Edit</th>
										<th>Delete</th>
									</tr>
								</thead>
								<tbody id="feedbackTableBody"></tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--End custom feedback modal-->
		
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
			var totalQuestionCount=0;
			jQuery(document).on("click" ,"#btnAddOpeningQuestion",function()  
			{
				if(totalQuestionCount < 5){
					totalQuestionCount ++;
					var openingQuestionBody = '<li data-repeater-item id="openingQuestion_' + totalQuestionCount + '">' +
													'<div class="row">' +
														'<div class="col-lg-6">' +
															'<div class="form-group">' +
																"<label>Opening Question's Text</label>" +
																'<textarea class="form-control" rows="3" id=txt_ques'+ totalQuestionCount +' onkeyup="changedemoBotQuestion'+ totalQuestionCount +'()" onkeydown="changedemoBotQuestion'+ totalQuestionCount +'()"></textarea>' +
															'</div>' +
														'</div>' +
														'<div class="col-lg-6">' +
															'<div class="form-group mb-lg-0">' +
																"<label>Opening Question's Button Text</label>" +
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
												'</li>' ;
					jQuery("#listOfOpeningQuestions").append(openingQuestionBody);
				}
				else{
					Swal.fire('Message', 'Please add atmost 5 opening questions', 'error');
				}
			});
			
			jQuery(document).on("click" ,"#btnAddTrainingQues",function()  {
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

		</script>

	</body>
	
	<!-- end::Body -->
</html>
