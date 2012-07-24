function getFormattedAddress(lat, lng) {
	var latlng = new google.maps.LatLng(lat, lng);
	geocoder.geocode({'latLng': latlng}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			if (results[1]) {
	        	locationAddress = results[0].formatted_address.toString();
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
}

function initGeo() {
	//load an inital value 
	stash.set('address', "Halle, Germany");
	geocoder = new google.maps.Geocoder();
	
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition( success, error);
	}
	
	function error(err) {
		console.log("Error: " + err.message);
	}
	
	function success(position) {
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;
		getFormattedAddress(latitude, longitude);
	}
}
	
function initStorage() {
	if(!stash.get('Identifiers')) {
		initDate = Date.parse(new Date());
		firstEntry = '{"headline":"Wrote my first mobile application", "body":"Today I wrote my first mobile application. It was great! I had huge amounts of fun, it was a lot easier than I expected, and I was so happy I spent the rest of the day celebrating.","time":' + initDate + ',"address":"' + stash.get('address') + '"}';
		stash.set(initDate.toString(), firstEntry);
		stash.set('Identifiers', initDate.toString() + " ");
		
		secondDate = initDate + 1000;
		secondEntry = '{"headline":"Wrote another mobile application", "body":"I am on such a roll with these mobile Web applications that I went crazy and wrote a second one. I am so happy I cannot stop singing at the top of my lungs. My cat seems worried that I\'ve finally lost it completely, but I don\'t care — it\'s mobile Web all the way from now on!","time":' + secondDate + ',"address":"' + stash.get('address') + '"}';
		stash.set(secondDate.toString(), secondEntry);
		stash.add('Identifiers', secondDate.toString() + " ");
		
		thirdDate = initDate + 2000;
		thirdEntry = '{"headline":"Must stop writing mobile application", "body":"My fingers are sore from writing so many great mobile Web applications. I know that I should stop and take a break, but there are so many great things to do with this technology that I really don\'t know how to stop!","time":' + thirdDate + ',"address":"' + stash.get('address') + '"}';
		stash.set(thirdDate.toString(), thirdEntry);
		stash.add('Identifiers', thirdDate.toString());
	}
}

function initView() {
	var identifiers = stash.get('Identifiers').toString().split(" ");

	identifiers.map(function(item) {
		if(item.substring(0,1) == "1") {
			var loadedEntry = eval('(' + stash.get(item) + ')');
			writeThis(loadedEntry);
		}
	});
}

function writeEntry(thisEntry) {
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
}

$(document).ready(function init() {
	initGeo();
	initStorage();
	initView();
});


"use strict";

$(document).ready(function() {
	$("#entry_button").bind("click", function handleSubmitButton(event) {
		
		// This belongs to the model
		var myEntry = {
			headline: "",
			body: "",
			time: 0,
			address: ""
		};
		
		myEntry.headline = $("#entry_list input[name=entry_headline]").val();
		myEntry.body = $("#entry_list textarea[name=entry_body]").val();
		myEntry.time = Date.parse(new Date());
		myEntry.address = stash.get('address');

		writeEntry(myEntry);
		stash.set(myEntry.time.toString(), JSON.stringify(myEntry));
		stash.add('Identifiers', ' ' + myEntry.time.toString());
		console.log(stash.get('Identifiers'));
	});
});

