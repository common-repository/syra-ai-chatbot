"use strict";
var kt_amchart_schedule_ai_model_training_response_analysis = [];
// Class definition

var KTTraining = function () {
	// variables
	var formCustomizeEl,
		validationCustomize,
		
		wizardBuildKnowledgeBaseEl,
		formBuildKnowledgeBaseEl,
		validatorBuildKnowledgeBase,
		wizardBuildKnowledgeBase,
		
		wizardScheduleAiModelTraining,
		
		wizardPublishOrRetrainAiModel;
	
	// general
	var tooltipBuild = function (el) {
		var skin = el.data('skin') ? 'tooltip-' + el.data('skin') : '',
			width = el.data('width') == 'auto' ? 'tooltop-auto-width' : '',
			triggerValue = el.data('trigger') ? el.data('trigger') : 'hover';
		
		el.tooltip({
			trigger: triggerValue,
			template: '<div class="tooltip ' + skin + ' ' + width + '" role="tooltip">' +
				'<div class="arrow"></div>' +
				'<div class="tooltip-inner"></div>' +
				'</div>'
		});
	};
	
	// build knowledge base
	var repeaterBuildKnowledgeBaseOpeningQuestionsInit = function () {
		jQuery('#kt_form_build_knowledge_base_opening_questions').repeater({
			initEmpty: false,
			
			defaultValues: {
				'text-input': 'foo'
			},
			
			show: function () {
				jQuery(this).find('[data-toggle="kt-tooltip-custom"]').each(function () {
					tooltipBuild(jQuery(this));
				});
				
				jQuery(this).slideDown();
			},
			
			hide: function (deleteElement) {
				if (confirm('Are you sure you want to delete this element?')) {
					jQuery(this).slideUp(deleteElement);
				}
			}
		});
	};
	
	var repeaterBuildKnowledgeBaseTrainingQuestionsInit = function () {
		jQuery('#kt_form_build_knowledge_base_training_questions').repeater({
			initEmpty: true,
			
			defaultValues: {
				'text-input': 'foo'
			},
			
			show: function () {
				var date = new Date();
				
				jQuery(this).find('[data-toggle="kt-tooltip-custom"]').each(function () {
					tooltipBuild(jQuery(this));
				});
				
				jQuery(this).show();
				jQuery(this).find('.kt_form_build_knowledge_base_training_questions_date').text(date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds());
			},
			
			hide: function (deleteElement) {
				if (confirm('Are you sure you want to delete this element?')) {
					jQuery(this).hide(deleteElement);
				}
			}
		});
	};
	
	var repeaterBuildKnowledgeBaseTrainingUrlsInit = function () {
		jQuery('#kt_form_build_knowledge_base_training_urls').repeater({
			initEmpty: true,
			
			defaultValues: {
				'text-input': 'foo'
			},
			
			show: function () {
				var date = new Date();
				
				jQuery(this).find('[data-toggle="kt-tooltip-custom"]').each(function () {
					tooltipBuild(jQuery(this));
				});
				
				jQuery(this).show();
				jQuery(this).find('.kt_form_build_knowledge_base_training_urls_date').text(date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds());
			},
			
			hide: function (deleteElement) {
				if (confirm('Are you sure you want to delete this element?')) {
					jQuery(this).hide(deleteElement);
				}
			}
		});
	};
	
	var wizardBuildKnowledgeBaseInit = function () {
		// Initialize form wizard
		wizardBuildKnowledgeBase = new KTWizard('kt_wizard_build_knowledge_base', {
			startStep: 1,
			clickableSteps: true
		});
		
		// Validation before going to next page
		// wizardBuildKnowledgeBase.on('beforeNext', function (wizardObj) {
		// 	if (validatorBuildKnowledgeBase.form() !== true) {
		// 		wizardObj.stop();
		// 	}
		// });
		
		// wizardBuildKnowledgeBase.on('beforePrev', function (wizardObj) {
		// 	if (validatorBuildKnowledgeBase.form() !== true) {
		// 		wizardObj.stop();
		// 	}
		// });
		
		// Change event
		wizardBuildKnowledgeBase.on('change', function () {
			KTUtil.scrollTop();
		});
	};
	
	var validationBuildKnowledgeBaseInit = function () {
		validatorBuildKnowledgeBase = formBuildKnowledgeBaseEl.validate({
			// Validate only visible fields
			ignore: ":hidden",
			
			// Display error
			invalidHandler: function () {
				KTUtil.scrollTop();
				
				swal.fire({
					"title": "",
					"text": "There are some errors in your submission. Please correct them.",
					"type": "error",
					"confirmButtonClass": "btn btn-secondary"
				});
			}
		});
	};
	
	var submitBuildKnowledgeBaseInit = function () {
		var btn = formBuildKnowledgeBaseEl.find('[data-ktwizard-type="action-submit"]');
		
		btn.on('click', function (e) {
			e.preventDefault();
			
			if (validatorBuildKnowledgeBase.form()) {
				KTApp.progress(btn);
				
				formBuildKnowledgeBaseEl.ajaxSubmit({
					success: function () {
						KTApp.unprogress(btn);
						
						swal.fire({
							"title": "",
							"text": "The application has been successfully submitted!",
							"type": "success",
							"confirmButtonClass": "btn btn-secondary"
						});
					}
				});
			}
		});
	};
	
	// schedule ai model training
	var repeaterScheduleAiModelTrainingLogsAnalysisInit = function () {
		jQuery('#kt_repeater_schedule_ai_model_training_logs_analysis').repeater({
			initEmpty: true,
			
			defaultValues: {
				'text-input': 'foo'
			},
			
			show: function () {
				var date = new Date();
				
				jQuery(this).find('[data-toggle="kt-tooltip-custom"]').each(function () {
					tooltipBuild(jQuery(this));
				});
				
				jQuery(this).show();
				jQuery(this).find('.kt_repeater_schedule_ai_model_training_logs_analysis_date').text(date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds());
			},
			
			hide: function (deleteElement) {
				if (confirm('Are you sure you want to delete this element?')) {
					jQuery(this).hide(deleteElement);
				}
			}
		});
	};
	
	var repeaterScheduleAiModelTrainingResponseAnalysisInit = function () {
		jQuery('#kt_repeater_schedule_ai_model_training_response_analysis').repeater({
			initEmpty: true,
			
			defaultValues: {
				'text-input': 'foo'
			},
			
			show: function () {
				var date = new Date();
				
				jQuery(this).find('[data-toggle="kt-tooltip-custom"]').each(function () {
					tooltipBuild(jQuery(this));
				});
				
				jQuery(this).show();
				jQuery(this).find('.kt_repeater_schedule_ai_model_training_response_analysis_date').text(date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds());
			},
			
			hide: function (deleteElement) {
				if (confirm('Are you sure you want to delete this element?')) {
					jQuery(this).hide(deleteElement);
				}
			}
		});
	};
	
	var schedulerScheduleAiModelTrainingInit = function () {
		// jQuery('#kt_scheduler_schedule_ai_model_training_schedule_training').on('load', function () {
		// 	this.style.height = this.contentWindow.document.body.offsetHeight + 'px';
		// });
	};
	
	// publish or retrain ai model
	var wizardPublishOrRetrainAiModelInit = function () {
		// Initialize form wizard
		wizardPublishOrRetrainAiModel = new KTWizard('kt_wizard_publish_or_retrain_ai_model', {
			startStep: 1,
			clickableSteps: true
		});
		
		// Validation before going to next page
		// wizardAccountSetup.on('beforeNext', function (wizardObj) {
		// 	if (validatorAccountSetup.form() !== true) {
		// 		wizardObj.stop();
		// 	}
		// });
		
		// wizardAccountSetup.on('beforePrev', function (wizardObj) {
		// 	if (validatorAccountSetup.form() !== true) {
		// 		wizardObj.stop();
		// 	}
		// });
		
		// Change event
		wizardPublishOrRetrainAiModel.on('change', function () {
			KTUtil.scrollTop();
		});
	};
	
	return {
		// public functions
		init: function () {
			// customize
			formCustomizeEl = jQuery('#kt_form_customize');
			
			// validationCustomizeInit();
			
			// build knowledge base
			wizardBuildKnowledgeBaseEl = KTUtil.get('kt_wizard_build_knowledge_base');
			formBuildKnowledgeBaseEl = jQuery('#kt_form_build_knowledge_base');
			
			repeaterBuildKnowledgeBaseOpeningQuestionsInit();
			repeaterBuildKnowledgeBaseTrainingQuestionsInit();
			repeaterBuildKnowledgeBaseTrainingUrlsInit();
			wizardBuildKnowledgeBaseInit();
			// validationBuildKnowledgeBaseInit();
			// submitBuildKnowledgeBaseInit();
			
			// schedule ai model training
			repeaterScheduleAiModelTrainingLogsAnalysisInit();
			repeaterScheduleAiModelTrainingResponseAnalysisInit();
			// schedulerScheduleAiModelTrainingInit();
			
			// publish or retrain ai model
			wizardPublishOrRetrainAiModelInit();
		}
	};
}();

// On document ready
KTUtil.ready(function () {
	KTTraining.init();
});

var training_Response_Analysis = function (){
	var chartsInit = function () {
		function handleClick(event){
			// var name = event.dataItem.dataContext.title;
			// retrieveResponseAnalysisLog(name);
		}
		var scheduleAiModelTrainingResponseAnalysis = AmCharts.makeChart("kt_amchart_schedule_ai_model_training_response_analysis", {
			"type": "pie",
			"theme": "light",
			"dataProvider": kt_amchart_schedule_ai_model_training_response_analysis,
			"marginTop": 0,
			"marginBottom": 0,
			"labelsEnabled": false,
			"valueField": "value",
			"titleField": "title",
			"colorField": "color",
			"baseColor": "#000000",
			"alpha": 0.6,
			"balloon": {
				"fixedPosition": true
			},
			"balloonText": "[[title]] <br> Bot Response: <b>[[value]]%</b>",
			"export": {
				"enabled": false
			}
		});
		scheduleAiModelTrainingResponseAnalysis.addListener("clickSlice", handleClick);
		
	};
	return{
		init : function(){
			chartsInit();
		}
	}
}();

function loadResponseAnalysisChart(userCredentials){
	if(userCredentials != null){
		sessionAnalytics(userCredentials);
	}
	else{
		var message = "No data is found to diplay charts."
		jQuery("#kt_amchart_schedule_ai_model_training_response_analysis").html(message);
	}
}

function sessionAnalytics(userCredentials) 
{
    var form = new FormData();
    var api_endpoint="";
    form.append("APIkey", userCredentials["apiKey"]);            
    api_endpoint="dashboard-session-analytics";
    var settings = 
    {
        "async": true,
        "url": natura_url_resource + "/natura/"+api_endpoint,
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
		response = JSON.parse(response);
		if (response.status === 200) 
		{
			if(response.answerPercentage != 0){
				kt_amchart_schedule_ai_model_training_response_analysis.push({
					"title": response.answerPercentage[0][0],
					"value": response.answerPercentage[0][1]
				});
				kt_amchart_schedule_ai_model_training_response_analysis.push({
					"title": response.answerPercentage[1][0],
					"value": response.answerPercentage[1][1],
					"color": "#472235"
				});
			}
			training_Response_Analysis.init();
		}
		else{
			var APIerrorMsg='<span style="margin-left:5%;margin-bottom:18%;color:red;font-size:12px;">'+api_endpoint+' - '+response.message+'</span>';  

            jQuery("#kt_amchart_schedule_ai_model_training_response_analysis").html(APIerrorMsg);
		}
	})
	.fail(function(response) 
    {           
        var APIerrorMsg='<span style="margin-left:5%;margin-bottom:18%;color:red;font-size:12px;">'+api_endpoint+' -> '+response.status+' -> '+response.statusText+'</span>';  

		jQuery("#kt_amchart_schedule_ai_model_training_response_analysis").html(APIerrorMsg);

        Swal.fire
        ({
            title: "API Error!",
            text: api_endpoint+' -> '+response.status+' -> '+response.statusText,
            icon: "error",
            button: "OK",
        });

    });
}