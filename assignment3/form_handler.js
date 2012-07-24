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