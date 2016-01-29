
/////////////////
///Stinas kod

// Get user
//var userRef = new Firebase("https://fro15-c4-webapp.firebaseio.com");
//var authData = userRef.getAuth();
//var user = authData.uid;

//var usernameRef = new Firebase('https://fro15-c4-webapp.firebaseio.com/users/username');
//var username = usersRef.child("username").toString();
//var test = usernameRef.child("username").toString();
  //   console.log(test);
  // usernameRef.on("value", function(snapshot) {
  // console.log(snapshot.val());


// });
    //console.log(username);

//////////////////

      var myDataRef = new Firebase('https://fro15-c4-webapp.firebaseio.com/');
      $('#messageInput').keypress(function (e) {
        if (e.keyCode == 13) {
          var name = $('#nameInput').val();
          var text = $('#messageInput').val();
          myDataRef.push({name: name, text: text});
          $('#messageInput').val('');
        }
      });
      myDataRef.on('child_added', function(snapshot) {
        var message = snapshot.val();
        displayChatMessage(message.name, message.text);
      });
      function displayChatMessage(name, text) {
        $('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
        $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
      };
