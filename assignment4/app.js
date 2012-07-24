"use strict";

var MYAPP = {};

// Initialize 
MYAPP.init = {
	// Acquire a pre-formatted address
	getFormattedAddress: function(lat, lng, geocoder) {
		var latlng = new google.maps.LatLng(lat, lng);
		geocoder.geocode({'latLng': latlng}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				if (results[1]) {
		        	var locationAddress = results[0].formatted_address.toString();
					stash.set('address', locationAddress);
				}
				else {
					alert("No results found");
				}
			}
			else {
				alert("Geocoder failed because: " + status);
			}
		});
	},
	
	initGeo: function() {
		//load an inital value 
		stash.set('address', "Halle, Germany");
		
		var geocoder = new google.maps.Geocoder();
		
		// If we have Geolocation, acquire position and get an address					
		if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition( success, error);
		}
		else {
			alert("Sorry, no geolocation available.");
		}
		
		function error(err) {
			alert("Error: " + err.message);
		}
		
		function success(position) {
			var latitude = position.coords.latitude;
			var longitude = position.coords.longitude;
			MYAPP.init.getFormattedAddress(latitude, longitude, geocoder);
		}
	},
	
	// Setup some sample entries from storage, in case the diary hasn't been used yet
	initStorage: function() {
		if(!stash.get('Identifiers') || (stash.get('Identifiers') == '')) {
			var initDate = Date.parse(new Date());
			var firstEntry = '{"headline":"Wrote my first mobile application", "body":"Today I wrote my first mobile application. It was great! I had huge amounts of fun, it was a lot easier than I expected, and I was so happy I spent the rest of the day celebrating.","time":' + initDate + ',"address":"' + stash.get('address') + '"}';
			stash.set(initDate.toString(), firstEntry);
			stash.set('Identifiers', initDate.toString() + " ");
		
			var secondDate = initDate + 1000;
			var secondEntry = '{"headline":"Wrote another mobile application", "body":"I am on such a roll with these mobile Web applications that I went crazy and wrote a second one. I am so happy I cannot stop singing at the top of my lungs. My cat seems worried that I\'ve finally lost it completely, but I don\'t care — it\'s mobile Web all the way from now on!","time":' + secondDate + ',"address":"' + stash.get('address') + '"}';
			stash.set(secondDate.toString(), secondEntry);
			stash.add('Identifiers', secondDate.toString() + " ");
		
			var thirdDate = initDate + 2000;
			var thirdEntry = '{"headline":"Must stop writing mobile application", "body":"My fingers are sore from writing so many great mobile Web applications. I know that I should stop and take a break, but there are so many great things to do with this technology that I really don\'t know how to stop!","time":' + thirdDate + ',"address":"' + stash.get('address') + '"}';
			stash.set(thirdDate.toString(), thirdEntry);
			stash.add('Identifiers', thirdDate.toString());
		}
	},

	
	initView: function() {
		var identifiers = stash.get('Identifiers').toString().split(" ");

		identifiers.map(function(item) {
			if(item.substring(0,1) == "1") {
				var loadedEntry = eval('(' + stash.get(item) + ')');
				MYAPP.init.writeEntry(loadedEntry);
			}
		});
	},

	writeEntry: function(thisEntry) {
		// This is view code
		var entry = "<article>" + 
					"<h2>" + thisEntry.headline + 
					"<\/h2>" + 
					"<p>" + thisEntry.body + "<\/p>" + 
					"<span id=\"time\">" + new Date(thisEntry.time) + "<\/span>" +
					"\t| Address: <span id=\"address\">" + thisEntry.address + "<\/span>\t|\t" +
					"<a href=\"\#\" class=\"deleter\">Delete this entry<\/a>" +
					"<\/article>";
	
		$(".entries").append(entry);
	},
	
	isOnline: function() {
		if ("onLine" in navigator) {
			window.addEventListener("online", function online(e) {
				$('#header').css('color', 'green');
			});
			
			window.addEventListener("offline", function offline(e) {
				$('#header').css('color', 'red');
			});
		}
		
		if(navigator.onLine) {
			$('#header').css('color', 'green');
		}
		else {
			$('#header').css('color', 'red');
		}
	}
};

$(document).ready(function init() {
	MYAPP.init.initGeo();
	MYAPP.init.initStorage();
	MYAPP.init.initView();
	MYAPP.init.isOnline();
});

// Submit Button handler
$(document).ready(function() {
	$("#entry_button").bind("click", function handleSubmitButton(event) {

		var anEntry = {
			headline: "",
			body: "",
			time: 0,
			address: ""
		};
		
		anEntry.headline = $("#entry_list input[name=entry_headline]").val();
		anEntry.body = $("#entry_list textarea[name=entry_body]").val();
		anEntry.time = Date.parse(new Date());
		anEntry.address = stash.get('address');

		MYAPP.init.writeEntry(anEntry);
		stash.set(anEntry.time.toString(), JSON.stringify(anEntry));
		stash.add('Identifiers', ' ' + anEntry.time.toString());
	});
});

// Delete handler
$(document).ready(function deleteEntry() {
	$(".deleter").live("click", function deleteEntry(event){

		//Read date string (Identifier) and remove entry
		var ds = Date.parse($(this).prev().prev().text());
		stash.cut(ds.toString());
		
		// Remove date string from list of used Identifiers
		var identString = stash.get('Identifiers');
		var newIdentString = jQuery.trim(identString.replace(ds.toString(), ""));
		stash.set('Identifiers', newIdentString);

		// clear element from the UI
		$(this).parent().remove();
	});
});

// UI hide/show handler
$(document).ready(function () {
	$("h2").click(function() {
		if(!$(this).next().hasClass("change")) {
			$(this).next().toggle('slow');
			$(this).next().addClass("change");
			$(this).parent().css("background", '#a9a9a9');
		}
		else {
			$(this).parent().css("background", '#d3d3d3');
			$(this).next().removeClass();
			$(this).next().toggle('slow');
		}
	});
	
	$("h1").click(function() {
		if(!$("h2").next().hasClass("change")) {
			$("h2").next().toggle('slow');
			$("h2").next().addClass("change");
			$("h2").parent().css("background", '#a9a9a9');
		}
		else {
			$("h2").parent().css("background", '#d3d3d3');
			$("h2").next().removeClass();
			$("h2").next().toggle('slow');
		}
	});
});