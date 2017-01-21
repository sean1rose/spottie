import cheerio from 'cheerio';
import request from 'request';
import fs from 'fs';

/**
 * Scrape WRs week 1
 */
const week1 = (req, response) => {
  extractWeek(1, response);
}
const week2 = (req, response) => {
  extractWeek(2, response);
}
const week3 = (req, response) => {
  extractWeek(3, response);
}
const week4 = (req, response) => {
  extractWeek(4, response);
}
const week5 = (req, response) => {
  extractWeek(5, response);
}
const week6 = (req, response) => {
  extractWeek(6, response);
}
const week7 = (req, response) => {
  extractWeek(7, response);
}
const week8 = (req, response) => {
  extractWeek(8, response);
}
const week9 = (req, response) => {
  extractWeek(9, response);
}
const week10 = (req, response) => {
  extractWeek(10, response);
}
const week11 = (req, response) => {
  extractWeek(11, response);
}
const week12 = (req, response) => {
  extractWeek(12, response);
}
const week13 = (req, response) => {
  extractWeek(13, response);
}
const week14 = (req, response) => {
  extractWeek(14, response);
}
const week15 = (req, response) => {
  extractWeek(15, response);
}
const week16 = (req, response) => {
  extractWeek(16, response);
}

const extractWeek = (weekNumber, response) => {
  var finalUrl = `http://thehuddle.com/stats/2016/plays_weekly.php?week=${weekNumber}&pos=wr&col=FPTS&ccs=6`;
  var options = {
    url: finalUrl,
    headers: {
      'Origin': 'http://thehuddle.com'
    }
  };
  var finalWrObj = {};

  request(options, (err, res, html) => {
    if (!err) {
      var $ = cheerio.load(html);
      var wrArray = [];
      var wrObject = {};

      $('div.mod-table > table > tbody > tr').each(function( index ) {
        var player = $(this).find('td.t_std_left.align-left > a').text().trim();
        
        var children = $(this).children();
        var rank = parseInt(index) + 1;
        var playerName = children.find('a').text().trim();
        var team = children.eq(1).text().trim();
        var targets = parseInt(children.eq(7).text().trim());
        var catches = parseInt(children.eq(8).text().trim());
        var fantasyPts = parseInt(children.eq(3).text().trim());
        var pointsPerTarget = (fantasyPts / targets);
        
        var playerObj = {};
        playerObj['rank'] = rank;
        playerObj['playerName'] = playerName;
        playerObj['team'] = team;
        playerObj['targets'] = targets;
        playerObj['catches'] = catches;
        playerObj['fantasyPoints'] = fantasyPts;
        playerObj['pointsPerTarget'] = pointsPerTarget;

        // can look up alphabetically
        wrObject[playerName] = playerObj;

        // organized by weekly rank
        wrArray.push(playerObj);

        finalWrObj['wrObject'] = wrObject;
        finalWrObj['wrArray'] = wrArray;
      });

      // console.log('finalRbObj_week1 - ', finalRbObj_week1);
    }
    return response.json(finalWrObj);
  });
}


/**
 * Scrape WRs 2016 Season
 */
const season2016 = (req, response) => {
  extractSeason(2016, response);
}

const season2015 = (req, response) => {
  extractSeason(2015, response);
}
const season2014 = (req, response) => {
  extractSeason(2014, response);
}
// base season extract function
const extractSeason = (seasonNumber, response) => {
  // scrape data + add to db
    // scrape here...
  var finalUrl = `http://thehuddle.com/stats/${seasonNumber}/plays_std.php?ccs=6&pos=wr`;
  var options = {
    url: finalUrl,
    headers: {
      'Origin': 'http://thehuddle.com'
    }
  };
  var finalWrObj = {};

  request(options, (err, res, html) => {
    if (!err) {
      var $ = cheerio.load(html);
      var wrArray = [];
      var wrObject = {};

      $('div.mod-table > table > tbody > tr').each(function( index ) {
        var player = $(this).find('td.t_std_left.align-left > a').text().trim();
        
        var children = $(this).children();
        var rank = parseInt(index) + 1;
        var playerName = children.find('a').text().trim();
        var team = children.eq(1).text().trim();
        var targets = parseInt(children.eq(9).text().trim());
        var catches = parseInt(children.eq(10).text().trim());
        var fantasyPts = parseInt(children.eq(3).text().trim());
        var fantasyPtsPerGame = parseInt(children.eq(5).text().trim());
        var tds = parseInt(children.eq(12).text().trim());
        var receivingYards = parseInt(children.eq(11).text().trim());
        var pointsPerTarget = (fantasyPts / targets);
        
        var playerObj = {};
        playerObj['playerName'] = playerName;
        playerObj['rank'] = rank;
        playerObj['team'] = team;
        playerObj['targets'] = targets;
        playerObj['catches'] = catches;
        playerObj['fantasyPoints'] = fantasyPts;
        playerObj['fantasyPtsPerGame'] = fantasyPtsPerGame;
        playerObj['tds'] = tds;
        playerObj['receivingYards'] = receivingYards;
        playerObj['pointsPerTarget'] = pointsPerTarget;

        wrObject[playerName] = playerObj;

        wrArray.push(playerObj);

        finalWrObj['wrObject'] = wrObject;
        finalWrObj['wrArray'] = wrArray;
      });
      // console.log('finalRbObj - ', finalRbObj);
    }
    return response.json(finalWrObj);
  });
};

export default {
  week1,
  week2,
  week3,
  week4,
  week5,
  week6,
  week7,
  week8,
  week9,
  week10,
  week11,
  week12,
  week13,
  week14,
  week15,
  week16,
  season2014,
  season2015,
  season2016
};
