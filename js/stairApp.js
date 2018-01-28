'use strict';

var stairway = { //object for localstorage get
    userName: '',
    neighborhood: '',
    steps: '',
    view: ''
};

var user = { // object for localstorage set
    userName: '',
    neighborhood: '',
    steps: '',
    view: ''
};


var stairData = [ // hardcoded stairways
    {
        stairName: "NE 135th St Stairway", neighborhood: "North", numSteps: 196, view: false, link: "http://www.communitywalk.com/location_info/388644/4514590"
    },
    {
        stairName: "Maple Leaf and Thornton Creek Loop", neighborhood: "North", numSteps: 462, view: true, link: "http://seattlestairwaywalks.squarespace.com/blog/2011/5/25/maple-leaf-and-thornton-creek.html"
    },
    {
        stairName: "NE 95th St Stairway", neighborhood: "North", numSteps: 132, view: false, link: "http://www.communitywalk.com/location_info/388644/3976921"
    },
    {
        stairName: "Discovery Park North Bluff Stairway", neighborhood: "North", numSteps: 201, view: false, link: "http://www.communitywalk.com/location_info/388644/8961712"
    },
    {
        stairName: "Glenmont Stairway - Magnolia", neighborhood: "Central", numSteps: 202, view: false, link: "http://www.communitywalk.com/location_info/388644/3942948"
    },
    {
        stairName: "Blaine Stairway", neighborhood: "Central", numSteps: 293, view: false, link: "http://www.communitywalk.com/location_info/388644/3949647"
    },
    {
        stairName: "Pike Street Hill Climb", neighborhood: "Central", numSteps: 163, view: false, link: "http://www.communitywalk.com/location_info/388644/3949907"
    },
    {
        stairName: "Thistle Stairway", neighborhood: "West", numSteps: 367, view: true, link: "http://www.communitywalk.com/location_info/388644/3935309"
    },
    {
        stairName: "Dose Stairway", neighborhood: "West", numSteps: 138, view: true, link: "http://www.seattlestairwaywalks.com/blog/tag/dose-terrace-stairs"
    },
    {
        stairName: "Ferdinand Stairway", neighborhood: "West", numSteps: 171, view: true, link: "http://www.seattlestairwaywalks.com/blog/tag/dose-terrace-stairs"
    },
    {
        stairName: "West Ferry Terminal", neighborhood: "Central", numSteps: 33, view: true, link: "http://www.seattlestairwaywalks.com/blog/tag/dose-terrace-stairs"
    },
    {
        stairName: "Howe Street Stairs", neighborhood: "Central", numSteps: 388, view: false, link: "http://www.communitywalk.com/location_info/388644/3949638"
    },
    {
        stairName: "Cooper Stairway", neighborhood: "South", numSteps: 215, view: true, link: "http://www.communitywalk.com/location_info/388644/3975969"
    },
    {
        stairName: "Lucille Stairway", neighborhood: "South", numSteps: 158, view: false, link: "http://www.communitywalk.com/location_info/388644/3975969"
    },
    {
        stairName: "Wilcox Wall", neighborhood: "Central", numSteps: 464, view: true, link: "http://qastairs.com/wilcox.html"
    },
    {
        stairName: "Golden Gardens Park Stairway Trail", neighborhood: "North", numSteps: 119, view: false,  link: "http://www.communitywalk.com/location_info/388644/3943253"
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
   
    //add object properties
    user.userName = userName;
    user.neighborhood = neighborhood;
    user.steps = steps;
    user.view = view;
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

        if (view) {
            var viewYN = "Yes";
        }
        else {
            var viewYN = "No";
        }
       
        var userContainer = document.getElementById('resultsContainer');

        var stairContainer = document.createElement('div');
        userContainer.appendChild(stairContainer);
        var pResults = document.createElement('p');
        var reportSteps;
        if (steps == 249) {
            reportSteps = "under 250"
        }
        else {
            reportSteps = "250 plus";
        }
        pResults.innerHTML = "<span style='font-size:22px;'>Hello " + stairwayChoice.userName + "! You have selected:</span>  <ul class=\'ulSelect'><li>Neighborhood: " + stairwayChoice.neighborhood + "</li >" +
            "<li>Number of steps: " + reportSteps + "</li><li>Prefer View?  " + viewYN + "</li></ul>";
            
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
            var parkLink = stairData[i].link;
            console.log(view);
            console.log(location);
            if (location == "all" && !view && steps == 249) {
                console.log("1st if");
                if (nSteps <= steps) {
                    foundResult = true;
                    //  console.log(location + " " + nSteps + " " + steps + isView + isPark + stairData[i].stairName);
                    if (oneH2 === 0) {
                        var h2Results = document.createElement('h2');
                        h2Results.innerHTML = "Your criteria returned the following results. Happy climbing!";
                        h2Results.setAttribute('class', 'h2Results');
                        userContainer.appendChild(h2Results);
                        var ulResults = document.createElement('ul');
                        ulResults.setAttribute('class', 'ulClimbs');
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
            else if (location == "all" && !view && steps == 250) {
                console.log("2nd if");
                if (nSteps >= steps) {
                    foundResult = true;
                    //  console.log(location + " " + nSteps + " " + steps + isView + isPark + stairData[i].stairName);
                    if (oneH2 === 0) {
                        var h2Results = document.createElement('h2');
                        h2Results.innerHTML = "Your criteria returned the following results. Happy climbing!";
                        h2Results.setAttribute('class', 'h2Results');
                        userContainer.appendChild(h2Results);
                        var ulResults = document.createElement('ul');
                        ulResults.setAttribute('class', 'ulClimbs');
                        userContainer.appendChild(ulResults);
                    }
                    var liResults = document.createElement('li');
                    ulResults.appendChild(liResults);
                    liResults.innerHTML = "<a href=" + parkLink + " target=\'_blank'>" + stairData[i].stairName + "</a>";
                    // var divResults = document.createElement('div');
                    oneH2++;
                }
            }
            else if (location == "all" && view && steps == 249) {
                console.log("3rd if");
                if (nSteps <= steps && view === isView) {
                    foundResult = true;
                    //  console.log(location + " " + nSteps + " " + steps + isView + isPark + stairData[i].stairName);
                    if (oneH2 === 0) {
                        var h2Results = document.createElement('h2');
                        h2Results.innerHTML = "Your criteria returned the following results. Happy climbing!";
                        h2Results.setAttribute('class', 'h2Results');
                        userContainer.appendChild(h2Results);
                        var ulResults = document.createElement('ul');
                        ulResults.setAttribute('class', 'ulClimbs');
                        userContainer.appendChild(ulResults);
                    }
                    var liResults = document.createElement('li');
                    ulResults.appendChild(liResults);
                    liResults.innerHTML = "<a href=" + parkLink + " target=\'_blank'>" + stairData[i].stairName + "</a>";
                    // var divResults = document.createElement('div');
                    oneH2++;
                }
            }
            else if (location == "all" && view && steps == 250) {
                console.log("4th if");
                if (nSteps >= steps && view === isView) {
                    foundResult = true;
                    //  console.log(location + " " + nSteps + " " + steps + isView + isPark + stairData[i].stairName);
                    if (oneH2 === 0) {
                        var h2Results = document.createElement('h2');
                        h2Results.innerHTML = "Your criteria returned the following results. Happy climbing!";
                        h2Results.setAttribute('class', 'h2Results');
                        userContainer.appendChild(h2Results);
                        var ulResults = document.createElement('ul');
                        ulResults.setAttribute('class', 'ulClimbs');
                        userContainer.appendChild(ulResults);
                    }
                    var liResults = document.createElement('li');
                    ulResults.appendChild(liResults);
                    liResults.innerHTML = "<a href=" + parkLink + " target=\'_blank'>" + stairData[i].stairName + "</a>";
                    // var divResults = document.createElement('div');
                    oneH2++;
                }
            }
            else if (location !== "all" && !view && steps == 249)
            {
                console.log("fifth if");
                if (userLocation == location && nSteps <= steps) {
                   
                    foundResult = true;
                    //  console.log(location + " " + nSteps + " " + steps + isView + isPark + stairData[i].stairName);
                    if (oneH2 === 0) {
                        var h2Results = document.createElement('h2');
                        h2Results.innerHTML = "Your criteria returned the following results. Happy climbing!";
                        h2Results.setAttribute('class', 'h2Results');
                        userContainer.appendChild(h2Results);
                        var ulResults = document.createElement('ul');
                        ulResults.setAttribute('class', 'ulClimbs');
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
            else if (location !== "all" && !view && steps == 250) {
                console.log("6th if");
                if (userLocation == location && nSteps >= steps) {
                    foundResult = true;
                    //  console.log(location + " " + nSteps + " " + steps + isView + isPark + stairData[i].stairName);
                    if (oneH2 === 0) {
                        var h2Results = document.createElement('h2');
                        h2Results.innerHTML = "Your criteria returned the following results. Happy climbing!";
                        h2Results.setAttribute('class', 'h2Results');
                        userContainer.appendChild(h2Results);
                        var ulResults = document.createElement('ul');
                        ulResults.setAttribute('class', 'ulClimbs');
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
            else if (location !== "all" && view && steps == 249) {
                console.log("fifth if");
                if (userLocation == location && nSteps <= steps && view === isView) {

                    foundResult = true;
                    //  console.log(location + " " + nSteps + " " + steps + isView + isPark + stairData[i].stairName);
                    if (oneH2 === 0) {
                        var h2Results = document.createElement('h2');
                        h2Results.innerHTML = "Your criteria returned the following results. Happy climbing!";
                        h2Results.setAttribute('class', 'h2Results');
                        userContainer.appendChild(h2Results);
                        var ulResults = document.createElement('ul');
                        ulResults.setAttribute('class', 'ulClimbs');
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
                console.log("6th if");
                if (userLocation == location && nSteps >= steps && view === isView) {
                    foundResult = true;
                    if (oneH2 === 0) {
                        var h2Results = document.createElement('h2');
                        h2Results.innerHTML = "Your criteria returned the following results. Happy climbing!";
                        h2Results.setAttribute('class', 'h2Results');
                        userContainer.appendChild(h2Results);
                        var ulResults = document.createElement('ul');
                        ulResults.setAttribute('class', 'ulClimbs');
                        userContainer.appendChild(ulResults);

                    }
                    var liResults = document.createElement('li');
                    ulResults.appendChild(liResults);
                    liResults.innerHTML = "<a href=" + parkLink + " target=\'_blank'>" + stairData[i].stairName + "</a>";
                    
                    oneH2++;
                }
              
            }
           
        
        }
        if (!foundResult) {
            var pNoResults = document.createElement('p');
            pNoResults.innerHTML = "Your criteria has returned no results. <a href=\"index.html\"\>Try again\<\a\> with new criteria. ";
            pResults.appendChild(pNoResults);
        }  
       
    }
}
