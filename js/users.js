// Reference to user database
var ref = new Firebase("https://c4users.firebaseio.com");


// Register new user, go to logged-in-page
$("#register-button").on("click", function() {
  event.preventDefault();
  var email = $("#register-email").val();
  var password = $("#register-password").val();
  ref.createUser({
    email    : email,
    password : password
  }, function(error, userData) {
    if (error) {
      $("#error-register").text(error);
    } else {
      window.location.replace("org-loggedin.html");
    }
  });
});

// Check if user is registered, log in and go to logged-in-page
$("#login-button").on("click", function() {
  event.preventDefault();
  var email = $("#login-email").val();
  var password = $("#login-password").val();
  ref.authWithPassword({
    email    : email,
    password : password
  }, function(error, authData) {
    if (error) {
      console.log("Login Failed!", error);
      $("#error-login").text(error);
    } else {
      window.location.replace("org-loggedin.html");
    }
  });
});

// Remove error message on input (register)
$("#div-register").on("input", function() {
    $("#error-register").empty();
});

// Remove error message on input (login)
$("#div-login").on("input", function() {
    $("#error-login").empty();
});
