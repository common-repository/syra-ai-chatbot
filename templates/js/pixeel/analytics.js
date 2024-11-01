"use strict";
//Declare charts variables
var kt_amchart_number_of_users_per_day = [];
var kt_amchart_number_of_questions_per_user = [];
var kt_amchart_number_of_questions_per_hour = [];
var kt_amchart_most_common_questions = []; 
var kt_amchart_most_common_intents = [];
var kt_amchart_top_ten_visited_links = [];
var kt_amchart_unique_countries_users_visited_from = [];
var kt_amchart_average_sessions_time_per_day = [];
var kt_amchart_number_of_questions_by_users_per_session = [];
var ipAddressPlaces = [] ;
var ipAddressPlacesUserSession = [];
var questionsPerSession = [];

jQuery("#usersInMonth").html('0');
jQuery("#avgQuestionsAskedByUser").html('0'); 
jQuery("#uniqueCountry").html('0');

jQuery("#sessionsInMonth").html('0');
jQuery("#averageQuestionInMonth").html('0'); 
jQuery("#averageTimeDurationInMonth").html('0');

// Class definition
var KTAnalytics = function () {
	// charts
	var amChartsInit = function () {

		//#of Users per Day
		var numberOfUsersPerDay = AmCharts.makeChart("kt_amchart_number_of_users_per_day", {
			"type": "serial",
			"theme": "light",
			"marginRight": 0,
			"autoMarginOffset": 0,
			"marginTop": 40,
			"dataProvider": kt_amchart_number_of_users_per_day,
			"dataDateFormat": "YYYY-MM-DD",
			"valueAxes": [{
				"axisAlpha": 0.2,
				"dashLength": 1,
				"position": "left"
			}],
			"mouseWheelZoomEnabled": false,
			"graphs": [{
				"lineColor": "#472235",
				"fillColors": "#472235",
				"balloonText": "[[value]]",
				"bullet": "round",
				"bulletBorderAlpha": 1,
				"bulletColor": "#fff",
				"hideBulletsCount": 50,
				"valueField": "users",
				"useLineColorForBulletBorder": true,
				"balloon": {
					"drop": true
				}
			}],
			"chartCursor": {
				"zoomable": false
			},
			"categoryField": "date",
			"categoryAxis": {
				"parseDates": true,
				"axisColor": "#dadada",
				"dashLength": 1,
				"minorGridEnabled": true
			},
			"export": {
				"enabled": true,
				"divId": "kt_amchart_number_of_users_per_day_export"
			}
		});
		//# of Questions Per User
		// var numberOfQuestionsPerUser = AmCharts.makeChart("kt_amchart_number_of_questions_per_user", {
		// 	"type": "serial",
		// 	"theme": "light",
		// 	"dataProvider": kt_amchart_number_of_questions_per_user,
		// 	"valueAxes": [{
		// 		"stackType": "3d"
		// 	}],
		// 	"startDuration": 1,
		// 	"graphs": [{
		// 		"fillColors": "#472235",
		// 		"balloonText": "[[place]]: <b>[[users]]</b>",
		// 		"fillAlphas": 0.6,
		// 		"lineAlpha": 0.1,
		// 		"type": "column",
		// 		"valueField": "users"
		// 	}],
		// 	"plotAreaFillAlphas": 0.1,
		// 	"depth3D": 30,
		// 	"angle": 45,
		// 	"categoryField": "place",
		// 	"categoryAxis": {
		// 		"gridPosition": "start",
		// 		"labelRotation": 35
		// 	},
		// 	"export": {
		// 		"enabled": true,
		// 		"divId": "kt_amchart_number_of_questions_per_user_export"
		// 	}
		// });
		//Most Common Questions(# of times)
		var mostCommonQuestions = AmCharts.makeChart("kt_amchart_most_common_questions", {
			"type": "serial",
			"theme": "light",
			"dataProvider": kt_amchart_most_common_questions,
			"valueAxes": [{
				"minorGridAlpha": 0.08,
				"minorGridEnabled": true,
				"position": "top",
				"axisAlpha": 0
			}],
			"startDuration": 1,
			"graphs": [{
				"fillColors": "#472235",
				"fillAlphas": 0.6,
				"lineAlpha": 0.1,
				"balloonText": "The Question <b>[[question]]</b> was asked <b>[[frequency]]</b> times",
				"type": "column",
				"valueField": "frequency"
			}],
			"rotate": true,
			"categoryField": "question",
			"categoryAxis": {
				"gridPosition": "start",
				"labelFunction": function (label, item, axis) {
					var chart = axis.chart;
					
					if ((chart.realWidth <= 400) && (label.length > 5)) {
						return label.substr(0, 5) + '...';
					}
					if ((chart.realWidth <= 700) && (label.length > 10)) {
						return label.substr(0, 10) + '...';
					}
					
					return label;
				}
			},
			"export": {
				"enabled": true,
				"divId": "kt_amchart_most_common_questions_export"
			}
		});
		//# of Questions Per Hour
		var numberOfQuestionsPerHour = AmCharts.makeChart("kt_amchart_number_of_questions_per_hour", {
			"type": "serial",
			"theme": "light",
			"marginRight": 0,
			"autoMarginOffset": 0,
			"marginTop": 40,
			"dataProvider": kt_amchart_number_of_questions_per_hour,
			"dataDateFormat": "YYYY-MM-DD",
			"valueAxes": [{
				"axisAlpha": 0.2,
				"dashLength": 1,
				"position": "left"
			}],
			"mouseWheelZoomEnabled": false,
			"graphs": [{
				"lineColor": "#472235",
				"fillColors": "#472235",
				"balloonText": "[[value]]",
				"bullet": "round",
				"bulletBorderAlpha": 1,
				"bulletColor": "#fff",
				"hideBulletsCount": 50,
				"valueField": "questions",
				"useLineColorForBulletBorder": true,
				"balloon": {
					"drop": true
				}
			}],
			"chartCursor": {
				"zoomable": false
			},
			"categoryField": "date",
			"categoryAxis": {
				"parseDates": true,
				"axisColor": "#dadada",
				"dashLength": 1,
				"minorGridEnabled": true
			},
			"export": {
				"enabled": true,
				"divId": "kt_amchart_number_of_questions_per_hour_export"
			}
		});
		//Most Common Intents (# of Times)
		var mostCommonIntents = AmCharts.makeChart("kt_amchart_most_common_intents", {
			"type": "serial",
			"theme": "light",
			"dataProvider": kt_amchart_most_common_intents,
			"valueAxes": [{
				"minorGridAlpha": 0.08,
				"minorGridEnabled": true,
				"position": "top",
				"axisAlpha": 0
			}],
			"startDuration": 1,
			"graphs": [{
				"fillAlphas": 0.1,
				"lineAlpha": 1,
				"type": "column",
				"lineColor": "#472235",
				"valueField": "frequency",
				"clustered": false,
				"labelText": "[[frequency]]"
			}, {
				"fillColors": "#472235",
				"fillAlphas": 0.6,
				"lineAlpha": 0.1,
				"balloonText": "The Intent <b>[[intent]]</b> was asked <b>[[frequency]]</b> times",
				"type": "column",
				"valueField": "frequency"
			}],
			"rotate": true,
			"categoryField": "intent",
			"categoryAxis": {
				"gridPosition": "start",
				"labelFunction": function (label, item, axis) {
					var chart = axis.chart;
					
					if ((chart.realWidth <= 400) && (label.length > 5)) {
						return label.substr(0, 5) + '...';
					}
					if ((chart.realWidth <= 700) && (label.length > 10)) {
						return label.substr(0, 10) + '...';
					}
					
					return label;
				}
			},
			"export": {
				"enabled": true,
				"divId": "kt_amchart_most_common_intents_export"
			}
		});
		//Top 10 Visited Links
		var topTenVisitedLinks = AmCharts.makeChart("kt_amchart_top_ten_visited_links", {
			"type": "serial",
			"theme": "light",
			"dataProvider": kt_amchart_top_ten_visited_links,
			"valueAxes": [{
				"stackType": "3d"
			}],
			"startDuration": 1,
			"graphs": [{
				"fillColors": "#472235",
				"balloonText": "[[link]]: <b>[[frequency]]</b>",
				"fillAlphas": 0.6,
				"lineAlpha": 0.1,
				"type": "column",
				"valueField": "frequency"
			}],
			"plotAreaFillAlphas": 0.1,
			"depth3D": 30,
			"angle": 45,
			"categoryField": "link",
			"categoryAxis": {
				"gridPosition": "start",
				"labelRotation": 35,
				"labelFunction": function (label, item, axis) {
					var chart = axis.chart;
					
					if ((chart.realWidth <= 400) && (label.length > 5)) {
						return label.substr(0, 5) + '...';
					}
					if ((chart.realWidth <= 700) && (label.length > 10)) {
						return label.substr(0, 10) + '...';
					}
					
					return label;
				}
			},
			"export": {
				"enabled": true,
				"divId": "kt_amchart_top_ten_visited_links_export"
			}
		});
	};
	
	// analytics repeater
	var repeaterAnanlyticsInit = function () {
		jQuery('#kt_repeater_analytics').repeater({
			initEmpty: true,
			
			show: function () {
				jQuery(this).slideDown();
			},
			
			hide: function (deleteElement) {
				if (confirm('Are you sure you want to delete this element?')) {
					jQuery(this).slideUp(deleteElement);
				}
			}
		});
	};
	
	return {
		// public functions
		init: function () {
			amChartsInit();
			repeaterAnanlyticsInit();
		}
	};
}();

//Load AmWorld Map
var KTAnlyticsWorldMap = function(){
	var amWorldChartInit = function(){
		//Unique Countries Users Visited From (# of Times)
		var uniqueCountriesUsersVisitedFrom = AmCharts.makeChart("kt_amchart_unique_countries_users_visited_from", {
			"type": "map",
			"theme": "light",
			"projection": "miller",
			"dataProvider": {
				"map": "worldLow",
				"areas": kt_amchart_unique_countries_users_visited_from
			},
			"areasSettings": {
				"color": "#472235",
				"balloonText": "Questions asked from <br> <b>[[title]]</b>: <b>[[value]]</b>"
				// "unlistedAreasColor": "#ccc"
			},
			"export": {
				"enabled": true,
				"divId": "kt_amchart_unique_countries_users_visited_from_export"
			}
		});
	} 
	return {
		// public functions
		init: function () {
			amWorldChartInit();
		}
	};
}();

// On document ready
// KTUtil.ready(function () {
// 	KTAnalytics.init();
// });

/*Start of UserAnalytics*/
//Load analytics Charts and Cards
function loadAnalyticsCharts(userCredentials){
	getUserAnalyticsData(userCredentials);
	getChatterDemographic(userCredentials);

    jQuery("#usersInMonth").html('<img src="'+wp_path+'"images/syra-spinner.gif" height="35"/>');
    jQuery("#avgQuestionsAskedByUser").html('<img src="'+wp_path+'"images/syra-spinner.gif" height="35"/>'); 
    jQuery("#uniqueCountry").html('<img src="'+wp_path+'"images/syra-spinner.gif" height="35"/>');
    
    jQuery("#kt_amchart_number_of_users_per_day").html('<img src="'+wp_path+'"images/syra-spinner.gif" height="35" style="margin-bottom:10%;"/>');
    jQuery("#kt_amchart_number_of_questions_per_user").html('<img src="'+wp_path+'"images/syra-spinner.gif" height="35" style="margin-bottom:10%;"/>');
    jQuery("#kt_amchart_most_common_questions").html('<img src="'+wp_path+'"images/syra-spinner.gif" height="35" style="margin-bottom:10%;"/>');
    jQuery("#kt_amchart_number_of_questions_per_hour").html('<img src="'+wp_path+'"images/syra-spinner.gif" height="35" style="margin-bottom:10%;"/>');
    jQuery("#kt_amchart_most_common_intents").html('<img src="'+wp_path+'"images/syra-spinner.gif" height="35" style="margin-bottom:10%;"/>');
    jQuery("#kt_amchart_top_ten_visited_links").html('<img src="'+wp_path+'"images/syra-spinner.gif" height="35" style="margin-bottom:10%;"/>');
    jQuery("#kt_amchart_unique_countries_users_visited_from").html('<img src="'+wp_path+'"images/syra-spinner.gif" height="35" style="margin-bottom:10%;"/>');
}

//Get User Analytics in Users Tab
function getUserAnalyticsData(userCredentials){
    var apiKey = userCredentials["apiKey"];
	var customerId = userCredentials["customerId"];
	var domainId = userCredentials["domainId"];
    var form = new FormData();
    var api_endpoint="";
    form.append("APIkey", apiKey);
    api_endpoint="dashboard-users-analytics";
    var settings = {
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

    jQuery.ajax(settings).done(function(response){
        var jsonResponse = JSON.parse(response);
		if(jsonResponse.status == 200 && jsonResponse.message != "No Records Found!")
		{
			//Users is last 30 days
			jQuery("#usersInMonth").html(jsonResponse.usersInMonth);
			
			//Avg. # of Questions Asked in Last 30 days
            jQuery("#avgQuestionsAskedByUser").html(jsonResponse.averageQuestionInMonth);
			
			//#of Users per Day
			if(jsonResponse.usersPerDayInMonth != undefined){
				if(jsonResponse.usersPerDayInMonth.length > 0){
					getUserCountPerDay(jsonResponse.usersPerDayInMonth);
				}
				else{
					jQuery("#kt_amchart_number_of_users_per_day").html("No Data Exists");
				}
			}
			
			
			
			//# of Questions Per User
			var ipAddressPlacesList = [];
			if(jsonResponse.noOfQuestionsPerUserInMonth.length > 0){
				getCityCountryFromIP(jsonResponse.noOfQuestionsPerUserInMonth[0], jsonResponse.noOfQuestionsPerUserInMonth[1]);
			}
			//Most Common Questions(# of times)
			if(jsonResponse.top10Questions != undefined){
				if(jsonResponse.top10Questions != 0){
					getMostCommonQuestions(jsonResponse.top10Questions);
				}
				else{
					jQuery("#kt_amchart_most_common_questions").html("No Data Exists");
				}
			}
			

			//Most Common Intents (# of Times)
			if(jsonResponse.top10Intents != undefined){
				if(jsonResponse.top10Intents != 0){
					getMostCommonIntents(jsonResponse.top10Intents);
				}
				else{
					jQuery("#kt_amchart_most_common_intents").html("No Data Exists");
				}
			}

			//Most Common Visited Links
			if(jsonResponse.top10Links != undefined){
				if(jsonResponse.top10Links != 0){
					getMostCommonLinks(jsonResponse.top10Links);
				}
				else{
					jQuery("#kt_amchart_top_ten_visited_links").html("No Data Exists");
				}
			}
			
			//# of Questions Per Hour
			if(jsonResponse.questionsPerHourOfDay != undefined){
				getQuestionsPerHour(jsonResponse.questionsPerHourOfDay);
			}
			if(jsonResponse.questionsPerHourOfDay == undefined){
				jQuery("#kt_amchart_number_of_questions_per_hour").html("No Data Exists");
			}
			
			setTimeout(() => {
				// if(ipAddressPlacesList.length > 0){
				// 	for(let index = 0; index < ipAddressPlacesList.length; index++) {
				// 		kt_amchart_number_of_questions_per_user.push({place : ipAddressPlacesList[index], users : jsonResponse.noOfQuestionsPerUserInMonth[1][index]});
				// 	}
				// 	//Initialize amCharts
				// }
				// else{
				// 	jQuery("#kt_amchart_number_of_questions_per_user").html("No Data Exists");
				// }
				KTAnalytics.init();
			}, 1000);
		}
		else{
			var APIerrorMsg='<span style="margin-left:5%;margin-bottom:18%;color:red;font-size:12px;">'+api_endpoint+' - '+response.message+'</span>';  

            jQuery("#kt_amchart_number_of_users_per_day").html("No Data Exists");
            jQuery("#kt_amchart_number_of_questions_per_user").html("No Data Exists");
            jQuery("#kt_amchart_top_ten_visited_links").html("No Data Exists");
            jQuery("#kt_amchart_most_common_intents").html("No Data Exists");
            jQuery("#kt_amchart_most_common_questions").html("No Data Exists"); 
			jQuery("#kt_amchart_number_of_questions_per_hour").html("No Data Exists"); 
            jQuery("#usersInMonth").html('0');
            jQuery("#avgQuestionsAskedByUser").html('0');
		}
	})
	.fail(function(response) 
    {           
        var APIerrorMsg='<span style="margin-left:5%;margin-bottom:18%;color:red;font-size:12px;">'+api_endpoint+' -> '+response.status+' -> '+response.statusText+'</span>';  

        jQuery("#kt_amchart_number_of_users_per_day").html("No Data Exists");
		jQuery("#kt_amchart_number_of_questions_per_user").html("No Data Exists");
		jQuery("#kt_amchart_top_ten_visited_links").html("No Data Exists");
		jQuery("#kt_amchart_most_common_intents").html("No Data Exists");
		jQuery("#kt_amchart_most_common_questions").html("No Data Exists"); 
		jQuery("#kt_amchart_number_of_questions_per_hour").html("No Data Exists"); 
		jQuery("#usersInMonth").html("0");
		jQuery("#avgQuestionsAskedByUser").html("0");
    });
}

//Starting of sub functions of user tabs
//Get location details based on ipaddress
function getCityCountryFromIP(ipAddressList, noOfQuestionsPerUserInMonth){
	if(ipAddressList.length > 0){
		var form = new FormData();
		form.append("ipAddressList", JSON.stringify(ipAddressList));
		var settings = 
		{
			"async": true,
			"url": url_resource + "/syraconsumer/get-ipaddress-details-in-dashboard",
			"method": "POST",
			headers: {
				'Authorization': 'Bearer '+ access_token,
			},
			"processData": false,
			"contentType": false,
			"mimeType": "multipart/form-data",
			"data": form
		}
		jQuery.ajax(settings).done(function (response) {
			var jsonResponse = JSON.parse(response);
			if(jsonResponse.status == 200){
				ipAddressPlaces = jsonResponse.data;
			}
			setTimeout(function(){
				if(ipAddressPlaces.length > 0){
					for(let index = 0; index < ipAddressPlaces.length; index++) {
						kt_amchart_number_of_questions_per_user.push({place : ipAddressPlaces[index], users : noOfQuestionsPerUserInMonth[index]});
					}
					var numberOfQuestionsPerUser = AmCharts.makeChart("kt_amchart_number_of_questions_per_user", {
						"type": "serial",
						"theme": "light",
						"dataProvider": kt_amchart_number_of_questions_per_user,
						"valueAxes": [{
							"stackType": "3d"
						}],
						"startDuration": 1,
						"graphs": [{
							"fillColors": "#472235",
							"balloonText": "[[place]]: <b>[[users]]</b>",
							"fillAlphas": 0.6,
							"lineAlpha": 0.1,
							"type": "column",
							"valueField": "users"
						}],
						"plotAreaFillAlphas": 0.1,
						"depth3D": 30,
						"angle": 45,
						"categoryField": "place",
						"categoryAxis": {
							"gridPosition": "start",
							"labelRotation": 35
						},
						"export": {
							"enabled": true,
							"divId": "kt_amchart_number_of_questions_per_user_export"
						}
					});
					//Initialize amCharts
				}
				else{
					jQuery("#kt_amchart_number_of_questions_per_user").html("No Data Exists");
				}
			},1000)
		})
		.fail(function(response){
			ipAddressPlaces = [];
		})
		// for(var index = 0; index < ipAddressList.length; index++){
		// 	var settings = {
		// 		"url": "https://extreme-ip-lookup.com/json/" + ipAddressList[index],
		// 		"method": "GET",
		// 		"timeout": 0,
		// 	  };
		// 	  jQuery.ajax(settings).done(function (response) {
		// 		ipAddressPlaces.push(response["city"] + ", " + response["country"]);
		// 	});
		// }
	}
}


function getCityCountryFromIPUserSession(ipAddressList, questionsPerSession){
	if(ipAddressList.length > 0){
		var form = new FormData();
		form.append("ipAddressList", JSON.stringify(ipAddressList));
		var settings = 
		{
			"async": true,
			"url": url_resource + "/syraconsumer/get-ipaddress-details-in-dashboard",
			"method": "POST",
			headers: {
				'Authorization': 'Bearer '+ access_token,
			},
			"processData": false,
			"contentType": false,
			"mimeType": "multipart/form-data",
			"data": form
		}
		jQuery.ajax(settings).done(function (response) {
			var jsonResponse = JSON.parse(response);
			if(jsonResponse.status == 200){
				ipAddressPlacesUserSession = jsonResponse.data
			}
			setTimeout(function(){
				if(ipAddressPlacesUserSession.length > 0){
					for (let index = 0; index < ipAddressPlacesUserSession.length; index++) {
						kt_amchart_number_of_questions_by_users_per_session.push({place : ipAddressPlacesUserSession[index], users : questionsPerSession[index]});	
					}
				}
				//# of Questions by Users Per Session
				var numberOfQuestionsByUsersPerSession = AmCharts.makeChart("kt_amchart_number_of_questions_by_users_per_session", {
					"type": "serial",
					"theme": "light",
					"dataProvider": kt_amchart_number_of_questions_by_users_per_session,
					"valueAxes": [{
						"stackType": "3d"
					}],
					"startDuration": 1,
					"graphs": [{
						"fillColors": "#472235",
						"balloonText": "[[place]]: <b>[[users]]</b>",
						"fillAlphas": 0.6,
						"lineAlpha": 0.1,
						"type": "column",
						"valueField": "users"
					}],
					"plotAreaFillAlphas": 0.1,
					"depth3D": 30,
					"angle": 45,
					"categoryField": "place",
					"categoryAxis": {
						"gridPosition": "start",
						"labelRotation": 35
					},
					"export": {
						"enabled": true,
						"divId": "kt_amchart_number_of_questions_by_users_per_session_export"
					}
				});
			},1000);
		})
		.fail(function(response){
			ipAddressPlacesUserSession = [];
		})
	}
}

//Get #of Users per Day
function getUserCountPerDay(usersPerDayInMonth){
	usersPerDayInMonth.forEach(element => {
		var epochToDateValue = new Date( parseFloat(element[0]));
		var month = epochToDateValue.getMonth() + 1;
		var date = epochToDateValue.getDate();
		if(month < 10){
			month =  "0" + month.toString();
		}
		if(date < 10){
			date = "0" + date.toString();
		}
		var dateTimeConvertValue = epochToDateValue.getFullYear() + "-" + month + "-" + date;
		kt_amchart_number_of_users_per_day.push({date : dateTimeConvertValue, users : element[1]});
	});
}

//Get Top10 Questions asked by user
function getMostCommonQuestions(userQuestionsList){
	userQuestionsList.forEach(element => {
		kt_amchart_most_common_questions.push({question : element[0], frequency : element[1]});
	});
}

//Get Most Common Intents
function getMostCommonIntents(intentsList){
	intentsList.forEach(element => {
		kt_amchart_most_common_intents.push({intent : element[0], frequency : element[1]});
	});
}

//Get Most Vistited Links
function getMostCommonLinks(visitedLinksList){
	if(visitedLinksList[0].length > 0){
		for(var index =0; index < visitedLinksList[0].length; index++){
			kt_amchart_top_ten_visited_links.push({link : visitedLinksList[0][index], frequency : visitedLinksList[1][index]})
		}
	}
}

//Get count of questions per hour
function getQuestionsPerHour(questionsListPerHour){
	questionsListPerHour.forEach(element => {
		var epochToDateValue = new Date( parseFloat(element[0]));
		var month = epochToDateValue.getMonth() + 1;
		var date = epochToDateValue.getDate();
		if(month < 10){
			month =  "0" + month.toString();
		}
		if(date < 10){
			date = "0" + date.toString();
		}
		var dateTimeConvertValue = epochToDateValue.getFullYear() + "-" + month + "-" + date;
		kt_amchart_number_of_questions_per_hour.push({date : dateTimeConvertValue, questions : element[1]});
	});
}

/*Start of Chatters Demographics*/
function getChatterDemographic(userCredentials){
	var apiKey = userCredentials["apiKey"];
	// var customerId = userCredentials["customerId"];
	// var domainId = userCredentials["domainId"];
	var form = new FormData();
    var api_endpoint="";
    form.append("APIkey", apiKey);
	// api_endpoint="analytics-chatter-demo-graphics";
	api_endpoint="get-user-ipaddress-analysis";
	// natura_url_resource + "/natura/"+api_endpoint,
	var settings = 
    {
        "async": true,
        "url": url_resource + "/syraconsumer/" + api_endpoint,
        "method": "POST",
        headers: 
        {
            'Authorization': 'Bearer '+access_token,
        },
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
	}
	jQuery.ajax(settings).done(function (response) 
    {
		var data = JSON.parse(response);
		if (data.status === 200) 
        {
			var regionData = data.data;
			jQuery("#uniqueCountry").html(regionData.length);
			if(regionData.length == 0){
				jQuery("#uniqueCountry").html('0');
            	jQuery("#kt_amchart_unique_countries_users_visited_from").html("No Data Exists");
			}
			else{
				//Unique Countries Users Visited From (# of Times)
				getWorldMap(regionData);
			}
		}
		else{
			var APIerrorMsg='<span style="margin-left:5%;margin-bottom:18%;color:red;font-size:10px;line-height:unset;">'+api_endpoint+' '+data.message+'</span>';                                                                
            jQuery("#uniqueCountry").html('0');
            jQuery("#kt_amchart_unique_countries_users_visited_from").html("No Data Exists");
		}
	})
	.fail(function(response){
		var APIerrorMsg='<span style="margin-left:5%;margin-bottom:18%;color:red;font-size:10px;line-height:unset;">'+api_endpoint+' -> '+response.status+' -> '+response.statusText+'</span>';                                                                
        jQuery("#uniqueCountry").html('0');
        jQuery("#kt_amchart_unique_countries_users_visited_from").html("No Data Exists"); 
	})
}
//Get World Data
function getWorldMap(worldMapData){
	worldMapData.forEach(element => {
		kt_amchart_unique_countries_users_visited_from.push({id : element["code"], value : element["value"]})
	});
	setTimeout(function(){
		//Initialize AmWorldCharts
		KTAnlyticsWorldMap.init();
	},10)
}
/*End of Chatters Demographics*/

//Ending of sub functions of user tabs
/*End of UserAnalytics*/

/*Start of Session Analytics*/
//Load Session Charts and Cards
function loadSessionCharts(userCredentials){
	sessionAnalytics(userCredentials);
	jQuery("#sessionsInMonth").html('<img src="'+wp_path+'"images/syra-spinner.gif" height="35"/>');
    jQuery("#averageQuestionInMonth").html('<img src="'+wp_path+'"images/syra-spinner.gif" height="35"/>'); 
    jQuery("#averageTimeDurationInMonth").html('<img src="'+wp_path+'"images/syra-spinner.gif" height="35"/>');
}

//Get User Session in Session Tab
function sessionAnalytics(userCredentials){
	var apiKey = userCredentials["apiKey"];
	var customerId = userCredentials["customerId"];
	var domainId = userCredentials["domainId"];
	var form = new FormData();
    var api_endpoint="";
	form.append("APIkey", apiKey);
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
		var jsonResponse = JSON.parse(response);
		if(jsonResponse.status == 200){
			jQuery("#sessionsInMonth").html(jsonResponse.sessionsInMonth);
			jQuery("#averageQuestionInMonth").html(jsonResponse.averageQuestionInMonth);
			jQuery("#averageTimeDurationInMonth").html("<font style='font-size:28px'>" + jsonResponse.averageTimeDurationInMonth + "</font>");
			
			//Avg. Session Time Per Day
			setTimeout(function(){
				if(jsonResponse.avgTimeSpentPerDayInMonth != undefined){
					if(jsonResponse.avgTimeSpentPerDayInMonth.length > 0){
										getAvgSessionPerDay(jsonResponse.avgTimeSpentPerDayInMonth);
									}
									else{
										jQuery("#kt_amchart_average_sessions_time_per_day").html("No Data Exists");
									}
				}
				if(jsonResponse.questionsByUserPerSession != undefined){
					if(jsonResponse.questionsByUserPerSession.length > 0){
										getQuestionsPerSession(jsonResponse.questionsByUserPerSession);
									}
									else{
										jQuery("#kt_amchart_number_of_questions_by_users_per_session").html("No Data Exists");
									}
				}
			},1000);
			
		}
		else{
			var APIerrorMsg='<span style="margin-left:5%;margin-bottom:18%;color:red;font-size:10px;line-height:unset;">'+api_endpoint+' - '+response.message+'</span>';                                                                 
			jQuery("#sessionsInMonth").html('0');
			jQuery("#averageQuestionInMonth").html('0');
			jQuery("#averageTimeDurationInMonth").html('0');
			jQuery("#kt_amchart_average_sessions_time_per_day").html("No Data Exists");
			jQuery("#kt_amchart_number_of_questions_by_users_per_session").html("No Data Exists");
		}
	})
	.fail(function(response){
		var APIerrorMsg='<span style="margin-left:5%;margin-bottom:18%;color:red;font-size:10px;line-height:unset;">'+api_endpoint+' -> '+response.status+' -> '+response.statusText+'</span>';                                                                 
		jQuery("#sessionsInMonth").html('0');
		jQuery("#averageQuestionInMonth").html('0');
		jQuery("#averageTimeDurationInMonth").html('0');
		jQuery("#kt_amchart_average_sessions_time_per_day").html("No Data Exists");
		jQuery("#kt_amchart_number_of_questions_by_users_per_session").html("No Data Exists");

	})
}

//Load AmCharts for Session Tab 
//Get Average Session
function getAvgSessionPerDay(userSessionData){
	setTimeout(function(){
		if(userSessionData[0].length > 0){
			for(var index=0; index < userSessionData[0].length; index++){
				kt_amchart_average_sessions_time_per_day.push({date : userSessionData[0][index], users : userSessionData[1][index]})
			}
			//Avg. Session Time Per Day
			var averageSessionsTimePerDay = AmCharts.makeChart("kt_amchart_average_sessions_time_per_day", {
				"type": "serial",
				"theme": "light",
				"dataProvider": kt_amchart_average_sessions_time_per_day,
				"dataDateFormat": "DD/MM/YYYY",
				"valueAxes": [{
					"stackType": "3d"
				}],
				"startDuration": 1,
				"graphs": [{
					"fillColors": "#472235",
					"balloonText": "[[date]]: <b>[[users]]</b>",
					"fillAlphas": 0.6,
					"lineAlpha": 0.1,
					"type": "column",
					"valueField": "users"
				}],
				"plotAreaFillAlphas": 0.1,
				"depth3D": 30,
				"angle": 45,
				"categoryField": "date",
				"categoryAxis": {
					"gridPosition": "start",
					"labelRotation": 35
				},
				"export": {
					"enabled": true,
					"divId": "kt_amchart_average_sessions_time_per_day_export"
				}
			});
		}
	},1000);
}

//Get Questions Per Session
function getQuestionsPerSession(questionsPerSession){
	if(questionsPerSession.length > 0){
		getCityCountryFromIPUserSession(questionsPerSession[0], questionsPerSession[1]);
		
	}
}
/*End of Session Analytics*/
