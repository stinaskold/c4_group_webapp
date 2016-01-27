


//Register new user

var ref = new Firebase("https://fro15-c4-webapp.firebaseio.com");
$(".confirm-registration-btn").on("click", function() {
  event.preventDefault();
  var email = $("#email-registration-input").val();
  var password = $("#password-registration-input").val();
  ref.createUser({
    email    : email,
    password : password
  }, function(error, userData) {
    if (error) {
      console.log("Error creating user:", error);
    } else {
      console.log("Successfully created user account with uid:", userData.uid);
      window.location.replace("loggedin.html");
    }
  });
});


//Login user

var ref = new Firebase("https://fro15-c4-webapp.firebaseio.com");
$(".sign-in-btn").on("click", function() {
  event.preventDefault();
  var email = $("#email-input").val();
  var password = $("#password-input").val();
  ref.authWithPassword({
    email    : email,
    password : password
  }, function(error, authData) {
    if (error) {
      console.log("Login failed!", error);
    } else {
      console.log("Authenticated successfully with payload:", authData);
      window.location.replace("loggedin.html");
    }
  });
});



/*
//log out user
ref.unauth();
*/
