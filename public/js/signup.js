$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var firstName = $("input#firstName");
  var lastName = $("input#lastName");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      firstName: firstName.val().trim(),
      lastName: lastName.val().trim()
    };

    if (!userData.email || !userData.password || !userData.firstName || !userData.lastName) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password, userData.firstName, userData.lastName );
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If succesful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password, firstName, lastName) {
    $.post("/api/signup", {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName
    }).then(function(data) {
      console.log(data)
      if(data.errors){
        $('#errorModal').modal('toggle')
        $('.modal-body p').text(data.errors[0].message)
      }
      else{
        window.location.replace(data);
      }
    }).catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
