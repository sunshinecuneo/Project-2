$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  console.log("in members js");
  
  $.get("/api/user_data").then(function(data) {
    console.log("data", data);
    
    $(".member-name").text(data.firstName);
  });
});
