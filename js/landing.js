// Get info of all missions available from Firebase
var myFireBaseMissionInfo = new Firebase("https://fro15c4webappgroup.firebaseio.com/missioninfo");

// Collection of all existing missions
var missionCollection;
missionCollection = [];

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
  //addFieldAndCountryList();
  addMissions();
});

// Function to create append all available missions added by the organisations
// The innerHTML of header and message text for each mission is copied from
// the input fields the organisation will fill in and send
function addMissions() {

    // Loop through all existing mission from the collection of missions
    for (i = 0; i < 3; i++) {

      field = missionCollection[i].f;
      country = missionCollection[i].c;
      organisation = missionCollection[i].o;
      header = missionCollection[i].h;
      message = missionCollection[i].m;

      var missionsListDiv = document.getElementById('landing-page-missions-list');
      var missionPanel = document.createElement("div");
          missionPanel.className = "mission-panel panel panel-default";
      var panelBody = document.createElement("div");
          panelBody.className = "panel-body";
      var missionHeader = document.createElement("h2");
          missionHeader.className = "mission-header";
      var orgDetails = document.createElement("h4");
      var missionText = document.createElement("p");
          missionText.className = "mission-text";

      /*
      var missionButtonsDiv = document.createElement("div");
          missionButtonsDiv.className = "mission-buttons navbar-right";
      var readMoreBtn = document.createElement("button");
          readMoreBtn.className = "read-more-btn btn btn-default btn-sm";
      var applyBtn = document.createElement("button");
          applyBtn.className = "apply-btn btn btn-default btn-sm";
          applyBtn.id = i;
      */
      
      missionsListDiv.appendChild(missionPanel);
      missionPanel.appendChild(panelBody);
      panelBody.appendChild(missionHeader);
      missionHeader.innerHTML = header;
      orgDetails.innerHTML = "Organisation: " + organisation + ";  Country: " + country + ";  Field: " + field;
      panelBody.appendChild(orgDetails);
      panelBody.appendChild(missionText);
      missionText.innerHTML = message;

      /*
      panelBody.appendChild(missionButtonsDiv);
      missionButtonsDiv.appendChild(readMoreBtn);
      readMoreBtn.innerHTML = "Read more";
      missionButtonsDiv.appendChild(applyBtn);
      applyBtn.innerHTML = "Apply";
      */
    }

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
