var topics = ["cats", "dogs", "elephants", "lions", "leopards", "octopus","goldFish","skunk"];
$(document).ready(function() {
//this submit button 
makeButtons();
$("#submit").on("click", function(event){
  //default of form makes the form refresh. By writing event.preventDefault, we prevent the form from doing it's 'default' of refreshing.
  event.preventDefault();
  //.val gets value of input element; .trim trims white space in input tag
  var userSearch = $("#searchbar").val().trim();
  topics.push(userSearch);
  makeButtons();
  
});
 function makeButtons() {
  $("#buttonSpace").empty();
  for (var i = 0; i <topics.length; i++){
    var btn = $("<button class='btn'>").text(topics[i]);
  //setting value of the attriute 'data-animal' = userSearch
  btn.attr("data-animal", topics[i]);
    $("#buttonSpace").append(btn);
  }

  

 }
//this function on click displays 10 gifs according to value of the button
 function displayGifs() {
  
    //we need to empty the 'gifs appear here' div first because in this onclick function we want to empty the div first because javascript runs top down.
    $("#gifs-appear-here").empty();
    var animal = $(this).attr("data-animal");
    
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
      animal + "&api_key=dc6zaTOxFJmzC&limit=10";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      var results = response.data;
      

      //loop through results
      for (var i = 0; i < results.length; i++) {
        //create div to store animal gifs
      var animalDiv  = $("<div>");
      var p = $("<p>");
      // p.html("rating: " + results[i].rating);
      //dynamically create images
      var animalImage = $("<img>");
      animalImage.addClass("gif-image");
      animalImage.attr("src", results[i].images.fixed_height_still.url);
      animalImage.attr("data-state", "still");
      animalImage.attr("data-still", results[i].images.fixed_height_still.url);
      animalImage.attr("data-animate", results[i].images.fixed_height.url);
      //create class inline-block to style animalDiv
      animalDiv.addClass("inline-block");
      animalDiv.append(p);
      animalDiv.append(animalImage);
      $("#gifs-appear-here").prepend(animalDiv);
      }
    });  
   }
 $("#gifs-appear-here").on("click", ".gif-image", function() {
     if ($(this).attr("data-state") === "still"){
        $(this).attr("src",$(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      }else{
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      
      } 
    });
//document.ready only executes everything within that function on page load according to what is already in the html. anytime that we render something to the page that is new, jquery needs to be told what to do with new html. The .btn was something new.
  $(document).on("click", ".btn", displayGifs);
});