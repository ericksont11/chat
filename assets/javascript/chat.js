$( document ).ready(function() {

var config = {
apiKey: "AIzaSyCNF05USCRKHU3ol5O8rI4v0E1zasEeuSc",
authDomain: "comment-f18f9.firebaseapp.com",
databaseURL: "https://comment-f18f9.firebaseio.com",
projectId: "comment-f18f9",
storageBucket: "comment-f18f9.appspot.com",
messagingSenderId: "948852790554"
};
firebase.initializeApp(config);

var database = firebase.database();
var username=""
var text=""
var show = false
var hold;

database.ref().on("value", function(snapshot) {
    
    show = snapshot.val().display;
    text = snapshot.val().chat;
    username = snapshot.val().player;
    if (show === true){
    var div = $("<div id='box'>").text(username + ":    " +text).css("margin-bottom", ".5vh").css("margin-right", "0.5vh");
    if (hold === username){
        div.css("background-color", "rgb(104, 103, 107)")
    }
    else {
        div.css("background-color", "rgb(70, 54, 175)")
    }
    div.appendTo("#chatbox")
    show = false;
    updateScroll()
    database.ref().set({
        chat: text,
        player : username,
        display : show
    });
    }

}, function(errorObject) {
console.log("Error: " + errorObject.code);
});


$('#comment').keypress(function(event) {
    if (event.keyCode == 13 || event.which == 13) {
    $("#chatbox").show()
    text = $("#comment").val()
    username = $("#user").val().toUpperCase().trim()
    hold = username;
    show = true; 
    database.ref().set({
        chat: text,
        player : username,
        display : show
    });
    $("#comment").val("")
    }
});


$('#user').keypress(function(event) {
    if (event.keyCode == 13 || event.which == 13) {
    show = false;
    username = $("#user").val().toUpperCase().trim()
    $("#user").hide()
    $("#comment").show()
    $("#title").html("You're chatting as " + username)
    database.ref().set({
        player: username,
        display : show,
        chat: text
    });

}


});


function updateScroll(){
    var element = document.getElementById("chatbox");
    element.scrollTop = element.scrollHeight;
}

});