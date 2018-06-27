$(document).ready(function(){
  // Initial array of animes
  var animes = ["federer", "nadal", "murray", "djokovic",];

  // displayAnimeShow function re-renders the HTML to display the appropriate content
  function displayAnimeShow() {

    var anime = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + anime + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Creates AJAX call for the specific movie button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response){
      $("#animeview").empty();

      var results = response.data;

      // Retrieves the Rating Data
      console.log(response);

      // Loops the anime for limit 10
      for(var i = 0; i < results.length; i++) {

        // Creates a div to hold the anime
        var animeDiv = $("<div>");

        // Make the class for style.css
        animeDiv.addClass("animepictures");

        // Creates an element to have the rating displayed
        var rating = results[i].rating;
        var p = $("<h2>").text("Rating: " + rating);

        // The Images can still or animate to call the class "animeImage" for click.
        var animeImage = $("<img>");
        animeImage.attr("src", results[i].images.fixed_height_still.url);
        animeImage.attr("data-still", results[i].images.fixed_height_still.url);
        animeImage.attr("data-animate", results[i].images.fixed_height.url);
        animeImage.attr("data-state", "still");
        animeImage.addClass('animeImage');

        // Displays the rating
        animeDiv.prepend(p);

        // Displays the anime Image
        animeDiv.prepend(animeImage);
        $("#animeview").prepend(animeDiv);
      }

      //if the variable state is equal to 'still',
      // then update the src attribute of this image to it's data-animate value,
      // and update the data-state attribute to 'animate'.
      // If state does not equal 'still', then update the src attribute of this
      // image to it's data-animate value and update the data-state attribute to 'still'
      $(".animeImage").on("click", function() {
        var state = $(this).attr("data-state");
        console.log(state);

        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
    });        
  }

  // Function for displaying anime data
  function renderButtons() {

    // Deletes the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#animebuttons").empty();

    for(var i = 0; i < animes.length; i++) {

      // Then dynamicaly generates buttons for each movie in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var animeAdd = $("<button>");

      // Adds a class of anime to our button
      animeAdd.addClass("anime");

      // Added a data-attribute
      animeAdd.attr("data-name", animes[i]);

      // Provided the initial button text
      animeAdd.text(animes[i]);

      // Added the button to the buttons-view div
      $("#animebuttons").append(animeAdd);
    }
  }

  // This function handles events where the add anime button is clicked
  $("#add-anime").on("click", function(event){
    event.preventDefault();

    // This line of code will grab the input from the textbox
    var anime = $("#anime-input").val().trim();

    // The anime from the textbox is then added to our array
    animes.push(anime);

    // Calling renderButtons which handles the processing of our anime array
    renderButtons();
  });

  // Adding click event listeners to all elements with a class of "anime"
  $(document).on("click", ".anime", displayAnimeShow);

  // Calling the renderButtons function to display the intial buttons
  renderButtons();
});