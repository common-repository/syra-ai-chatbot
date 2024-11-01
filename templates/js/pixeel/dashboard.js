"use strict";

//Declare variables to put in charts
var kt_amchart_number_of_users_per_day = [];
var kt_amchart_average_sessions_time_per_day = [];
var kt_amchart_unique_countries_users_visited_from = [];

// Class definition

jQuery("#usersInMonth").html('0');
jQuery("#sessionsInMonth").html('0');
jQuery("#goalConvertedInMonth").html('0');
jQuery("#countChattersDemographics").html('0');

var KTDashboard = function () {
	// charts
	var amChartsInit = function () {
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
	};
	
	return {
		// public functions
		init: function () {
			amChartsInit();
		}
	};
}();

var KTAvgSessionDashboard = function (){
	var amAvgSessionInit = function (){
		var averageSessionsTimePerDay = AmCharts.makeChart("kt_amchart_average_sessions_time_per_day", {
			"type": "serial",
			"theme": "light",
			"dataProvider": kt_amchart_average_sessions_time_per_day,
			"dataDateFormat": "MM/DD/YYYY",
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

	return {
		// public functions
		init: function () {
			amAvgSessionInit();
		}
	};
}();

var KTWorldDashboard = function(){
	var amWorldChartsInit = function(){
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
			amWorldChartsInit();
		}
	};
}();

// On document ready
// KTUtil.ready(function () {
// 	KTDashboard.init();
// });

/*Start to implement dashboard loading*/
function loadDashboardCharts(userCredentials){
	getUsersInDashboard(userCredentials);
	getSessionCountPerMonth(userCredentials);
	getCountGoalConverted(userCredentials);
	//getAvgGoalsConvertedPerDay(userCredentials);
	//getGoalConversionOnLocation(userCredentials);
	getChatterDemographic(userCredentials);
	jQuery("#countChattersDemographics").html('<img src="'+wp_path+'"images/syra-spinner.gif" height="35"/>');
	
	jQuery("#usersInMonth").html('<img src="'+wp_path+'"images/syra-spinner.gif" height="35"/>');
	jQuery("#sessionsInMonth").html('<img src="'+wp_path+'"images/syra-spinner.gif" height="35"/>');
	jQuery("#goalConvertedInMonth").html('<img src="'+wp_path+'"images/syra-spinner.gif" height="35"/>');

	jQuery("#kt_amchart_number_of_users_per_day").html('<img src="'+wp_path+'"images/syra-spinner.gif" height="35"/>');
	jQuery("#kt_amchart_average_sessions_time_per_day").html('<img src="'+wp_path+'"images/syra-spinner.gif" height="35"/>');
	jQuery("#kt_amchart_unique_countries_users_visited_from").html('<img src="'+wp_path+'"images/syra-spinner.gif" height="35"/>');

}

//Goals Coverted This Month
function getCountGoalConverted(userCredentials){
	var apiKey = userCredentials["apiKey"];
	var botDeploymentId= userCredentials["botDeploymentId"];
	var domainId = userCredentials["domainId"];
	var form = new FormData();
	var api_endpoint="";
	form.append("APIkey", apiKey);
	form.append("botdeploymentId", botDeploymentId);
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
	jQuery.ajax(settings).done(function (response) {
		var jsonResponse = JSON.parse(response);
		if(jsonResponse.status == 200){
			jQuery("#goalConvertedInMonth").html(jsonResponse.goalConvertedInMonth);
		}
		else{
			var APIerrorMsg='<span style="margin-left:5%;margin-bottom:18%;color:red;font-size:12px;">'+api_endpoint+' - '+response.message+'</span>';  
			jQuery("#goalConvertedInMonth").html('0');
		}
	})
	.fail(function(response){
		var APIerrorMsg='<span style="margin-left:5%;margin-bottom:18%;color:red;font-size:12px;">'+api_endpoint+' -> '+response.status+' -> '+response.statusText+'</span>';  
		jQuery("#goalConvertedInMonth").html('0');
	})
}

function getUsersInDashboard(userCredentials){
	var apiKey = userCredentials["apiKey"];
	var domainId = userCredentials["domainId"];
	var customerId = userCredentials["customerId"];
	var form = new FormData();
	var api_endpoint="";
	form.append("APIkey", apiKey);
	api_endpoint="dashboard-users-analytics";
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
	jQuery.ajax(settings).done(function (response) {
		var jsonResponse = JSON.parse(response);
		if(jsonResponse.status == 200){
			if(jsonResponse.message == "No Records Found!"){
				jQuery("#kt_amchart_number_of_users_per_day").html('No Data Exists');
				jQuery("#usersInMonth").html('0');
			}
			else{
				jQuery("#usersInMonth").html(jsonResponse.usersInMonth);
					setTimeout(function(){
						getCountofUsersPerDay(jsonResponse.usersPerDayInMonth);
						KTDashboard.init();
					},100)
			}
			
		}
		else{
			var APIerrorMsg='<span style="margin-left:5%;margin-bottom:18%;color:red;font-size:12px;">'+api_endpoint+' - '+response.message+'</span>';  
			jQuery("#kt_amchart_number_of_users_per_day").html('No Data Exists');
			jQuery("#usersInMonth").html('0');
		}
	})
	.fail(function(response){
		var APIerrorMsg='<span style="margin-left:5%;margin-bottom:18%;color:red;font-size:12px;">'+api_endpoint+' -> '+response.status+' -> '+response.statusText+'</span>';  
		jQuery("#kt_amchart_number_of_users_per_day").html('No Data Exists');
		jQuery("#usersInMonth").html('0');
	})
}

//To get count of users per day
function getCountofUsersPerDay(usersDateTimeData){
	usersDateTimeData.forEach(element => {
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

//To get Session Data 
//api call
function getSessionCountPerMonth(userCredentials){
	var apiKey = userCredentials["apiKey"];
	var domainId = userCredentials["domainId"];
	var customerId = userCredentials["customerId"];
	var form = new FormData();
	var api_endpoint="";
	form.append("APIkey", apiKey);
	api_endpoint="dashboard-session-analytics";
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
	jQuery.ajax(settings).done(function (response) {
		var jsonResponse = JSON.parse(response);
		if(jsonResponse.status == 200){
			jQuery("#sessionsInMonth").html(jsonResponse.sessionsInMonth);
			if(jsonResponse.avgTimeSpentPerDayInMonth.length > 0){
				setTimeout(function(){
					getAvgSessionTimePerDay(jsonResponse.avgTimeSpentPerDayInMonth);
					KTAvgSessionDashboard.init();
				})
			}
			else{
				jQuery("#kt_amchart_average_sessions_time_per_day").html("No Data Exists");
				jQuery("#sessionsInMonth").html('0');
			}
		}
		else{
			var APIerrorMsg='<span style="margin-left:5%;margin-bottom:18%;color:red;font-size:12px;">'+api_endpoint+' - '+jsonResponse.message+'</span>';  
			jQuery("#sessionsInMonth").html('0');
			jQuery("#kt_amchart_average_sessions_time_per_day").html("No Data Exists");
		}
	})
	.fail(function(response){
		var APIerrorMsg='<span style="margin-left:5%;margin-bottom:18%;color:red;font-size:12px;">'+api_endpoint+' -> '+response.status+' -> '+response.statusText+'</span>';  
		jQuery("#sessionsInMonth").html('0');
		jQuery("#kt_amchart_average_sessions_time_per_day").html("No Data Exists");
	})
}
//To get Avg. Session Duration Per Day 
function getAvgSessionTimePerDay(userSessionData){
	if(userSessionData[0].length >0){
		for (let index = 0; index < userSessionData[0].length; index++) {
			kt_amchart_average_sessions_time_per_day.push({date : userSessionData[0][index], users : userSessionData[1][index]})
		}
	}
}

//To get Avg. Goals Converted Per Day
//api call
function getAvgGoalsConvertedPerDay(userCredentials){
	var apiKey = userCredentials["apiKey"];
	var domainId = userCredentials["domainId"];
	var customerId = userCredentials["customerId"];
	var botDeploymentId = userCredentials["botDeploymentId"];
	if(typeof(botDeploymentId) == "undefined"){
		botDeploymentId = "";
	}
	var form = new FormData();
	form.append("botdeploymentId", botDeploymentId);
	form.append("APIkey", apiKey);
	var api_endpoint="";
	api_endpoint="dashboard-goal-analytics";
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
			// chart embed
		}
	})
}

// To get Goal Conversion on Location basis
function getGoalConversionOnLocation(userCredentials){
	var apiKey = userCredentials["apiKey"];
	var botDeploymentId = userCredentials["botDeploymentId"];
	var domainId = userCredentials["domainId"];
	var form = new FormData();
	form.append("botdeploymentId", botDeploymentId);
	form.append("APIkey", apiKey);
	var api_endpoint = "";
	api_endpoint="natura-individual-goal-maps";
	var goalConversionWorldMapData = [];
	var settings = {
		"async": true,
		"url": url_resource + "/syraconsumer/"+api_endpoint,
		"method": "POST",
		headers: {
			'Authorization': 'Bearer '+access_token
		},
		"processData": false,
		"contentType": false,
		"mimeType": "multipart/form-data",
		"data": form
	}
	jQuery.ajax(settings).done(function(response){
		var jsonResponse = JSON.parse(response);
		var data = [];
		if(jsonResponse.status == 200){
			for(var index = 0; index< jsonResponse.data.length; index ++){
				data.push({key : jsonResponse['data'][index]['data'][0]["code2"], value : jsonResponse['data'][index]['data'][0]["value"]});
			}
			// get count of duplicate elements 
			kt_amchart_unique_countries_users_visited_from = Array.from(
				data.reduce((m, { key, value }) => m.set(key, (m.get(key) || 0) + value), new Map),
				([id, value]) => ({ id, value })
			);
			KTWorldDashboard.init();
		}
		else{
			KTWorldDashboard.init();
		}
	})
	.fail(function(response){
		var APIerrorMsg='<span style="margin-left:5%;margin-bottom:18%;color:red;font-size:12px;">'+api_endpoint+' -> '+response.status+' -> '+response.statusText+'</span>';
		jQuery("#kt_amchart_unique_countries_users_visited_from").html("No Data Exists");
	})
} 
/*End to implement dashboard loading*/

function getChatterDemographic(userCredentials){
	var apiKey = userCredentials["apiKey"];
	var customerId = userCredentials["customerId"];
	var domainId = userCredentials["domainId"];
	var form = new FormData();
    var api_endpoint="";
	form.append("APIkey", apiKey);
	api_endpoint = "get-user-ipaddress-analysis"
    // api_endpoint="analytics-chatter-demo-graphics";
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
			
			//Unique Countries Users Visited From (# of Times)
			getWorldMap(regionData);
			jQuery("#countChattersDemographics").html(data["countryCount"]);
		}
		else{
			var APIerrorMsg='<span style="margin-left:5%;margin-bottom:18%;color:red;font-size:10px;line-height:unset;">'+api_endpoint+' '+data.message+'</span>';                                                                
            jQuery("#uniqueCountry").html('0');
			jQuery("#kt_amchart_unique_countries_users_visited_from").html("No Data Exists");
			jQuery("#countChattersDemographics").html(0);
		}
	})
	.fail(function(response){
		var APIerrorMsg='<span style="margin-left:5%;margin-bottom:18%;color:red;font-size:10px;line-height:unset;">'+api_endpoint+' -> '+response.status+' -> '+response.statusText+'</span>';                                                                
        jQuery("#uniqueCountry").html('0');
		jQuery("#kt_amchart_unique_countries_users_visited_from").html("No Data Exists"); 
		jQuery("#countChattersDemographics").html(0);
	})
}
//Get World Data
function getWorldMap(worldMapData){
	worldMapData.forEach(element => {
		kt_amchart_unique_countries_users_visited_from.push({id : element["code"], value : element["value"]})
	});
	setTimeout(function(){
		//Initialize AmWorldCharts
		KTWorldDashboard.init();
	},10)
}
/*End of Chatters Demographics*/

//Redirect to customize page
function goToCustomize(){
	window.location.href = "customize.html";
}
