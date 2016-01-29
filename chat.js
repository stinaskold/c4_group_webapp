
      //Storing user ID

      var ref = new Firebase("https://fro15-c4-webapp.firebaseio.com/");
      var authData = ref.getAuth();

      var usersRef = new Firebase("https://fro15-c4-webapp.firebaseio.com/users/");
      var currentUser = usersRef.child(authData.uid);
      currentUserURL = currentUser.toString();

      console.log(currentUserURL);

      var userUrlRef = new Firebase(currentUserURL);




      //Chat function fetched from Firebase documentation

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
