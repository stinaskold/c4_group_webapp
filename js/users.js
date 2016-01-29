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
      console.log("Error creating user:", error);
    } else {
      console.log("Successfully created user account with uid:", userData.uid);
      window.location.assign("org-loggedin.html");
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
    } else {
      console.log("Authenticated successfully with payload:", authData);
      window.location.replace("org-loggedin.html");
    }
  });
});
