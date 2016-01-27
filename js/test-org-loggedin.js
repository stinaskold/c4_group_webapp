var ref = new Firebase("https://c4users.firebaseio.com");
var authData = ref.getAuth();

var usersRef = new Firebase("https://c4users.firebaseio.com/users");
var currentUser = usersRef.child(authData.uid);
currentUserURL = currentUser.toString();

console.log(currentUserURL);

var userUrlRef = new Firebase(currentUserURL);

$("#send-testmessage").click(function() {
  var testHeadline,testMessage;

  testHeadline = document.querySelector(".test-headline").value;
  testMessage = document.querySelector(".test-message").value;

  addTestMessageToDatabase(testHeadline, testMessage);
});



function addTestMessageToDatabase(testHeadline, testMessage){
    //console.log(testHeadline, testMessage);
    userUrlRef.child('testmessages').push({testHeadline: testHeadline, testMessage: testMessage});
    window.location.reload();
}
