
(function (exports, $) {
    function showEntries () {
        var data = localStorage.getItem("data");
        if (!data) {
            data = [
                "<h3>Welcome to My Diary!!!!</h3>"              +
                "<div class='date'>Tue Mar 17 01:05 1977</div>" +
                "<p>There are currently no entries in this diary, but go ahead and add one — it will be AWESOME!!!</p>"
            ];
        }
        else {
            data = JSON.parse(data);
        }
        var $posts = $("#posts");
        $posts.empty();
        $.each(data, function (i, post) {
            $posts.append($("<div class='post'></div>").append($(post)));
        });
    }

    function addEntry (subject, body) {
        var data = localStorage.getItem("data");
        if (data) data = JSON.parse(data);
        else data = [];
        body = body.replace(/\n/g, "<br/>");
        var $cont = $("<div></div>");
        $("<h3></h3>").text(subject).appendTo($cont);
        $("<div class='date'></div>").text((new Date).toLocaleString()).appendTo($cont);
        $("<p></p>").html(body).appendTo($cont);
        data.unshift($cont.html());
        localStorage.setItem("data", JSON.stringify(data));
    }

    exports.addTxt = function () {
        $("#add-text").show().find("input").focus();
    };
    exports.okEdit = function () {
        var subject = $("#add-text input").val();
        if (!subject) {
            alert("Subject is required");
            return;
        }
        var body = $("#add-text textarea").val();
        if (!body) {
            alert("Body is required");
            return;
        }
        addEntry(subject, body);
        exports.cancelEdit();
        showEntries();
    };
    exports.cancelEdit = function () {
        $("#add-text input").val("");
        $("#add-text textarea").val("");
        $("#add-text").hide();
    };
    
    $(showEntries);
})(window, jQuery);
