// Collection of all existing missions
var missionCollection;
missionCollection = [];

// Get info of all missions available from Firebase
var myFireBaseMissionInfo = new Firebase("https://fro15c4webappgroup.firebaseio.com/missioninfo");

myFireBaseMissionInfo.once("value", function(allMissionsSnapshot) {

    allMissionsSnapshot.forEach(function(missionSnapshot) {
    var key = missionSnapshot.key();
    var o = missionSnapshot.child("organisation").val();
    var e = missionSnapshot.child("email").val();
    var f = missionSnapshot.child("field").val();
    var c = missionSnapshot.child("country").val();
    var h = missionSnapshot.child("header").val();
    var m = missionSnapshot.child("message").val();
    missionCollection.push(addObject(o,e,f,c,h,m));
  });
  missionCollection = missionCollection.reverse();
  addFieldAndCountryList();
});

// Function to add existing field and country names to list array in toggles
function addFieldAndCountryList() {

  var fields = [];
  var countries = [];

  for (var i = 0; i < missionCollection.length; i++) {
    fields[i] = missionCollection[i].f;
    countries[i] = missionCollection[i].c;
  }

  fieldItems = removeDuplicates(fields);
  countryItems = removeDuplicates(countries);


  fieldItems.sort(function(x,y){
    var a = String(x).toUpperCase();
    var b = String(y).toUpperCase();
    if (a > b)
      return 1
    if (a < b)
      return -1
    return 0;
  });

  countryItems.sort(function(x,y){
    var a = String(x).toUpperCase();
    var b = String(y).toUpperCase();
    if (a > b)
       return 1
    if (a < b)
       return -1
    return 0;
 });

  // Function to remove duplicates from field and country arrays
  // Borrowed from the stackoverflow forum
  function removeDuplicates(arr) {
    var exist = {};
    var output = [];
    var k = 0;
    for(var i = 0; i < arr.length; i++) {
       var item = arr[i];
       if(exist[item] !== 1) {exist[item] = 1; output[k++] = item;}
    }
    return output;
  }


  for (i = 0; i < fieldItems.length; i++) {

    // Create all elements for a new mission panel
    var fieldList = document.getElementById('field-dropdown-menu');

    var fieldListItem = document.createElement("li");
    var fieldListItemLink = document.createElement("a");
        fieldListItem.className = "main-nav-list";
        fieldListItem.setAttribute("role", "presentation");
        fieldListItem.style.fontSize = "small";
        fieldListItemLink.setAttribute("href", "#");

    fieldList.appendChild(fieldListItem);
    fieldListItem.appendChild(fieldListItemLink);
    fieldListItemLink.innerHTML = fieldItems[i];
  }

  for (i = 0; i < countryItems.length; i++) {

    // Create all elements for a new mission panel
    var countryList = document.getElementById('country-dropdown-menu');

    var countryListItem = document.createElement("li");
    var countryListItemLink = document.createElement("a");
        countryListItem.className = "main-nav-list";
        countryListItem.setAttribute("role", "presentation");
        countryListItem.style.fontSize = "small";
        countryListItemLink.setAttribute("href", "#");

    countryList.appendChild(countryListItem);
    countryListItem.appendChild(countryListItemLink);
    countryListItemLink.innerHTML = countryItems[i];
  }

  addMissions();

  $("ul[id*=field-dropdown-menu] li a").on('click',function (e) {
    //e.stopImmediatePropagation();

    var fieldFilter = $(this).html();
    missionCollection = missionCollection.filter(function(filteredMission){
       return filteredMission.f == fieldFilter;
    });

    document.getElementById('missions-list').innerHTML = "";
    addMissions();
    //e.preventDefault();
  });

  $("ul[id*=country-dropdown-menu] li a").on('click',function (e) {
    //e.stopImmediatePropagation();

    var countryFilter = $(this).html();
    missionCollection = missionCollection.filter(function(filteredMission){
       return filteredMission.c == countryFilter;
    });

    document.getElementById('missions-list').innerHTML = "";
    addMissions();
    //e.preventDefault();
  });

  $("#see-all-missions-btn").on('click',function (e) {
    //e.stopImmediatePropagation();
    document.getElementById('missions-list').innerHTML = "";
    addMissions();
    //e.preventDefault();
  });
}


// Function to create append all available missions added by the organisations
// The innerHTML of header and message text for each mission is copied from
// the input fields the organisation will fill in and send
function addMissions() {

    // Loop through all existing mission from the collection of missions
    for (i = 0; i < missionCollection.length; i++) {

      field = missionCollection[i].f;
      country = missionCollection[i].c;
      organisation = missionCollection[i].o;
      header = missionCollection[i].h;
      message = missionCollection[i].m;

      var missionsListDiv = document.getElementById('missions-list');
      var missionPanel = document.createElement("div");
          missionPanel.className = "mission-panel panel panel-default";
      var panelBody = document.createElement("div");
          panelBody.className = "panel-body";
      var missionHeader = document.createElement("h2");
          missionHeader.className = "mission-header";
      var orgDetails = document.createElement("h4");
      var missionText = document.createElement("p");
          missionText.className = "mission-text";
      var missionButtonsDiv = document.createElement("div");
          missionButtonsDiv.className = "mission-buttons navbar-right";
      var readMoreBtn = document.createElement("button");
          readMoreBtn.className = "read-more-btn btn btn-default btn-sm";
      var applyBtn = document.createElement("button");
          applyBtn.className = "apply-btn btn btn-default btn-sm";
          applyBtn.id = i;

      missionsListDiv.appendChild(missionPanel);
      missionPanel.appendChild(panelBody);
      panelBody.appendChild(missionHeader);
      missionHeader.innerHTML = header;
      orgDetails.innerHTML = "Organisation: " + organisation + ";  Country: " + country + ";  Field: " + field;
      panelBody.appendChild(orgDetails);
      panelBody.appendChild(missionText);
      missionText.innerHTML = message;
      panelBody.appendChild(missionButtonsDiv);
      //missionButtonsDiv.appendChild(readMoreBtn);
      //readMoreBtn.innerHTML = "Read more";
      missionButtonsDiv.appendChild(applyBtn);
      applyBtn.innerHTML = "Apply";
    }

    // Add event listerner for button Apply
    $(".apply-btn").on('click',function (e) {
      //e.stopImmediatePropagation();
      var missionClickedID = this.id;
      console.log(missionClickedID);

      orgEmailOfMissionClicked = missionCollection[missionClickedID].e;
      console.log(orgEmailOfMissionClicked);

      $("#missions-list").empty();

      header = missionCollection[missionClickedID].h;
      message = missionCollection[missionClickedID].m;

      var missionsListDiv = document.getElementById('missions-list');
      var missionPanel = document.createElement("div");
          missionPanel.className = "mission-panel panel panel-default";
      var panelBody = document.createElement("div");
          panelBody.className = "panel-body";
      var missionHeader = document.createElement("h2");
          missionHeader.className = "mission-header";
      var orgDetails = document.createElement("h4");
      var missionText = document.createElement("p");
          missionText.className = "mission-text";

      missionsListDiv.appendChild(missionPanel);
      missionPanel.appendChild(panelBody);
      panelBody.appendChild(missionHeader);
      missionHeader.innerHTML = header;
      orgDetails.innerHTML = "Organisation: " + organisation + ";  Country: " + country + ";  Field: " + field;
      panelBody.appendChild(orgDetails);
      panelBody.appendChild(missionText);
      missionText.innerHTML = message;

      var html = '<div class="org-main col-xs-12 col-sm-12 col-md-8 col-md-offset-2" style="margin-top:10px;">' +
                   '<form method="post" id="applyFormID" class="applyFormClass">' +
                     '<label for="" style="color: white;">Your Name</label><br>' +
                     '<input type="text" class="name" name="name" id="name" placeholder="Name"><br>' +
                     '<label for="" style="color: white;">Your Email</label><br>' +
                     '<input type="text" class="email" name="email" id="email" placeholder="Email"><br>' +
                     '<label for="" style="color: white;">Subject</label><br>' +
                     '<input type="text" class="header"><br>' +
                     '<label for="" class="textarea-message" style="color: white;">Message</label><br>' +
                     '<textarea class="message" rows="5"></textarea><br>' +
                     '<button id="send-message-to-apply" class="btn btn-lg btn-default"><a href="#" target="_blank" class="submit" id="test">Send message</a></button>' +
                   '</form>' +
                 '<div class="messages"></div>' +
                '</div>';

      var messageFormDiv = document.createElement('div');
      messageFormDiv.innerHTML = html;
      missionsListDiv.appendChild(messageFormDiv);

      $("#send-message-to-apply").on('click',function (e) {
        e.preventDefault();

          /* var name, email, header, message;
          name = document.querySelector(".name").value;
          email = document.querySelector(".email").value;
          header = document.querySelector(".header").value;
          message = document.querySelector(".message").value; */

          $("#applyFormID").attr('action', 'mailto:' + orgEmailOfMissionClicked);

          $(".org-main").empty();
          $(".org-main").html("<h3 class='message-sent col-xs-12 col-sm-12 col-md-8 col-md-offset-2'>Your message was sent.</h3>");
      });

    });

    // Collection of all existing missions
    missionCollection = [];

    // Get info of all missions available from Firebase
    var myFireBaseMissionInfo = new Firebase("https://fro15c4webappgroup.firebaseio.com/missioninfo");

    myFireBaseMissionInfo.once("value", function(allMissionsSnapshot) {

        allMissionsSnapshot.forEach(function(missionSnapshot) {
          var key = missionSnapshot.key();
          var o = missionSnapshot.child("organisation").val();
          var e = missionSnapshot.child("email").val();
          var f = missionSnapshot.child("field").val();
          var c = missionSnapshot.child("country").val();
          var h = missionSnapshot.child("header").val();
          var m = missionSnapshot.child("message").val();
          missionCollection.push(addObject(o,e,f,c,h,m));
      });
      missionCollection = missionCollection.reverse();
    });
}


// Function to create object array with missions info
var addObject = function(organisation, email, field, country, header, message) {
  var newObj = new Object();

  newObj.o = organisation;
  newObj.e = email;
  newObj.f = field;
  newObj.c = country;
  newObj.h = header;
  newObj.m = message;

  return newObj;
};
