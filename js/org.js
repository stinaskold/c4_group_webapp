var myFireBaseRef = new Firebase("https://fro15c4webappgroup.firebaseio.com/");


// Get user
var userRef = new Firebase("https://c4users.firebaseio.com");
var authData = ref.getAuth();
var user = authData.uid;

// Log out user
$("#log-out").click(function() {
  userRef.unauth();
  window.location.replace("org-start.html");
});


// Hide message-div
$("#org-message-div").hide();
$("#message-sent").hide();

// Show messages
$("#show-messages").click(function() {
  $("#org-form-div").hide();
  $("#message-sent").hide();
  $("#org-message-div").show();

  // Collection of all existing missions
  var messageCollection;
  messageCollection = [];

  // Get info of all missions available from Firebase
  var missionsRef = new Firebase("https://fro15c4webappgroup.firebaseio.com/missioninfo");

  missionsRef.once("value", function(allMissionsSnapshot) {

      allMissionsSnapshot.forEach(function(missionSnapshot) {
      var key = missionSnapshot.key();
      var o = missionSnapshot.child("organisation").val();
      var e = missionSnapshot.child("email").val();
      var f = missionSnapshot.child("field").val();
      var c = missionSnapshot.child("country").val();
      var h = missionSnapshot.child("header").val();
      var m = missionSnapshot.child("message").val();
      var u = missionSnapshot.child("user").val();
      messageCollection.push(addObject(key,o,e,f,c,h,m,u));
    });
    messageCollection = messageCollection.reverse();
    filterUserMessages();
  });

  // Function to add existing field and country names to list array in toggles
  function filterUserMessages() {

    var users = [];

    for (var i = 0; i < messageCollection.length; i++) {
      users[i] = messageCollection[i].u;
    }

    messageCollection = messageCollection.filter(function(filteredMessages){
       return filteredMessages.u == user;
    });
    addMessages();
  }

  // Function to create append all available missions added by the organisation
  // The innerHTML of header and message text for each mission is copied from
  // the input fields the organisation will fill in and send
  function addMessages() {

    var missionsListDiv = document.getElementById('org-message-div');
    missionsListDiv.innerHTML = "";

    // Loop through all existing mission from the collection of missions
    for (i = 0; i < messageCollection.length; i++) {

      header = messageCollection[i].h;
      message = messageCollection[i].m;

      var missionPanel = document.createElement("div");
          missionPanel.className = "mission-panel panel panel-default";
      var panelBody = document.createElement("div");
          panelBody.className = "panel-body";
      var missionHeader = document.createElement("h2");
          missionHeader.className = "mission-header";
      var missionText = document.createElement("p");
          missionText.className = "mission-text";
      var missionButtonsDiv = document.createElement("div");
          missionButtonsDiv.className = "mission-buttons navbar-right";
      var editBtn = document.createElement("button");
          editBtn.className = "edit btn btn-default btn-sm";
      var deleteBtn = document.createElement("button");
          deleteBtn.className = "delete btn btn-default btn-sm";
          editBtn.id = i;
          deleteBtn.id = i;

      missionsListDiv.appendChild(missionPanel);
      missionPanel.appendChild(panelBody);
      panelBody.appendChild(missionHeader);
      missionHeader.innerHTML = header;
      panelBody.appendChild(missionText);
      missionText.innerHTML = message;
      panelBody.appendChild(missionButtonsDiv);
      missionButtonsDiv.appendChild(editBtn);
      editBtn.innerHTML = "Edit";
      missionButtonsDiv.appendChild(deleteBtn);
      deleteBtn.innerHTML = "Delete";
    }

    // Add event listerner for button Delete
    $(".delete").on('click',function (e) {
      //e.stopImmediatePropagation();
      var missionClickedID = this.id;

      var missionDelete = document.getElementsByClassName('mission-panel')[missionClickedID];
      document.getElementById('org-message-div').removeChild(missionDelete);

      key = messageCollection[missionClickedID].key;
      var missionsRef = new Firebase("https://fro15c4webappgroup.firebaseio.com/missioninfo");
      missionsRef.child(key).remove();
    });

    // Add event listerner for button Edit
    $(".edit").on('click',function (e) {
      //e.stopImmediatePropagation();
      var missionClickedID = this.id;

      $(this).text("Save");
      $(this).attr("id","save-btn");

      text = this.parentNode.previousSibling;
      head = text.previousSibling;
      text.contentEditable = "true";
      text.focus();
      head.contentEditable = "true";

      $("#save-btn").on('click',function (e) {

          $(this).text("Edit");
          $(this).attr("id","");
          text = this.parentNode.previousSibling;
          head = text.previousSibling;

          var missionsRef = new Firebase("https://fro15c4webappgroup.firebaseio.com/missioninfo");
          key = messageCollection[missionClickedID].key;
          header = head.innerHTML;
          message = text.innerHTML;
          missionsRef.child(key).update({header: header, message: message});

          text.contentEditable = "false";
          head.contentEditable = "false";

        });
    });
  }
  // $("#org-form-div").css("display", "none");
  // $("#org-message-div").css("display", "block");
  // $("#org-form-div").empty();
  // var html = '<div class="col-xs-12 col-sm-12 col-md-6 col-md-offset-3">' +
  //            '<ul class="org-messages">' +
  //             '<li class="panel"><h2>Message headline</h2><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><div class="edit-delete"><button class="edit btn btn-default btn-sm ">Edit</button><button class="delete btn btn-default btn-sm">Delete</button></div></li>' +
  //             '<li class="panel"><h2>Message headline</h2><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><div class="edit-delete"><button class="edit btn btn-default btn-sm">Edit</button><button class="delete btn btn-default btn-sm">Delete</button></div></li>' +
  //             '<li class="panel"><h2>Message headline</h2><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><div class="edit-delete"><button class="edit btn btn-default btn-sm">Edit</button><button class="delete btn btn-default btn-sm">Delete</button></div></li>' +
  //            '</ul>' +
  //     '</div>';
  // $("#org-message-div").html(html);
});

// Show message form
$("#create-message").click(function() {
  $("#org-message-div").hide();
  $("#message-sent").hide();
  $("#org-form-div").show();
  // $("#org-message-div").css("display", "none");
  // $("org-form-div").css("display", "block");
  // $("#org-message-div").empty();
  // var html = '<div class="col-xs-12 col-sm-12 col-md-6 col-md-offset-3">' +
  //              '<ul>' +
  //                '<li><label for="" style="color: white;">Organisation</label><br>' +
  //                '<input type="text" class="organisation"></li>' +
  //                '<li><label for="" style="color: white;">Email</label><br>' +
  //                '<input type="text" class="email"></li>' +
  //                '<li><label for="" style="color: white;">Field</label><br>' +
  //                '<input type="text" class="field"></li>' +
  //                '<li><label for="" style="color: white;">Country</label><br>' +
  //                '<input type="text" class="country"></li>' +
  //                '<li><label for="" style="color: white;">Header</label><br>' +
  //                '<input type="text" class="header"></li>' +
  //                '<li class="textarea-message"><label for="" style="color: white;">Message</label><br>' +
  //                '<textarea class="message" rows="5"></textarea></li>' +
  //                '<li><button class="btn btn-lg btn-default" id="send-message">Send message</button></li>' +
  //              '</ul>' +
  //            '<div class="messages"></div>' +
  //            '</div>';
  // $("#org-form-div").html(html);
});

// When clicking "send-message"-button get values from input fields and call function
document.querySelector("#send-message").addEventListener("click",function(){

    var organisation, email, field, country, header, message;
    organisation = document.querySelector(".organisation").value;
    email = document.querySelector(".email").value;
    field = document.querySelector(".field").value;
    country = document.querySelector(".country").value;
    header = document.querySelector(".header").value;
    message = document.querySelector(".message").value;

    addMissionToDatabase(organisation, email, field, country, header, message, user);

});

// Add message and userID to mission database
function addMissionToDatabase(organisation, email, field, country, header, message, user){
    myFireBaseRef.child('missioninfo').push({organisation: organisation, email: email, field: field, country: country, header: header, message: message, user: user});
    //window.location.reload();

    $("#org-form-div input").val('');
    $("#org-form-div textarea").val('');
    $("#org-form-div").hide();
    $("#message-sent").show();
}

// Function to create object array with missions info
var addObject = function(key, organisation, email, field, country, header, message, user) {
  var newObj = new Object();

  newObj.key = key;
  newObj.o = organisation;
  newObj.e = email;
  newObj.f = field;
  newObj.c = country;
  newObj.h = header;
  newObj.m = message;
  newObj.u = user;

  return newObj;
};
