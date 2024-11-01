"use strict";
// Class definition

var allGoalsAnalytics = [];
var allGoalsUniqueCountryCount = [];
var userCredentialsData = null;
var appendElementCount = 0;

jQuery("#goalConvertedInMonth").html('0');
jQuery("#goalConversionPercentageInMonth").html('0');
jQuery("#avgQuesForGoalConversion").html('0');

var KTGoals = function () {
	// build knowledge base
	// var repeaterGoalsInit = function () {
	// 	jQuery('#kt_repeater_goals').repeater({
	// 		initEmpty: true,
			
	// 		show: function () {
	// 			jQuery(this).slideDown();
	// 		},
			
	// 		hide: function (deleteElement) {
	// 			if (confirm('Are you sure you want to delete this element?')) {
	// 				jQuery(this).slideUp(deleteElement);
	// 			}
	// 		}
	// 	});
	// };
	
	return {
		// public functions
		init: function () {
			// repeaterGoalsInit();
		}
	};
}();

// On document ready
// KTUtil.ready(function () {
// 	KTGoals.init();
// });

function loadGoalConversionDashboard(userCredentials){
	userCredentialsData = userCredentials;
	jQuery("#goalConvertedInMonth").html('<img src="'+wp_path+'"images/syra-spinner.gif" height="35"/>');
	jQuery("#goalConversionPercentageInMonth").html('<img src="'+wp_path+'"images/syra-spinner.gif" height="35"/>');
	jQuery("#avgQuesForGoalConversion").html('<img src="'+wp_path+'"images/syra-spinner.gif" height="35"/>');
	
	KTGoals.init();
	goalConversionCount(userCredentials);
	goalConversionPercentage(userCredentials);
	averageQuestionForEachGoalConversion(userCredentials);
	getIndividualGoalsCount(userCredentials);
}

//Get Goals Converted in Last 30 days
function goalConversionCount(userCredentials){
	var apiKey = userCredentials["apiKey"];
	var customerId = userCredentials["customerId"];
	var botDeploymentId = userCredentials["botDeploymentId"];
	var domainId = userCredentials["domainId"];
	var form = new FormData();
	form.append("APIkey", apiKey);
	form.append("botdeploymentId", botDeploymentId);
	var api_endpoint = "";
	api_endpoint="goal-conversion-count";
	var settings = {
		"async": true,
		"url": url_resource + "/syraconsumer/"+api_endpoint,
		"method": "POST",
		headers: {
			'Authorization': 'Bearer '+access_token,
		},
		"processData": false,
		"contentType": false,
		"mimeType": "multipart/form-data",
		"data": form
	}
	jQuery.ajax(settings).done(function(response){
		var jsonResponse = JSON.parse(response);
		if(jsonResponse.status == 200){
			jQuery("#goalConvertedInMonth").html(jsonResponse.goalConvertedInMonth);
		}
		else{
			var APIerrorMsg='<span style="margin-left:5%;margin-bottom:18%;color:red;font-size:10px;line-height:unset;">'+api_endpoint+' - '+response.message+'</span>';
			jQuery("#goalConvertedInMonth").html('0');
		}
	})
	.fail(function(response) 
	{           
		var APIerrorMsg='<span style="margin-left:5%;margin-bottom:18%;color:red;font-size:10px;line-height:unset;">'+api_endpoint+' -> '+response.status+' -> '+response.statusText+'</span>';                                                                              
		jQuery("#goalConvertedInMonth").html('0');		
	});
}

//Goal Conversion % in Last 30 days
function goalConversionPercentage(userCredentials){
	var apiKey = userCredentials["apiKey"];
	var customerId = userCredentials["customerId"];
	var botDeploymentId = userCredentials["botDeploymentId"];
	var domainId = userCredentials["domainId"];
	var form = new FormData();
	form.append("APIkey", apiKey);
	form.append("botdeploymentId", botDeploymentId);
	var api_endpoint = "";
	api_endpoint="natura-goal-conversion-perc-in-last-30-days";
	var settings = 
	{
		"async": true,
		"url": url_resource + "/syraconsumer/"+api_endpoint,
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
		var jsonResponse = JSON.parse(response);
		if("Percentage" in jsonResponse){
			jsonResponse.Percentage = parseFloat(jsonResponse.Percentage).toFixed(3);
			jQuery("#goalConversionPercentageInMonth").html(jsonResponse.Percentage)    
		}
		else{
			jQuery("#goalConversionPercentageInMonth").html(0);    
		}
	})
	.fail(function(response){
		var APIerrorMsg='<span style="margin-left:5%;margin-bottom:18%;color:red;font-size:10px;line-height:unset;">'+api_endpoint+' -> '+response.status+' -> '+response.statusText+'</span>';                                                                              
		jQuery("#goalConversionPercentageInMonth").html('0');
	})
}

//Get Avg. # of Questions for Each Goal Conversion in Last 30 days
function averageQuestionForEachGoalConversion(userCredentials){
	var apiKey = userCredentials["apiKey"];
	var customerId = userCredentials["customerId"];
	var botDeploymentId = userCredentials["botDeploymentId"];
	var domainId = userCredentials["domainId"];
	var form = new FormData();
	form.append("botdeploymentId", botDeploymentId);
	form.append("APIkey", apiKey);
	var api_endpoint = "";
	api_endpoint="natura-no-of-questions-goal-conversion";
	var settings = 
	{
		"async": true,
		"url": url_resource + "/syraconsumer/"+api_endpoint,
		"method": "POST",
		headers: {
			'Authorization': 'Bearer '+access_token,
		},
		"processData": false,
		"contentType": false,
		"mimeType": "multipart/form-data",
		"data": form
	}
	jQuery.ajax(settings).done(function (response){
		var jsonResponse = JSON.parse(response);
		if(jsonResponse.status == 200){
			jQuery("#avgQuesForGoalConversion").html(jsonResponse.result);
		}
		else{
			jQuery("#avgQuesForGoalConversion").html(0);
		}
	})
	.fail(function(response){
		var APIerrorMsg='<span style="margin-left:5%;margin-bottom:18%;color:red;font-size:10px;line-height:unset;">'+api_endpoint+' -> '+response.status+' -> '+response.statusText+'</span>';                                                                              
		jQuery("#avgQuesForGoalConversion").html('0');
	})
}

function getIndividualGoalsCount(userCredentials){
	var apiKey = userCredentials["apiKey"];
	var customerId = userCredentials["customerId"];
	var botDeploymentId = userCredentials["botDeploymentId"];
	var domainId = userCredentials["domainId"];
	var form = new FormData();
	var api_endpoint = "";
	form.append("botdeploymentId", botDeploymentId);
	form.append("APIkey", apiKey);
	api_endpoint="natura-individual-goal-analytics"
	var settings = 
	{
		"async": true,
		"url": url_resource + "/syraconsumer/" + api_endpoint,
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
		var jsonResponse = JSON.parse(response);
		if(jsonResponse.status == 200){
			allGoalsAnalytics = jsonResponse["GoalsAnalytics"];
			getIndividualGoalCountryCount(userCredentials);
		}
	});
}

function getIndividualGoalCountryCount(userCredentials){
	var apiKey = userCredentials["apiKey"];
	var customerId = userCredentials["customerId"];
	var botDeploymentId = userCredentials["botDeploymentId"];
	var domainId = userCredentials["domainId"];
	var form = new FormData();
	form.append("botdeploymentId", botDeploymentId);
	form.append("APIkey", apiKey);
	var api_endpoint = "";
	api_endpoint="natura-individual-goal-maps";
	var settings = {
		"async": true,
		"url": url_resource + "/syraconsumer/" + api_endpoint,
		"method": "POST",
		headers: {
			'Authorization': 'Bearer '+ access_token
		},
		"processData": false,
		"contentType": false,
		"mimeType": "multipart/form-data",
		"data": form
	}
	jQuery.ajax(settings).done(function (response) {
		var jsonResponse = JSON.parse(response);
		if(jsonResponse.status == 200){
			jsonResponse["data"].forEach(element => {
				var elementCount = 0;
				element["data"].forEach(function(mapData){
					elementCount += mapData["value"];
				})
				allGoalsUniqueCountryCount.push({name : element["name"], count : elementCount});
			});
			showGoal(userCredentials["botDeploymentId"]);
		}
	})
}
//Display Existing User Defined Goal
function showGoal(botDeploymentId){
	jQuery("#userExistingGoals").html('');
	let individual_GoalAnalytics_Country_Data = allGoalsAnalytics.map((item, i) => Object.assign({}, item, allGoalsUniqueCountryCount[i]));
	var individualGoalInformation = [];
	var form = new FormData();
	form.append("botdeploymentId", botDeploymentId);
	var settings = {
		"async": true,
		"url": url_resource + "/syraconsumer/show-goal",
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
		var jsonResponse = JSON.parse(response);
		if(jsonResponse.status == 200){
			if(jsonResponse.data.length > 0){
				jQuery('#withgoal').show();
				jQuery('#withoutgoal').hide();
			}
			else if(jsonResponse.data.length <= 0){
				jQuery('#withoutgoal').show();
				jQuery('#withgoal').hide();
			}
			individualGoalInformation = jsonResponse.data;
			var addGoalItemCount = 0;
			let allGoalsFinalData = individual_GoalAnalytics_Country_Data.map((item, i) => Object.assign({}, item, individualGoalInformation[i]));
			allGoalsFinalData.forEach(function(element){
				if(element.count == undefined){
					element.count = 0;
				}
				if(element.intentPublicName == null){
					element.intentPublicName = "";
				}
				element.avgQnAskToReachGoal = parseFloat(element.avgQnAskToReachGoal).toFixed(3);
				element.timeTakenToConvert = parseFloat(element.timeTakenToConvert).toFixed(3);
				var new_goal_row = '<li data-repeater-item>' +
												'<div class="row align-items-end mb-lg-4">' +
													'<div class="col">' +
														'<div class="row">' +
															'<div class="col-lg-6">' +
																'<div class="form-group mb-lg-0">' +
																	'<label>Name</label>' +
																	'<input type="text" class="form-control" value="' + element.goalName +'" readonly>' +
																'</div>' +
															'</div>' +
															'<div class="col-lg-6">' +
																'<div class="form-group mb-lg-0">' +
																	'<label>Website URL</label>' +
																	'<input type="url" class="form-control" value="' + element.goalUrl +'" readonly>' +
																'</div>' +
															'</div>' +
														'</div>' +
													'</div>' +
													'<div class="col-lg-auto order-first order-lg-last mb-3 mb-lg-0">' +
														'<div class="form-group text-right mb-0">' +
															'<a class="kt-link kt-font-bold userActivityLog" name="goalEdit' + addGoalItemCount + '" style="cursor:pointer;" onclick="editGoalModal(' + "'" + element.goalName + "','" + element.goalUrl + "','" + element.id + "','" + element.intentBelongs + "','" + element.intentPublicName + "','" + "'" + ')" data-toggle="modal" data-target="#editModal">Edit</a>' +
															'<a class="kt-link kt-font-bold userActivityLog" name="goalDelete' + addGoalItemCount + '" style="margin-left:22px; cursor:pointer;" onclick="deleteGoal(' + element.id +')">Remove</a>' +
														'</div>' +
													'</div>' +
												'</div>' +
												'<div class="row">'+
													'<div class="col-lg-2" id="goalHeader_' + addGoalItemCount + '">'+
														'<label>Goal Intent(s) : </label>' +
													'</div>'+
													'<div class="col-lg-6">'+
														'<label>' + element.intentPublicName + '</label>' +
													'</div>' +
												'</div>'+
												'<div class="row" style="margin-top:2%;">' +
													'<div class="col-lg-4">' +
														'<div class="kt-portlet kt-iconbox h-lg-100 mb-lg-0">' +
															'<div class="kt-portlet__body p-0">' +
																'<div class="kt-iconbox__body">' +
																	'<div class="kt-iconbox__desc">' +
																		'<h3 class="kt-iconbox__title">' + element.count +'</h3>' +
																		'<div class="kt-iconbox__content"># of Conversions</div>' +
																	'</div>' +
																'</div>' +
															'</div>' +
														'</div>' +
													'</div>' +
													'<div class="col-lg-4">' +
														'<div class="kt-portlet kt-iconbox h-lg-100 mb-lg-0">' +
															'<div class="kt-portlet__body p-0">' +
																'<div class="kt-iconbox__body">' +
																	'<div class="kt-iconbox__desc">' +
																		'<h3 class="kt-iconbox__title">' + element.avgQnAskToReachGoal +'</h3>' +
																		'<div class="kt-iconbox__content"># of Questions taken to convert</div>' +
																	'</div>' +
																'</div>' +
															'</div>' +
														'</div>' +
													'</div>' +
													'<div class="col-lg-4">' +
														'<div class="kt-portlet kt-iconbox h-lg-100 mb-lg-0">' +
															'<div class="kt-portlet__body p-0">' +
																'<div class="kt-iconbox__body">' +
																	'<div class="kt-iconbox__desc">' +
																		'<h3 class="kt-iconbox__title">' + element.timeTakenToConvert +'</h3>' +
																		'<div class="kt-iconbox__content">Time taken to convert</div>' +
																	'</div>' +
																'</div>' +
															'</div>' +
														'</div>' +
													'</div>' +
												'</div>' +
												
												'<div class="kt-separator kt-separator--dashed kt-separator--md"></div>' +
											'</li>';
						jQuery("#userExistingGoals").append(new_goal_row);
						if(element.intentPublicName == ""){
							var id = "goalHeader_" + addGoalItemCount.toString();
							jQuery("#" + id).hide();
						}
						addGoalItemCount++;
			})
		}
	})
}

//Add new goal
function addNewGoal(){
	var new_goal_row = '<li data-repeater-item id="newGoalItem_' + appendElementCount + '">' +
							'<div class="row align-items-end mb-lg-4">' +
								'<div class="col">' +
									'<div class="row">' +
										'<div class="col-lg-6">' +
											'<div class="form-group mb-lg-0">' +
												'<label>Name</label>' +
												'<input type="text" class="form-control" id="newGoalName_' + appendElementCount +'" value="">' +
											'</div>' +
										'</div>' +
										'<div class="col-lg-6">' +
											'<div class="form-group mb-lg-0">' +
												'<label>Website URL</label>' +
												'<input type="url" class="form-control" id="newGoalUrl_' + appendElementCount + '" value="">' +
											'</div>' +
										'</div>' +
									'</div>' +
									'<div class="row" style="margin-top:2%;" id="intent_header_' + appendElementCount + '">'+
										'<div class="col-lg-6">'+
											'<div class="form-group mb-lg-0">' +
												'<label>Choose Intent(s)</label>' +
											'</div>' +
										'</div>'+
									'</div>' +	
									'<div class="row" style="overflow-y: scroll; height: 70px;" id="intent_' + appendElementCount + '">' +
									'</div>'+
								'</div>' +
								'<div class="col-lg-auto order-first order-lg-last mb-3 mb-lg-0" id="intent_delete_' + appendElementCount + '">' +
									'<div class="form-group text-right mb-0">' +
										'<a class="kt-link kt-font-bold" href="javascript:;" onclick="deleteGoalFromTable(' + appendElementCount +')">Delete</a>' +
									'</div>' +
								'</div>' +
							'</div>' +
							'<div class="kt-separator kt-separator--dashed kt-separator--md"></div>' +
						'</li>' ;
	jQuery("#userExistingGoals").append(new_goal_row);
	fetchIntent(appendElementCount , "intent_", "");
	appendElementCount++;
}

function isUrlValid(url) {
	return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
}

//fetch new goal data from 
function updateNewGoal(){
	var totalGoalCount = jQuery("ol#userExistingGoals li").length;
	if(totalGoalCount <= 3)
	{
		if(appendElementCount == 0){
			swalWithBootstrapButtons.fire({
				text: "Please add new goal",
				icon: 'info',
				showCancelButton: true,
				confirmButtonText: 'Okay'
			})
		}
		else{
			var form = new FormData();
			form.append("botdeploymentId", userCredentialsData["botDeploymentId"]);
			var goalNamesList = [];
			var goalUrlResources = [];
			var goalIntentBelongs = [];
			var goalIntentsPublicName = [];
			for(var index = 0; index< appendElementCount; index++)
			{
				var name = jQuery("#newGoalName_" + index).val();
				var urlResource = jQuery("#newGoalUrl_" + index).val();
				var intentBelongs = "";
				var intentPublicName = "";
				var intentLabelId = "";
				var intentCheckboxClass = "goalIntent_" + index;
				var checkedVals = jQuery('.' + intentCheckboxClass + ':radio:checked').map(function() {
					intentLabelId += this.id.split('_')[1];
					return this.value;
				}).get();
				checkedVals.forEach(element => {
					intentBelongs += element;
				});
	
				var labelClass = "#intentLabel_" + intentLabelId + "_" + index;
				intentPublicName = jQuery(labelClass).text();
				if(name == "" && urlResource == ""){
					jQuery("#goalCreateMessage").html("<font style='color: #5A679E'>Both fields are required</font>");
					return;
				}
				if (name == "") {
					jQuery("#goalCreateMessage").html("<font style='color: #5A679E'>Please add goal name</font>");
					return;
				}
				else if(urlResource == ""){
					jQuery("#goalCreateMessage").html("<font style='color: #5A679E'>Please add goal url</font>");
					return;
				}
				else{
					if(isUrlValid(urlResource)){
						goalNamesList.push(name);
						goalUrlResources.push(urlResource);
						goalIntentBelongs.push(intentBelongs);
						goalIntentsPublicName.push(intentPublicName);
						jQuery("#goalCreateMessage").html('<img src="'+wp_path+'"images/syra-spinner.gif" height="35"/>');
					}
					else{
						jQuery("#goalCreateMessage").html("<font style='color: #5A679E'>Please add valid url</font>");
						return;
					}
				}
			}
			form.append("name", JSON.stringify(goalNamesList));
			form.append("url", JSON.stringify(goalUrlResources));
			form.append("intentBelongs", JSON.stringify(goalIntentBelongs));
			form.append("intentPublicNames", JSON.stringify(goalIntentsPublicName));
			var settings = {
				"async": true,
				"url": url_resource + "/syraconsumer/create-goal",
				"method": "POST",
				headers: {
					'Authorization': 'Bearer '+access_token,
				},
				"processData": false,
				"contentType": false,
				"mimeType": "multipart/form-data",
				"data": form
			}
			jQuery.ajax(settings).done(function (response) {
				var jsonResponse = JSON.parse(response);
				if(jsonResponse.status == 200){
					jQuery("#goalCreateMessage").html('');
					swalWithBootstrapButtons.fire({
						text: 'New goal was added successfully.',
						icon: "success",
						confirmButtonText: 'Okay'
					})
					.then((result) => {
						if(result.value){
							location.reload();
							// window.location = "goals.html";
						}
					});
				}
			})
			.fail(function(response){
				swalWithBootstrapButtons.fire({
					text: response.message,
					icon: 'error',
					showCancelButton: false,
					confirmButtonText: 'Okay'
				})
				//swal.fire("Api Error",response.message, "error");
			})
		}
		
	}
	else{
		swalWithBootstrapButtons.fire({
			text: 'Only three goals can be added',
			icon: "error",
			confirmButtonText: 'Okay'
		})
	}
}

//remove goal from backend table for particular user
function deleteGoal(id){
	swalWithBootstrapButtons.fire({
		title : "Are you sure?",
		text : "Once deleted, goal wwill be deleted permanatly",
		icon: "warning",
		showCancelButton: true,
	})
	.then((result) => {
		if(result.value){
			appendElementCount--;
			var form = new FormData();
			form.append("id", id);
			var settings = {
				"async": true,
				"url": url_resource + "/syraconsumer/delete-goal",
				"method": "POST",
				headers: {
					'Authorization': 'Bearer '+access_token,
				},
				"processData": false,
				"contentType": false,
				"mimeType": "multipart/form-data",
				"data": form
			}
			jQuery.ajax(settings).done(function (response) {
						
				var jsonResponse = JSON.parse(response);
				if (jsonResponse.status === 200) 
				{
					swalWithBootstrapButtons.fire({
						text: jsonResponse.message,
						icon: "success",
						confirmButtonText: 'Okay'
					})
					.then((result) => {
						if(result.value){
							location.reload();
							// window.location = "goals.html";
						}
					});
				}                        
				else
				{
					swalWithBootstrapButtons.fire({
						text: jsonResponse.message,
						icon: "error",
						confirmButtonText: 'Okay'
					});
				}
			})
			.fail(function(response) 
			{   
				swalWithBootstrapButtons.fire
				({
					text: 'delete-goal' +' -> '+ response.status + ' -> '+response.statusText,
					icon: "error",
					confirmButtonText: 'Okay'
				});
			});
		}
	});
	
}

//remove element from frontend table
function deleteGoalFromTable(id){
	var removeElementId = "#" + "newGoalItem_" + id;
	swalWithBootstrapButtons.fire({
		title : "Are you sure?",
		text : "Once deleted, you will not be able to recover this goal!",
		icon: "warning",
		showCancelButton: true,
	})
	.then((result) => {
		if (result.value) 
		{
			jQuery(removeElementId).remove();
			appendElementCount--;
			swalWithBootstrapButtons.fire(
				'',
				'Your goal was deleted.',
				'success'
			)
		} 
	});
}

//Fetch intent for goals
function fetchIntent(goalId, divName, intentBelongs){
    var form = new FormData();
    form.append("email", email);
    form.append("apikey", apiKEY);

    var settings = {
		"async": true,
		"url":  natura_url_resource + "/natura/fetch-intent-for-goal-conversion",
		"method": "POST",
		"processData": false,
		"mimeType": "multipart/form-data",
		"contentType": false,
		"data": form
    };

    jQuery.ajax(settings).done(function (response) {
		response = JSON.parse(response);
		var name = "goalIntent_";
		switch(goalId){
			case 0:
				name += "0";
				break;
			case 1:
				name += "1";
				break;
			case 2:
				name += "2";
				break;
		}
		divName = divName + goalId;
		jQuery("#" + divName).html('');
		if(response.intents.length > 0){
			for(var intentObj = 0; intentObj < response.intents.length; intentObj++)
			{
				if(intentBelongs != ''){
					var intentCheckBox = '<div class="col-lg-4">' + '<input type="radio" name="editGoalIntents" class="' + "goalEditIntent" + '" style="margin-left:1%" id="intentEdit_' + intentObj +'" value ="' + response.intents[intentObj][1] + '">' + '<label style="padding-left:5px; vertical-align: middle;" id="intentEditLabel_' + intentObj + '">' + response.intents[intentObj][2] + '</label></div>';
					jQuery("#" + divName).append(intentCheckBox);
					var checkedVals = jQuery('.goalEditIntent:radio:unchecked').map(function() {
						if(this.value == intentBelongs){
							jQuery(this).prop("checked", true); 
						}
						return this.value;
					}).get();
				}
				else{
					if(divName == "intentBelongsDiv"){
						var intentCheckBox = '<div class="col-lg-4">' + '<input type="radio" name="editGoalIntents" class="' + "goalEditIntent" + '" style="margin-left:1%" id="intentEdit_' + intentObj +'" value ="' + response.intents[intentObj][1] + '">' + '<label style="padding-left:5px; vertical-align: middle;" id="intentEditLabel_' + intentObj + '">' + response.intents[intentObj][2] + '</label></div>';
						jQuery("#" + divName).append(intentCheckBox);
						var checkedVals = jQuery('.goalEditIntent:radio:unchecked').map(function() {
							if(this.value == intentBelongs){
								jQuery(this).prop("checked", true); 
							}
							return this.value;
						}).get();
					}
					else{
						var intentCheckBox = '<div class="col-lg-4">' + '<input type="radio" name="intentRadio" class="' + name + '" style="margin-left:1%" id="intent_' + intentObj + "_" + goalId +'" value ="' + response.intents[intentObj][1] + '">' + '<label style="padding-left:5px; vertical-align: middle;" id="intentLabel_' + intentObj + "_" + goalId + '">' + response.intents[intentObj][2] + '</label></div>';
						jQuery("#" + divName).append(intentCheckBox);
					}
				}
			}
		}
		else{
			jQuery("#intent_" + goalId).hide();
			jQuery("#intent_header_" + goalId).hide();
			jQuery("#intent_delete_" + goalId).hide();
		}
	});
}
