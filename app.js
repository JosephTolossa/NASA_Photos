$(document).ready(function () {
    const apiKey = "7UUQPbPMZafav9vXBxkANDBdg8xwA5fTvnjtvzKc";
    const baseUrl = "https://api.nasa.gov/planetary/apod";
  
    function fetchAPOD(date = "") {
      let url = `${baseUrl}?api_key=${apiKey}`;
      if (date) url += `&date=${date}`;
  
      $.ajax({
        url: url,
        method: "GET",
        success: function (response) {
          $("#error").text("");
          $("#title").text(response.title);
          $("#description").text(response.explanation);
  
          if (response.media_type === "image") {
            $("#media-container").html(`<img id="apod-img" src="${response.url}" alt="${response.title}">`);
          } else if (response.media_type === "video") {
            $("#media-container").html(`<iframe id="apod-video" width="560" height="315" src="${response.url}" frameborder="0" allowfullscreen></iframe>`);
          } else {
            $("#media-container").html(`<p>Unsupported media type: ${response.media_type}</p>`);
          }
        },
        error: function (xhr) {
          $("#error").text("Failed to fetch data. Please try again later.");
          $("#title, #description, #media-container").empty();
        }
      });
    }
  
    // Load today's picture on page load
    fetchAPOD();
  
    // Fetch by date when user clicks the button
    $("#fetch-btn").on("click", function () {
      const selectedDate = $("#date-input").val();
      if (selectedDate) {
        fetchAPOD(selectedDate);
      } else {
        fetchAPOD(); // fallback to today
      }
    });
  });
  