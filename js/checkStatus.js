var ref = new Firebase("https://c4users.firebaseio.com");
var authData = ref.getAuth();

if (authData) {
  console.log("inloggad");
}
else {
  console.log("inte inloggad");
  window.location.replace("org-start.html");
}
