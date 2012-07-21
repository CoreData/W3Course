$(document).ready(function deleteEntry() {
	$(".deleter").live("click", function deleteEntry(event){

		////
		// 	DEBUG
		////
		alert("Deleter called!");

		$(this).parent().remove();
	});
});