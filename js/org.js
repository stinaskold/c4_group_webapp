var myFireBaseRef = new Firebase("https://fro15c4webappgroup.firebaseio.com/");

$("#show-messages").click(function() {
  $("#org-form-div").empty();
  var html = '<div class="col-xs-12 col-sm-12 col-md-6 col-md-offset-3">' +
             '<ul class="org-messages">' +
              '<li class="panel"><h2>Message headline</h2><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><div class="edit-delete"><button class="edit btn btn-default btn-sm ">Edit</button><button class="delete btn btn-default btn-sm">Delete</button></div></li>' +
              '<li class="panel"><h2>Message headline</h2><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><div class="edit-delete"><button class="edit btn btn-default btn-sm">Edit</button><button class="delete btn btn-default btn-sm">Delete</button></div></li>' +
              '<li class="panel"><h2>Message headline</h2><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><div class="edit-delete"><button class="edit btn btn-default btn-sm">Edit</button><button class="delete btn btn-default btn-sm">Delete</button></div></li>' +
             '</ul>' +
      '</div>';
  $("#org-message-div").html(html);
});

$("#create-message").click(function() {
  $("#org-message-div").empty();
  var html = '<div class="col-xs-12 col-sm-12 col-md-6 col-md-offset-3">' +
               '<ul>' +
                 '<li><label for="" style="color: white;">Organisation</label><br>' +
                 '<input type="text" class="organisation"></li>' +
                 '<li><label for="" style="color: white;">Email</label><br>' +
                 '<input type="text" class="email"></li>' +
                 '<li><label for="" style="color: white;">Field</label><br>' +
                 '<input type="text" class="field"></li>' +
                 '<li><label for="" style="color: white;">Country</label><br>' +
                 '<input type="text" class="country"></li>' +
                 '<li><label for="" style="color: white;">Header</label><br>' +
                 '<input type="text" class="header"></li>' +
                 '<li class="textarea-message"><label for="" style="color: white;">Message</label><br>' +
                 '<textarea class="message" rows="5"></textarea></li>' +
                 '<li><button class="btn btn-lg btn-default" id="send-message">Send message</button></li>' +
               '</ul>' +
             '<div class="messages"></div>' +
             '</div>';
  $("#org-form-div").html(html);

  document.querySelector("#send-message").addEventListener("click",function(){
      var organisation, email, field, country, header, message;
      organisation = document.querySelector(".organisation").value;
      email = document.querySelector(".email").value;
      field = document.querySelector(".field").value;
      country = document.querySelector(".country").value;
      header = document.querySelector(".header").value;
      message = document.querySelector(".message").value;

      addMissionToDatabase(organisation, email, field, country, header, message);

      $("#org-form-div").html("<h3 class='message-sent col-xs-12 col-sm-12 col-md-6 col-md-offset-3'>Your message was sent.</h3>");
  });
});

function addMissionToDatabase(organisation, email, field, country, header, message){
    myFireBaseRef.child('missioninfo').push({organisation: organisation, email: email, field: field, country: country, header: header, message: message});
    window.location.reload();
}
