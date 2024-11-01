"use strict";
// Class definition

var KTPublish = function () {
	// variables
	var wizardPublishEmbedInVariousChannels;
	
	// clipboard
	var clipboardInit = function () {
		new ClipboardJS('[data-clipboard=true]').on('success', function(e) {
			e.clearSelection();
			alert('Copied!');
		});
	};
	
	// wizzard
	var wizardPublishEmbedInVariousChannelsInit = function () {
		// Initialize form wizard
		wizardPublishEmbedInVariousChannels = new KTWizard('kt_wizard_publish_embed_in_various_channels', {
			startStep: 1,
			clickableSteps: true
		});
		
		// Change event
		wizardPublishEmbedInVariousChannels.on('change', function () {
			KTUtil.scrollTop();
		});
	};
	
	return {
		// public functions
		init: function () {
			// clipboard
			clipboardInit();
			
			// wizzard
			wizardPublishEmbedInVariousChannelsInit();
		}
	};
}();

// On document ready
KTUtil.ready(function () {
	KTPublish.init();
});

function getExistingFBEmbedding(){
	var form = new FormData();
	form.append("email", email);

	var settings = {
	"url": url_resource + "/syraconsumer/fb-embedding-info",
	"method": "POST",
	"headers": {
		"Authorization": "Bearer " + access_token
	},
	"processData": false,
	"mimeType": "multipart/form-data",
	"contentType": false,
	"data": form
	};

	jQuery.ajax(settings).done(function (response) {
		jQuery("#existingFBEmbed").remove();
		var jsonResponse = JSON.parse(response);
		var existingFbEmbedRow = '<div id="existingFBEmbed" class="row"></div>';
		
		jQuery("#embedFBList").append(existingFbEmbedRow);
		
		if(jsonResponse["data"].length != 0){
			jsonResponse["data"].forEach(element => {
				var append_New_Row = '<div class="col-lg-4">' +
										'<div class="form-group">' +
											'<label>Page Access Token</label>' +
											'<input type="text" class="form-control" value = "' + element["fbAccessToken"] + '">' +
										'</div>' +
									'</div>' + 
									'<div class="col-lg-4">' + 
										'<div class="form-group">' + 
											'<label>Page ID</label>' + 
											'<input id="pageId" type="text" class="form-control" value = "' + element["pageId"] + '">' + 
										'</div>' +
									'</div>' +
									'<div class="col-lg-4">' + 
										'<div class="form-group">' + 
											'<label>Chatbot Name</label>' + 
											'<input id="pageId" type="text" class="form-control" value = "' + element["chatbotName"] + '">' + 
										'</div>' +
									'</div>' ;
				jQuery("#existingFBEmbed").append(append_New_Row);
			});
		}
	})
	.fail(function(response){
		var APIerrorMsg='<span style="margin-left:5%;margin-bottom:18%;color:red;font-size:12px;">' + response.status + ' -> ' + response.statusText+'</span>';  
		jQuery("#existingFBEmbed").html(APIerrorMsg);
	})
}

function getExistingSlackEmbedding(){
	var form = new FormData();
	form.append("email", email);

	var settings = {
	"url": url_resource + "/syraconsumer/slack-embedding-info",
	"method": "POST",
	"headers": {
		"Authorization": "Bearer " + access_token
	},
	"processData": false,
	"mimeType": "multipart/form-data",
	"contentType": false,
	"data": form
	};

	jQuery.ajax(settings).done(function (response) {
		jQuery("#existingSlackEmbed").remove();
		var jsonResponse = JSON.parse(response);
		var existingFbEmbedRow = '<div id="existingSlackEmbed" class="row"></div>';
		jQuery("#embedSlackList").append(existingFbEmbedRow);
		
		if(jsonResponse["data"].length != 0){
			jsonResponse["data"].forEach(element => {
				var append_New_Row = '<div class="col-lg-4">' +
										'<div class="form-group">' +
											'<label>Bot User OAuth access token</label>' +
											'<input type="text" class="form-control" value = "' + element["botAccessToken"] + '">' +
										'</div>' + 
									'</div>' +
									'<div class="col-lg-4">' +
										'<div class="form-group">' +
											'<label>Display Name</label>' +
											'<input type="text" class="form-control" value = "' + element["botDisplayName"] + '">' +
										'</div>' +
									'</div>' +
									'<div class="col-lg-4">' + 
										'<div class="form-group">' + 
											'<label>Chatbot Name</label>' + 
											'<input id="pageId" type="text" class="form-control" value = "' + element["chatbotname"] + '">' + 
										'</div>' +
									'</div>' ;
				jQuery("#existingSlackEmbed").append(append_New_Row);
			});
		}
	})
	.fail(function(response){
		var APIerrorMsg='<span style="margin-left:5%;margin-bottom:18%;color:red;font-size:12px;">' + response.status + ' -> ' + response.statusText+'</span>';  
		jQuery("#existingSlackEmbed").html(APIerrorMsg);
	})
}