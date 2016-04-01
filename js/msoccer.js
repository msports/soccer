// Initialize your app
var myApp = new Framework7({
    modalTitle: 'Soccer',
    material: true,
//    materialPageLoadDelay: 200,
    swipePanel: 'left'
});

// Export selectors engine
var $$ = Dom7;
// api.football-data.org API key
var token = 'dfb8064fb1d14b9eb0060a602cd8ec01';

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});



Template7.registerHelper('localTime', function (timeStr) {
    dateStr = new Date(timeStr);
    H = addZero(dateStr.getHours());
    m = addZero(dateStr.getMinutes());
    return H + ':' + m;
});

//Team colors
function teamColor(teamName) {
    var color = [];
    color["Leicester City FC"] = "#0053a0";
    color["Tottenham Hotspur FC"] = "#131259";
    color["Arsenal FC"] = "#db0007";
    color["Manchester City FC"] = "#01b6dc";
    color["West Ham United FC"] = "#61223c";
    color["AFC Bournemouth"] = "#e53021";
    color["Aston Villa FC"] = "#9d0051";
    color["Chelsea FC"] = "#003d95";
    color["Crystal Palace FC"] = "#bd002e";
    color["Everton FC"] = "#07427c";
    color["Liverpool FC"] = "#007071";
    color["Manchester United FC"] = "#db2118";
    color["Newcastle United FC"] = "#000000";
    color["Norwich City FC"] = "#077e2d";
    color["Southampton FC"] = "#00a066";
    color["Stoke City FC"] = "#db2d39";
    color["Sunderland AFC"] = "#98682e";
    color["Swansea City FC"] = "#000000";
    color["Watford FC"] = "#000000";
    color["West Bromwich Albion FC"] = "#8c6038";
    return color[teamName];
}

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
myApp.fixturesTemplate = Template7.compile($$('#fixtures-template').html());
myApp.stendingsTemplate = Template7.compile($$('#standings-template').html());
myApp.fixtureDetailTemplate = Template7.compile($$('#fixture-detail-template').html());
myApp.favoritesListingTemplate = Template7.compile($$('#favorites-listing-template').html());
myApp.teamsListingTemplate = Template7.compile($$('#teams-listing-template').html());
myApp.teamTemplate = Template7.compile($$('#team-template').html());
myApp.playerTemplate = Template7.compile($$('#player-template').html());

myApp.onPageAfterAnimation('index', function (page) {
    //Show default tab with fixtures
    if ($$('#fixtures-listing').children().length === 0) {
        myApp.fixturesList(token);
    }

    // Load fixtures on fixtures tab when shown ego
    $$('#spaintab').on('show', function () {
        if ($$('#league-listing').children().length === 0)
            myApp.leagueList(token);
    });

//Pull to refresh fixtures contents ego
    $$('#spaintab').on('refresh', function () {
        $$('#league-listing').html('');
        myApp.leagueList(token);
        myApp.pullToRefreshDone();
    });

// Load fixtures on fixtures tab when shown
    $$('#spaintab1').on('show', function () {
        if ($$('#fixtures-listing').children().length === 0)
            myApp.fixturesList(token);
    });

//Pull to refresh fixtures contents
    $$('#spaintab1').on('refresh', function () {
        $$('#fixtures-listing').html('');
        myApp.fixturesList(token);
        myApp.pullToRefreshDone();
    });

// Load standings on standings tab when shown
    $$('#spaintab2').on('show', function () {
        if ($$('#standing-table').children().length === 0)
            myApp.standingsTable(token);
    });

//Pull to refresh standings contents
    $$('#spaintab2').on('refresh', function () {
        $$('#standing-table').html('');
        myApp.standingsTable(token);
        myApp.pullToRefreshDone();
    });
});

// Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('favorites', function (page) {
    myApp.loadFavoriteTeams();

    $$('.swipeout').on('delete', function () {
        var scFavTeams = JSON.parse(localStorage.scFavTeams);
        teamcode = $$(this).children('#favorite-list').attr('teamcode');
        for (var i = 0; i < scFavTeams.length; i++) {
            if (scFavTeams[i].code.toString() === teamcode.toString())
                scFavTeams.splice(i, 1);
        }
        myApp.updateBadge('.favorites-badge', scFavTeams.length);
        localStorage.scFavTeams = JSON.stringify(scFavTeams);
    });

    // Handle search results
    var mySearchbar = myApp.searchbar('.searchbar', {
        searchList: '.list-block-search',
        searchIn: '.item-title',
        onDisable: function (s) {
            $$('.popup input[type="search"]')[0].blur();
            myApp.closeModal('.popup');
        },
        onClear: function (s) {
            $$('.popup .search-results').html('');
        }
    });

    $$('.popup').on('open', function () {
        mySearchbar.enable();
        var scTeams = JSON.parse(localStorage.scTeams);
        var teams = myApp.teamsListingTemplate(scTeams);
        $$('.list-block-search').html(teams);
    });

    $$('.popup').on('opened', function () {
        $$('.popup .fav-search')[0].focus();
    });

    $$('.popup').on('close', function () {
        var selectedFavTeams = $$('.list-block-search input[type=checkbox]:checked');
        if (selectedFavTeams.length === 0)
            return;
        var scFavTeams = localStorage.scFavTeams ? JSON.parse(localStorage.scFavTeams) : [];
        selectedFavTeams.each(function () {
            scFavTeams.push({
                code: $$(this).val(),
                name: $$(this).attr('teamname'),
                href: $$(this).attr('tem-href')
            });
        });
        var cleaned = myApp.arrUnique(scFavTeams);
        localStorage.scFavTeams = JSON.stringify(cleaned);
        myApp.updateBadge('.favorites-badge', cleaned.length);
        myApp.loadFavoriteTeams();
    });
});

myApp.onPageInit('team-detail', function () {
    var teamHref = $$('#team-href').attr('team-href');
    teamHref = teamHref.split('/');
    var teamId = teamHref[teamHref.length - 1];
    myApp.loadTeamFixtures(teamId);

    $$('#fixtures').on('show', function () {
        if ($$('#tm-fixture').children().length === 0) {
            myApp.loadTeamFixtures(teamId);
        }
    });

    $$('#players').on('show', function () {

        $$.ajax({
            headers: {
                'X-Auth-Token': token
            },
            url: 'http://api.football-data.org/v1/teams/' + teamId + '/players',
            dataType: 'json',
            success: function (data) {
                var grouped = _.groupBy(data.players, 'position');
                var players = myApp.playerTemplate(grouped);
                $$('#player-list').html(players);
                $$('#players .preloader').hide();
            }
        });
    });
});

myApp.loadTeamFixtures = function (teamId) {
    $$.ajax({
        headers: {
            'X-Auth-Token': token
        },
        url: 'http://api.football-data.org/v1/teams/' + teamId + '/fixtures',
        dataType: 'json',
        success: function (data) {
            var grouped = _.groupBy(data.fixtures, 'matchday');
            var html = myApp.fixturesTemplate(grouped);
            $$('#tm-fixture').html(html);
            $$('#fixtures .preloader').hide();
        }
    });
};


// Reomve dublicate values in array
myApp.arrUnique = function (arr) {
    var cleaned = [];
    arr.forEach(function (itm) {
        var unique = true;
        cleaned.forEach(function (itm2) {
            if (_.isEqual(itm, itm2))
                unique = false;
        });
        if (unique)
            cleaned.push(itm);
    });
    return cleaned;
};

myApp.updateBadge = function (selector, value) {
    $$(selector).html(value);
};

myApp.loadFavoriteTeams = function () {
    var scFavTeams = localStorage.scFavTeams;
    if (scFavTeams) {
        scFavTeams = JSON.parse(scFavTeams);
        var favList = myApp.favoritesListingTemplate(scFavTeams);
        $$('.favorites-list').html(favList);
    }
};

// Load fixtures on fixtures tab when shown
$$('#spaintab1').on('show', function () {
    if ($$('#fixtures-listing').children().length === 0)
        myApp.fixturesList(token);
});

//Pull to refresh fixtures contents
$$('#spaintab1').on('refresh', function () {
    $$('#fixtures-listing').html('');
    myApp.fixturesList(token);
    myApp.pullToRefreshDone();
});

// Load standings on standings tab when shown
$$('#spaintab2').on('show', function () {
    if ($$('#standing-table').children().length === 0)
        myApp.standingsTable(token);
});

//Pull to refresh standings contents
$$('#spaintab2').on('refresh', function () {
    $$('#standing-table').html('');
    myApp.standingsTable(token);
    myApp.pullToRefreshDone();
});

myApp.fixturesList = function (token) {
    var startDate = dateSubstruct(10); //get fixtures from 10 days ago
    var endDate = dateAdd(10);//Get fixtures to 10 days in future
    $$.ajax({
        headers: {
            'X-Auth-Token': token
        },
        url: 'http://api.football-data.org/v1/soccerseasons/402/fixtures?timeFrameStart=' + startDate + '&timeFrameEnd=' + endDate,
        dataType: 'json',
        type: 'GET',
        beforeSend: function (xhr) {
            $$('#spaintab1 .preloader').show();
        },
        success: function (data, status, xhr) {
            var grouped = _.groupBy(data.fixtures, 'matchday')
            var html = myApp.fixturesTemplate(grouped);
            $$('#fixtures-listing').html(html);
            $$('#spaintab1 .preloader').hide();
        },
        error: function (xhr, textStatus, errorThrown) {
            $$('#spaintab1 .preloader').hide();
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
        url: 'http://api.football-data.org/v1/soccerseasons/402/leagueTable',
        dataType: 'json',
        type: 'GET',
        beforeSend: function (xhr) {
            $$('#spaintab2 .preloader').show();
        },
        success: function (data, status, xhr) {
            var html = myApp.stendingsTemplate(data);
            $$('#standing-table').html(html);
            $$('#spaintab2 .preloader').hide();
        },
        error: function (xhr, textStatus, errorThrown) {
            $$('#spaintab2 .preloader').hide();
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
        case 'IN_PLAY':
            shortTxt = 'Live';
            break;
        default :
            shortTxt = text.toLowerCase();
    }
    return shortTxt;
};

//Uupdate list of teams
myApp.updateTeams = function (token) {
    if (localStorage.scTeams)
        return;
    $$.ajax({
        headers: {
            'X-Auth-Token': token
        },
        url: 'http://api.football-data.org/v1/soccerseasons/402/teams',
        dataType: 'json',
        type: 'GET',
        success: function (data, status, xhr) {
            localStorage.scTeams = JSON.stringify(data);
        },
        error: function (xhr, textStatus, errorThrown) {
        }
    });
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

function getDateStr(dateStr) {
    var date = new Date(dateStr);
    var day = addZero(date.getDate());
    var month = addZero(date.getMonth() + 1);
    var year = date.getFullYear();
    return day + '/' + month + '/' + year;
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

//substruct n days from date
function dateSubstruct(days) {
    var d = new Date(); // today!
    d.setDate(d.getDate() - days);
    dy = addZero(d.getDate());
    mn = addZero(d.getMonth() + 1);
    yr = d.getFullYear();
    dateStr = (yr + '-' + mn + '-' + dy);
    return dateStr;
}

//Add n days to date
function dateAdd(days) {
    var d = new Date(); // today!
    d.setDate(d.getDate() + days);
    dy = addZero(d.getDate());
    mn = addZero(d.getMonth() + 1);
    yr = d.getFullYear();
    dateStr = (yr + '-' + mn + '-' + dy);
    return dateStr;
}

//Show default tab with fixtures
myApp.fixturesList(token);

//Update teams
myApp.updateTeams(token);
//Update favorites badge on startup
var favNo = localStorage.scFavTeams ? JSON.parse(localStorage.scFavTeams).length : 0;
myApp.updateBadge('.favorites-badge', favNo);

// Build fixture details page
$$(document).on('click', '.fixture-list', function (e) {
    var fixtureLink = $$(this).attr('fixture-link');
    var pageContent = $$('#fixture-vrt-detail-template').html();
    mainView.loadContent(pageContent);
    $$.ajax({
        headers: {
            'X-Auth-Token': token
        },
        url: fixtureLink,
        dataType: 'json',
        success: function (data) {
            //Grouping fixtures by year
            var grouped = _.groupBy(data.head2head.fixtures, function (fixture) {
                var d = new Date(fixture.date);
                var y = d.getFullYear();
                return y;
            });
            data.head2head.fixtures = grouped;
            var matchStatus = myApp.shorttenStatus(data.fixture.status);
            data.fixture.status = matchStatus;
            data.fixture.matchTime = matchStatus === '' ? localTime(data.fixture.date) : '-';
            data.fixture.status = matchStatus === '' ? dateFormat(data.fixture.date) : matchStatus;
            var pageContent = myApp.fixtureDetailTemplate(data);
            $$('.page-on-center').html(pageContent);
        }
    });

});

//Build team tetails page
$$(document).on('click', '#favorite-list', function () {
    var teamHref = $$(this).attr('team-href');
    var teamName = $$(this).attr('teamname');
    var team = {};
    team['name'] = teamName;
    team['href'] = teamHref;
    team['color'] = teamColor(teamName);
    teamContent = myApp.teamTemplate(team);

    mainView.loadContent(teamContent);
});


//Remove AFC and FC on team name
String.prototype.cleanTeamName = function () {
    return this.replace(/AFC|FC/g, '');
};

function playerImg(playerName) {
    var img = [];
    //Arsenal
    img['David Ospina'] = 'img/players/epl/DavidOspina.png';
    img['Petr Cech'] = 'img/players/epl/PetrCech.png';
    img['Per Mertesacker'] = 'img/players/epl/PerMertesacker.png';
    img['Gabriel Paulista'] = 'img/players/epl/GabrielPaulista.png';
    img['Laurent Koscielny'] = 'img/players/epl/LaurentKoscielny.png';
    img['Kieran Gibbs'] = 'img/players/epl/KieranGibbs.png';
    img['Nacho Monreal'] = 'img/players/epl/NachoMonreal.png';
    img['Calum Chambers'] = 'img/players/epl/CalumChambers.png';
    img['Héctor Bellerín'] = 'img/players/epl/HectorBellerin.png';
    img['Mathieu Flamini'] = 'img/players/epl/MathieuFlamini.png';
    img['Mikel Arteta'] = 'img/players/epl/MikelArteta.png';
    img['Francis Coquelin'] = 'img/players/epl/FrancisCoquelin.png';
    img['Jack Wilshere'] = 'img/players/epl/JackWilshere.png';
    img['Mohamed Elneny'] = 'img/players/epl/MohamedElneny.png';
    img['Aaron Ramsey'] = 'img/players/epl/AaronRamsey.png';
    img['Mesut Özil'] = 'img/players/epl/MesutOzil.png';
    img['Tomás Rosicky'] = 'img/players/epl/TomasRosicky.png';
    img['Santi Cazorla'] = 'img/players/epl/SantiCazorla.png';
    img['Alex Oxlade-Chamberlain'] = 'img/players/epl/AlexOxlade-Chamberlain.png';
    img['Alexis Sánchez'] = 'img/players/epl/AlexisSanchez.png';
    img['Theo Walcott'] = 'img/players/epl/TheoWalcott.png';
    img['Joel Campbell'] = 'img/players/epl/JoelCampbell.png';
    img['Alex Iwobi'] = 'img/players/epl/AlexIwobi.png';
    img['Olivier Giroud'] = 'img/players/epl/OlivierGiroud.png';
    img['Danny Welbeck'] = 'img/players/epl/DannyWelbeck.png';

    //Man united
    img['David de Gea'] = 'img/players/epl/DaviddeGea.png';
    img['Phil Jones'] = 'img/players/epl/PhilJones.png';
    img['Marcos Rojo'] = 'img/players/epl/MarcosRojo.png';
    img['Memphis Depay'] = 'img/players/epl/MemphisDepay.png';
    img['Juan Mata'] = 'img/players/epl/JuanMata.png';
    img['Wayne Rooney'] = 'img/players/epl/WayneRooney.png';
    img['Adnan Januzaj'] = 'img/players/epl/AdnanJanuzaj.png';
    img['Chris Smalling'] = 'img/players/epl/ChrisSmalling.png';
    img['Michael Carrick'] = 'img/players/epl/MichaelCarrick.png';
    img['Daley Blind'] = 'img/players/epl/DaleyBlind.png';
    img['Ashley Young'] = 'img/players/epl/AshleyYoung.png';
    img['Sergio Romero'] = 'img/players/epl/SergioRomero.png';
    img['Ander Herrera'] = 'img/players/epl/AnderHerrera.png';
    img['Luke Shaw'] = 'img/players/epl/LukeShaw.png';
    img['Antonio Valencia'] = 'img/players/epl/AntonioValencia.png';
    img['Marouane Fellaini'] = 'img/players/epl/MarouaneFellaini.png';
    img['Morgan Schneiderlin'] = 'img/players/epl/MorganSchneiderlin.png';
    img['Bastian Schweinsteiger'] = 'img/players/epl/BastianSchweinsteiger.png';
    img['Patrick McNair'] = 'img/players/epl/PatrickMcNair.png';
    img['Jesse Lingard'] = 'img/players/epl/JesseLingard.png';
    img['Matteo Darmian'] = 'img/players/epl/MatteoDarmian.png';
    img['Andreas Pereira'] = 'img/players/epl/AndreasPereira.png';
    img['Anthony Martial'] = 'img/players/epl/AnthonyMartial.png';

    //Chelsea
    img['Pedro'] = 'img/players/epl/Pedro.png';
    img['John Obi Mikel'] = 'img/players/epl/JohnObiMikel.png';
    return img[playerName];
}

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
