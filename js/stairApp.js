'use strict';

var stairway = { //object for localstorage get
    userName: '',
    neighborhood: '',
    steps: '',
    view: '',
    park: ''
};

var user = { // object for localstorage set
    userName: '',
    neighborhood: '',
    steps: '',
    view: '',
    park: ''
};


var stairData = [ // hardcoded stairways
    {
        stairName: "NE 135th St Stairway", neighborhood: "North", numSteps: 196, view: false, park: false, link: "http://www.communitywalk.com/location_info/388644/4514590"},
    {
        stairName: "Maple Leaf and Thornton Creek Loop", neighborhood: "North", numSteps: 462, view: true, park: false, link: "http://seattlestairwaywalks.squarespace.com/blog/2011/5/25/maple-leaf-and-thornton-creek.html" },
    {
        stairName: "NE 95th St Stairway", neighborhood: "North", numSteps: 132, view: false, park: false, link: "http://www.communitywalk.com/location_info/388644/3976921" },
    {
        stairName: "Discovery Park North Bluff Stairway", neighborhood: "North", numSteps: 201, view: false, park: true, link: "http://www.communitywalk.com/location_info/388644/8961712" },
    {
        stairName: "Glenmont Stairway - Magnolia", neighborhood: "Central", numSteps: 202, view: false, park: false, link: "http://www.communitywalk.com/location_info/388644/3942948" },
    {
        stairName: "Blaine Stairway", neighborhood: "Central", numSteps: 293, view: false, park: false, link: "http://www.communitywalk.com/location_info/388644/3949647"},
    {
        stairName: "Pike Street Hill Climb", neighborhood: "Central", numSteps: 163, view: false, park: false, link: "http://www.communitywalk.com/location_info/388644/3949907"},
    {
        stairName: "Thistle Stairway", neighborhood: "WestSouth", numSteps: 367, view: false, park: true, link: "http://www.communitywalk.com/location_info/388644/3935309"},
    {
        stairName: "Dose Stairway", neighborhood: "WestSouth", numSteps: 138, view: true, park: false, link: "http://www.seattlestairwaywalks.com/blog/tag/dose-terrace-stairs"}, 
    {
        stairName: "Ferdinand Stairway", neighborhood: "WestSouth", numSteps: 171, view: true, park: true, link: "http://www.seattlestairwaywalks.com/blog/tag/dose-terrace-stairs"
    },
    {
        stairName: "West Ferry Terminal", neighborhood: "Central", numSteps: 33, view: true, park: true, link: "http://www.seattlestairwaywalks.com/blog/tag/dose-terrace-stairs"
    },
    {
        stairName: "Mercerdale Hillside Loop", neighborhood: "East", numSteps: 321, view: true, park: false, link: "http://seattlestairwaywalks.squarespace.com/blog/category/eastside-seattle"
    }
  
];


var el = document.getElementById("userInput");
if (el) {
    el.addEventListener('submit', getUserInfo);
}


function getUserInfo(event) { //called on submit
    event.preventDefault();
    var userName = document.getElementById("tbName").value;
    var neighborhood = document.getElementById("neighborhood").value;
    var steps = document.getElementById("steps").value;
    var view = document.getElementById("view").checked;
    var park = document.getElementById("park").checked;
   
    //add object properties
    user.userName = userName;
    user.neighborhood = neighborhood;
    user.steps = steps;
    user.view = view;
    user.park = park;
    localStorage.setItem('stairway', JSON.stringify(user));
    window.location = 'results.html';

}

function showStairs() { //triggered by results.html body onload

    var stairwayChoice = JSON.parse(localStorage.getItem('stairway'));

    if (stairwayChoice) {
        var location = stairwayChoice.neighborhood.toLowerCase();
        var steps = parseInt(stairwayChoice.steps);
        var view = stairwayChoice.view;
        var viewYN;
        var parkYN
        var park = stairwayChoice.park;

        if (view) {
            var viewYN = "Yes";
        }
        else {
            var viewYN = "No";
        }
        if (park) {
            parkYN = "Yes"
        }
        else {
            parkYN = "No";
        }
        var userContainer = document.getElementById('resultsContainer');

        var stairContainer = document.createElement('div');
        userContainer.appendChild(stairContainer);
        var pResults = document.createElement('p');
        pResults.innerHTML = "Hello " + stairwayChoice.userName + "!  You have selected: <ul class=\'ulSelect'><li>Neighborhood: " + stairwayChoice.neighborhood + "</li >" +
            "<li>Number of steps: " + (steps - 100) + " - " + steps + "</li><li>Prefer View?  " + viewYN + "</li>" +
            "<li>Prefer park setting? " + parkYN + "</li></ul>";
            
        userContainer.appendChild(pResults);

        userContainer.setAttribute('class', 'resultsWrapper');
       
        var foundResult = false; 
        var oneH2 = 0; // set to only allow header to be added once
        for (var i = 0; i < stairData.length; i++) {
            //https://stackoverflow.com/questions/25607798/create-multidimensional-array-in-for-loop
         //   finalResult[i] = new Array();

          //  alert(stairData.length);
            var userLocation = stairData[i].neighborhood.toLowerCase();
            var nSteps = stairData[i].numSteps;
            var isView = stairData[i].view;
            var isPark = stairData[i].park;
            var parkLink = stairData[i].link;
            if (view) {
                if (park) {
                    if (userLocation == location && nSteps <= steps && nSteps >= steps - 100 && view === isView && park === isPark) {
                        foundResult = true;
                      //  console.log(location + " " + nSteps + " " + steps + isView + isPark + stairData[i].stairName);
                        if (oneH2 === 0) {
                            var h2Results = document.createElement('h2');
                            h2Results.innerHTML = "Your criteria returned the following results. Happy climbing!";
                            h2Results.setAttribute('class', 'h2Results');
                            userContainer.appendChild(h2Results);
                            var ulResults = document.createElement('ul');
                            userContainer.appendChild(ulResults);

                        }
                        var liResults = document.createElement('li');
                        ulResults.appendChild(liResults);
                        liResults.innerHTML = "<a href=" + parkLink + " target=\'_blank'>" + stairData[i].stairName + "</a>";
                        // var divResults = document.createElement('div');
                        oneH2++;
                    }
                   // console.log("park and view");
                }
                else {
                    if (userLocation == location && nSteps <= steps && nSteps >= steps - 100 && view === isView) {
                        foundResult = true;
                        console.log(location + " " + nSteps + " " + steps + isView + isPark + stairData[i].stairName);
                        if (oneH2 === 0) {
                            var h2Results = document.createElement('h2');
                            h2Results.innerHTML = "Your criteria returned the following results. Happy climbing!";
                            h2Results.setAttribute('class', 'h2Results');
                            userContainer.appendChild(h2Results);
                            var ulResults = document.createElement('ul');
                            userContainer.appendChild(ulResults);

                        }
                        var liResults = document.createElement('li');
                        ulResults.appendChild(liResults);
                        liResults.innerHTML = "<a href=" + parkLink + " target=\'_blank'>" + stairData[i].stairName + "</a>";
                        // var divResults = document.createElement('div');
                        oneH2++;
                    }
                  //  console.log("view");
                }

            }
            else if (park) {
                if (userLocation == location && nSteps <= steps && nSteps >= steps - 100 && park === isPark) {
                    foundResult = true;
                    console.log(location + " " + nSteps + " " + steps + isView + isPark + stairData[i].stairName);
                    if (oneH2 === 0) {
                        var h2Results = document.createElement('h2');
                        h2Results.innerHTML = "Your criteria returned the following results. Happy climbing!";
                        h2Results.setAttribute('class', 'h2Results');
                        userContainer.appendChild(h2Results);
                        var ulResults = document.createElement('ul');
                        userContainer.appendChild(ulResults);

                    }
                    var liResults = document.createElement('li');
                    ulResults.appendChild(liResults);
                    liResults.innerHTML = "<a href=" + parkLink + " target=\'_blank'>" + stairData[i].stairName + "</a>";
                    // var divResults = document.createElement('div');
                    oneH2++;
                }
               // console.log("park");
            }

            else {
                if (userLocation == location && nSteps <= steps && nSteps >= steps - 100) {
                    foundResult = true;
                    console.log(location + " " + nSteps + " " + steps + isView + isPark + stairData[i].stairName);
                    if (oneH2 === 0) {
                        var h2Results = document.createElement('h2');
                        h2Results.innerHTML = "Your criteria returned the following results. Happy climbing!";
                        h2Results.setAttribute('class', 'h2Results');
                        userContainer.appendChild(h2Results);
                        var ulResults = document.createElement('ul');
                        userContainer.appendChild(ulResults);

                    }
                    var liResults = document.createElement('li');
                    ulResults.appendChild(liResults);
                    liResults.innerHTML = "<a href=" + parkLink + " target=\'_blank'>" + stairData[i].stairName + "</a>";
                    // var divResults = document.createElement('div');
                    oneH2++;
                }
            }
           // console.log("neither selected");
          
           
          //  console.log("view: " + view + " park: " + park)
              
          
             
          

        }
        if (!foundResult) {
            var pNoResults = document.createElement('p');
            pNoResults.innerHTML = "Your criteria has returned no results. <a href=\"index.html\"\>Try again\<\a\> with new criteria. ";
            pResults.appendChild(pNoResults);
        }  
       
    }
}
