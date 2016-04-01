// Initialize your app
var myApp = new Framework7({
    modalTitle: 'Soccer',
    material: true,
    materialPageLoadDelay: 200,
    swipePanel: 'left'
});

// Export selectors engine
var $$ = Dom7;
// api.football-data.org API key
var token = 'f6d7c01f21324a838c7bd0747b918269';

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

// Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('about', function (page) {
    // run createContentPage func after link was clicked
    $$('.create-page').on('click', function () {
        createContentPage();
    });
});

// Register required Template7 helpers, before templates compilation
//Get team's logo using team's name
Template7.registerHelper('teamLogo', function (teamName) {
    var teamLogo = [];
    teamLogo["Leicester City FC"] = "img/teams/epl/leicester.png";
    teamLogo["Tottenham Hotspur FC"] = "img/teams/epl/tottenham.png";
    teamLogo["Arsenal FC"] = "img/teams/epl/arsenal.png";
    teamLogo["Manchester City FC"] = "img/teams/epl/Manchester_City.png";
    teamLogo["West Ham United FC"] = "img/teams/epl/West_Ham.png";
    teamLogo["AFC Bournemouth"] = "img/teams/epl/Bournemouth.png";
    teamLogo["Aston Villa FC"] = "img/teams/epl/Aston_Villa.png";
    teamLogo["Chelsea FC"] = "img/teams/epl/Chelsea.png";
    teamLogo["Crystal Palace FC"] = "img/teams/epl/Crystal_Palace.png";
    teamLogo["Everton FC"] = "img/teams/epl/Everton.png";
    teamLogo["Liverpool FC"] = "img/teams/epl/Liverpool.png";
    teamLogo["Manchester United FC"] = "img/teams/epl/Manchester_United.png";
    teamLogo["Newcastle United FC"] = "img/teams/epl/Newcastle.png";
    teamLogo["Norwich City FC"] = "img/teams/epl/Norwich.png";
    teamLogo["Southampton FC"] = "img/teams/epl/Southampton.png";
    teamLogo["Stoke City FC"] = "img/teams/epl/Stoke.png";
    teamLogo["Sunderland AFC"] = "img/teams/epl/Sunderland.png";
    teamLogo["Swansea City FC"] = "img/teams/epl/Swansea.png";
    teamLogo["Watford FC"] = "img/teams/epl/Watford.png";
    teamLogo["West Bromwich Albion FC"] = "img/teams/epl/West_Bromwich_Albion.png";
    return teamLogo[teamName];
});

function teamLogo(teamName) {
    var teamLogo = [];
    teamLogo["Leicester City FC"] = "img/teams/epl/leicester.png";
    teamLogo["Tottenham Hotspur FC"] = "img/teams/epl/tottenham.png";
    teamLogo["Arsenal FC"] = "img/teams/epl/arsenal.png";
    teamLogo["Manchester City FC"] = "img/teams/epl/Manchester_City.png";
    teamLogo["West Ham United FC"] = "img/teams/epl/West_Ham.png";
    teamLogo["AFC Bournemouth"] = "img/teams/epl/Bournemouth.png";
    teamLogo["Aston Villa FC"] = "img/teams/epl/Aston_Villa.png";
    teamLogo["Chelsea FC"] = "img/teams/epl/Chelsea.png";
    teamLogo["Crystal Palace FC"] = "img/teams/epl/Crystal_Palace.png";
    teamLogo["Everton FC"] = "img/teams/epl/Everton.png";
    teamLogo["Liverpool FC"] = "img/teams/epl/Liverpool.png";
    teamLogo["Manchester United FC"] = "img/teams/epl/Manchester_United.png";
    teamLogo["Newcastle United FC"] = "img/teams/epl/Newcastle.png";
    teamLogo["Norwich City FC"] = "img/teams/epl/Norwich.png";
    teamLogo["Southampton FC"] = "img/teams/epl/Southampton.png";
    teamLogo["Stoke City FC"] = "img/teams/epl/Stoke.png";
    teamLogo["Sunderland AFC"] = "img/teams/epl/Sunderland.png";
    teamLogo["Swansea City FC"] = "img/teams/epl/Swansea.png";
    teamLogo["Watford FC"] = "img/teams/epl/Watford.png";
    teamLogo["West Bromwich Albion FC"] = "img/teams/epl/West_Bromwich_Albion.png";
    return teamLogo[teamName];
}

// Templates using Template7 template engine
myApp.stendingsTemplate = Template7.compile($$('#standings-template').html());
//myApp.fixturesListTemplate = Template7.compile($$('#fixtures-template').html());

$$('#tab1').on('show', function () {
    myApp.fixturesList(token);
});

$$('#tab2').on('show', function () {
    myApp.standingsTable(token);
});

myApp.fixturesList = function (token) {
    $$.ajax({
        headers: {
            'X-Auth-Token': token
        },
        url: 'http://api.football-data.org/v1/soccerseasons/398/fixtures?timeFrame=n30',
        dataType: 'json',
        type: 'GET',
        beforeSend: function (xhr) {
            $$('#tab1 .preloader').show();
        },
        success: function (data, status, xhr) {
            var html = '';
            var groupedData = _.groupBy(data.fixtures, 'matchday');
            var fxKeys = Object.keys(groupedData);
            var fixturesNo = Object.keys(groupedData).length;
            for (var i = 0; i < fixturesNo; i++) {
                html += '<div class="list-group">';
                html += '<ul>';
                html += '<li class="list-group-title">Match day ' + fxKeys[i] + '</li>';
                for (var j = 0; j < groupedData[fxKeys[i]].length; j++) {
                    matchStatus = myApp.shorttenStatus(groupedData[fxKeys[i]][j].status);
                    matchTime = (matchStatus === '') ? localTime(groupedData[fxKeys[i]][j].date) : '';
                    html += '<li class="item-content">';
                    html += '<div class="item-inner">';
                    html += '<div class="item-title">';
                    
                    html += '<table class="fixture-listing-table">';
                    html += '<tr>';
                    html += '<td class="td-club-logo fixture-team-logo"><img src="' + teamLogo(groupedData[fxKeys[i]][j].homeTeamName) + '" class="club-logo"/></td>';
                    html += '<td class="fixture-team-name"><span>' + groupedData[fxKeys[i]][j].homeTeamName.replace(/AFC|FC/g, '') + '</span></td>';
                    html += '<td class="fixture-team-score">' + cleanResult(groupedData[fxKeys[i]][j].result.goalsHomeTeam) + '</td>'; 
                    html += '<td rowspan="2" class="fixture-date">' + matchStatus + matchTime + '<br/>' + dateFormat(groupedData[fxKeys[i]][j].date) + '</td>';
                    html += '</tr>';
                    
                    html += '<tr>';
                    html += '<td class="td-club-logo fixture-team-logo"><img src="' + teamLogo(groupedData[fxKeys[i]][j].awayTeamName) + '" class="club-logo"/></td>';
                    html += '<td class="fixture-team-name"><span>' + groupedData[fxKeys[i]][j].awayTeamName.replace(/AFC|FC/g, '') + '</td>';
                    html += '<td class="fixture-team-score"></span>' + cleanResult(groupedData[fxKeys[i]][j].result.goalsAwayTeam) + '</td>';
                    html += '</tr>';
                    html += '</table>';
                    
                    html += '</div>';
                    html += '</div>';
                    html += '</li>';
                }
                html += '</ul>';
                html += '</div>';
            }
            $$('#fixtures-listing').html(html);
            $$('#tab1 .preloader').hide();
        },
        error: function (xhr, textStatus, errorThrown) {
            $$('#tab1 .preloader').hide();
            console.log(textStatus);
            if (!navigator.onLine) {
                myApp.addNotification({
                    message: 'Please check your internet',
                    hold: 3000
                });
            }
        }
    });
};

myApp.standingsTable = function (token) {
    $$.ajax({
        headers: {
            'X-Auth-Token': token
        },
        url: 'http://api.football-data.org/v1/soccerseasons/398/leagueTable',
        dataType: 'json',
        type: 'GET',
        beforeSend: function (xhr) {
            $$('#tab2 .preloader').show();
        },
        success: function (data, status, xhr) {
            var html1 = myApp.stendingsTemplate(data);
            $$('#standing-table').html(html1);
            $$('#tab2 .preloader').hide();
        },
        error: function (xhr, textStatus, errorThrown) {
            $$('#tab2 .preloader').hide();
            console.log(textStatus);
            if (!navigator.onLine) {
                myApp.addNotification({
                    message: 'Please check your internet',
                    hold: 3000
                });
            }
        }
    });
};

myApp.shorttenStatus = function (text) {
    var shortTxt;
    switch (text) {
        case 'FINISHED':
            shortTxt = 'FT';
            break;
        case 'TIMED':
            shortTxt = '';
            break;
        case 'POSTPONED':
            shortTxt = 'Postponed';
            break;
        default :
            shortTxt = text.toLowerCase();
    }
    return shortTxt;
};

function dateFormat(dateStr) {
    var monthNames = [
        "Jan", "Feb", "Mar",
        "Apr", "May", "Jun", "Jul",
        "Aug", "Sep", "Oct",
        "Nov", "Dec"
    ];
    var weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var date = new Date(dateStr);
    var day = date.getDate();
    var wkday = weekday[date.getDay()];
    var monthIndex = date.getMonth();
    var formated = (wkday + ', ' + monthNames[monthIndex] + ' ' + day);
    return formated;
}

function cleanResult(result) {
    var clnResult;
    clnResult = (result === null) ? '' : result;
    return clnResult;
}

// Return user local time
//function timezoneTime(timeStr, timeZoneDiff){
function localTime(timeStr) {
    dateStr = new Date(timeStr);
    H = addZero(dateStr.getHours());
    m = addZero(dateStr.getMinutes());
    return H + ':' + m;
}
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

//Show defaut tab with fixtures
myApp.fixturesList(token);

// Update app when manifest updated 
// http://www.html5rocks.com/en/tutorials/appcache/beginner/
// Check if a new cache is available on page load.
window.addEventListener('load', function (e) {
    window.applicationCache.addEventListener('updateready', function (e) {
        if (window.applicationCache.status === window.applicationCache.UPDATEREADY) {
            // Browser downloaded a new app cache.
            myApp.confirm('A new version of weather7 is available. Do you want to load it right now?', function () {
                window.location.reload();
            });
        } else {
            // Manifest didn't changed. Nothing new to server.
        }
    }, false);
}, false);





   