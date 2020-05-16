
$( document ).ready(function() {


var topics = ["Nintendo", "Sony", "Xbox"];

function drawButtons(){ 

    $("#buttons").empty();

    for (var i = 0; i < topics.length; i++){

        var $button = $("<button>") 
        $button.attr("class", "btn btn-primary m-3");
        $button.attr("id", "clickButton")  
        $button.attr("data-name", topics[i]); 
        $button.text(topics[i]); 
        $("#buttons").append($button); 
    }
    }




function drawImages() {
    
    $("#gifHolder").empty();
    var $userInput = $("#userInput").val().trim();
    var limit = 10;
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + $userInput + "&limit=" + limit + "&api_key=d0lrXwwVl7CbDKBVCj3IDQy2xrEkjOgU";

    $.ajax({
            url: queryURL, 
            method: "GET"
        }).done(function(response) {

            for(let i = 0; i < limit; i++) {    

                var $imgDiv = $("<div>");
                $imgDiv.addClass("imgHolder");
            
                var $img = $("<img>");
                $img.attr("src", response.data[i].images.fixed_height_still.url);
                $img.attr("still", response.data[i].images.fixed_height_still.url);
                $img.attr("animate", response.data[i].images.fixed_height.url);
                $img.attr("state", "still");
                $img.attr("class", "gif justify-content-center");
                $imgDiv.append($img);

                var rating = response.data[i].rating;
                var $rating = $("<p>").text("Rating: " + rating);
                $imgDiv.append($rating)

                $("#gifHolder").append($imgDiv);
                console.log($imgDiv);
            }
        });
    }

function swapState() {          

    var state = $(this).attr("state");
    var animate = $(this).attr("animate");
    var still = $(this).attr("still");

    if(state == "still") {
        $(this).attr("src", animate);
        $(this).attr("state", "animate");
    }

    else if(state == "animate") {
        $(this).attr("src", still);
        $(this).attr("state", "still");
    }   
    }

$("#inputSubmit").on("click",function(){

    var $userInput = $("#userInput").val().trim();
    event.preventDefault();
    console.log($userInput);
    topics.push($userInput);
    drawButtons();
    drawImages();
});

drawButtons();
$("#gifHolder").on("click", ".gif", swapState);
});