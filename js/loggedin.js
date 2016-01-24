// Add reference to Firebase database
var myFireBaseRef = new Firebase("https://fro15c4webappgroup.firebaseio.com/");

// Add a new mission to Firebase database as soon as organization sends a message
// after click on "send-message" button
document.querySelector("#send-message").addEventListener("click",function(){
    var field, country, header, message;
    field = document.querySelector(".field").value;
    country = document.querySelector(".country").value;
    header = document.querySelector(".header").value;
    message = document.querySelector(".message").value;

    addMissionToDatabase(field, country, header, message);
});

// Function to add a newly created mission to Firebase database
function addMissionToDatabase(field, country, header, message){
    myFireBaseRef.child('missioninfo').push({field: field, country: country, header: header, message: message});
    window.location.reload();
}

// Collection of all existing missions
var missionCollection;
missionCollection = [];

// Get info of all missions available from Firebase
var myFireBaseMissionInfo = new Firebase("https://fro15c4webappgroup.firebaseio.com/missioninfo");

myFireBaseMissionInfo.once("value", function(allMissionsSnapshot) {

    allMissionsSnapshot.forEach(function(missionSnapshot) {
    var key = missionSnapshot.key();
    var fTest = missionSnapshot.child("field").val();
    var cTest = missionSnapshot.child("country").val();
    var hTest = missionSnapshot.child("header").val();
    var mTest = missionSnapshot.child("message").val();
    missionCollection.push(addObject(fTest,cTest,hTest,mTest));
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
}


// Function to create append all available missions added by the organisations
// The innerHTML of header and message text for each mission is copied from
// the input fields the organisation will fill in and send
function addMissions() {

    // Loop through all existing mission from the collection of missions
    for (i = 0; i < missionCollection.length; i++) {

      header = missionCollection[i].h;
      message = missionCollection[i].m;

      var missionsListDiv = document.getElementById('missions-list');
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
      var readMoreBtn = document.createElement("button");
          readMoreBtn.className = "read-more-btn btn btn-default btn-sm";
      var applyBtn = document.createElement("button");
          applyBtn.className = "apply-btn btn btn-default btn-sm";

      missionsListDiv.appendChild(missionPanel);
      missionPanel.appendChild(panelBody);
      panelBody.appendChild(missionHeader);
      missionHeader.innerHTML = header;
      panelBody.appendChild(missionText);
      missionText.innerHTML = message;
      panelBody.appendChild(missionButtonsDiv);
      missionButtonsDiv.appendChild(readMoreBtn);
      readMoreBtn.innerHTML = "Read more";
      missionButtonsDiv.appendChild(applyBtn);
      applyBtn.innerHTML = "Apply";
    }

    // Collection of all existing missions
    missionCollection = [];

    // Get info of all missions available from Firebase
    var myFireBaseMissionInfo = new Firebase("https://fro15c4webappgroup.firebaseio.com/missioninfo");

    myFireBaseMissionInfo.once("value", function(allMissionsSnapshot) {

        allMissionsSnapshot.forEach(function(missionSnapshot) {
        var key = missionSnapshot.key();
        var fTest = missionSnapshot.child("field").val();
        var cTest = missionSnapshot.child("country").val();
        var hTest = missionSnapshot.child("header").val();
        var mTest = missionSnapshot.child("message").val();
        missionCollection.push(addObject(fTest,cTest,hTest,mTest));
      });
      missionCollection = missionCollection.reverse();
    });
}


// Function to create object array with missions info
var addObject = function(field, country, header, message) {
  var newObj = new Object();

  newObj.f = field;
  newObj.c = country;
  newObj.h = header;
  newObj.m = message;

  return newObj;
};
