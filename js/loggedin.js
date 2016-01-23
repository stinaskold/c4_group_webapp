// Function to create object array
var addObject = function(field, country, header, text) {
  var newObj   = new Object();

  newObj.f   = field;
  newObj.c   = country;
  newObj.h   = header;
  newObj.t   = text;

  return newObj;
};

// Collection of all existing missions
var missionCollection = [];

// So far just this part of code is for testing that addMission function is working
// As soon as we fix the Firebase object the actual "header" and "text" variable
// will be copied from input fields saved the database
missionCollection.push(addObject("Health","Congo","Health needed in Congo", "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."));
missionCollection.push(addObject("Children","Romania","Help children in Romania", "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."));
missionCollection.push(addObject("Animals","Ghana","Help animals in Ghana", "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."));

var fields = [];
var countries = [];

for (var i = 0; i < missionCollection.length; i++) {
  fields[i] = missionCollection[i].f;
  countries[i] = missionCollection[i].c;
}

fieldItems = removeDuplicates(fields);
countryItems = removeDuplicates(countries);

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

addFieldAndCountryList();

// Function to add existing field and country names to list array in toggles
function addFieldAndCountryList() {
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
    e.stopImmediatePropagation();

    var fieldFilter = $(this).html();

    missionCollection = missionCollection.filter(function(filteredMission){
       return filteredMission.f == fieldFilter;
    });

    document.getElementById('missions-list').innerHTML = "";
    addMissions();
    e.preventDefault();
  });

  $("ul[id*=country-dropdown-menu] li a").on('click',function (e) {
    e.stopImmediatePropagation();

    var countryFilter = $(this).html();

    missionCollection = missionCollection.filter(function(filteredMission){
       return filteredMission.c == countryFilter;
    });

    document.getElementById('missions-list').innerHTML = "";
    addMissions();
    e.preventDefault();
  });
}


// Function to create append all available missions added by the organisations
// The innerHTML of header and message text for each mission is copied from
// the input fields the organisation will fill in and send
function addMissions() {

    // Loop through all existing mission from the collection of missions
    for (i = 0; i < missionCollection.length; i++) {

      header = missionCollection[i].h;
      text = missionCollection[i].t;

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
      missionText.innerHTML = text;
      panelBody.appendChild(missionButtonsDiv);
      missionButtonsDiv.appendChild(readMoreBtn);
      readMoreBtn.innerHTML = "Read more";
      missionButtonsDiv.appendChild(applyBtn);
      applyBtn.innerHTML = "Apply";
    }

    missionCollection = [];

    missionCollection.push(addObject("Health","Congo","Health needed in Congo", "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."));
    missionCollection.push(addObject("Children","Romania","Help children in Romania", "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."));
    missionCollection.push(addObject("Animals","Ghana","Help animals in Ghana", "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."));

}
