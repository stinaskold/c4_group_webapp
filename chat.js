

//Chat function fetched from Firebase documentation


      var myDataRef = new Firebase('https://fro15-c4-webapp.firebaseio.com/chat');
      $('#messageInput').keypress(function (e) {
        if (e.keyCode == 13) {
          var name = $('#nameInput').val();
          var text = $('#messageInput').val();

          myDataRef.push({ 'user_id': 'Sandra', 'text': 'Yabba Dabba Doo!' });
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






