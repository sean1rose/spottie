import _ from 'lodash';
// import Topic from '../models/topics';
import cheerio from 'cheerio';
import request from 'request';
import fs from 'fs';

/**
 * Scrape RB's weeks 1-16
 */
export const week1 = (req, response) => {
  extractWeek(1, response);
}
// export function week1(req, response) {
//   extractWeek(1);
// }
export function week2(req, response) {
  extractWeek(2, response);
}
export function week3(req, response) {
  extractWeek(3);
}
export function week4(req, response) {
  extractWeek(4);
}
export function week5(req, response) {
  extractWeek(5);
}
export function week6(req, response) {
  extractWeek(6);
}
export function week7(req, response) {
  extractWeek(7);
}
export function week8(req, response) {
  extractWeek(8);
}
export function week9(req, response) {
  extractWeek(9);
}
export function week10(req, response) {
  extractWeek(10);
}
export function week11(req, response) {
  extractWeek(11);
}
export function week12(req, response) {
  extractWeek(12);
}
export function week13(req, response) {
  extractWeek(13);
}
export function week14(req, response) {
  extractWeek(14);
}
export function week15(req, response) {
  extractWeek(15);
}
export function week16(req, response) {
  extractWeek(16);
}

// weekly base function...
const extractWeek = (weekNumber, response) => {
  var finalUrl = `http://thehuddle.com/stats/2016/plays_weekly.php?week=${weekNumber}&pos=rb&col=FPTS&ccs=6`;
  var options = {
    url: finalUrl,
    headers: {
      'Origin': 'http://thehuddle.com'
    }
  };
  var finalRbObj = {};

  request(options, (err, res, html) => {
    if (!err) {
      var $ = cheerio.load(html);
      var rbArray = [];
      var rbObject = {};

			$('div.mod-table > table > tbody > tr').each(function( index ) {
				var player = $(this).find('td.t_std_left.align-left > a').text().trim();
				var children = $(this).children();
				var rank = parseInt(index) + 1;
				var playerName = children.find('a').text().trim();
				var team = children.eq(1).text().trim();

				var touches = parseInt(children.eq(2).text().trim());
				var carries = parseInt(children.eq(4).text().trim());
        var rushingYards = parseInt(children.eq(5).text().trim());
        var rushingTouchdowns = parseInt(children.eq(6).text().trim());
				var catches = parseInt(children.eq(8).text().trim());
        var receivingYards = parseInt(children.eq(9).text().trim());
        var receivingTouchdowns = parseInt(children.eq(10).text().trim());
        var totalTouchdowns = rushingTouchdowns + receivingTouchdowns;
        var fumbles = parseInt(children.eq(11).text().trim());
				
				var fantasyPts = parseInt(children.eq(3).text().trim());
				var pointsPerTouch = (fantasyPts / touches);

				var playerObj = {};
				playerObj['rank'] = rank;
				playerObj['playerName'] = playerName;
				playerObj['team'] = team;
				playerObj['touches'] = touches;
				playerObj['carries'] = carries;
        playerObj['rushingYards'] = rushingYards;
				playerObj['catches'] = catches;
        playerObj['receivingYards'] = receivingYards;
        playerObj['receivingTouchdowns'] = receivingTouchdowns;
        playerObj['totalTouchdowns'] = totalTouchdowns;
        playerObj['fumbles'] = fumbles;
				playerObj['fantasyPoints'] = fantasyPts;
				playerObj['pointsPerTouch'] = pointsPerTouch;

        // can look up by name
				rbObject[playerName] = playerObj;

        // organized by weekly rank
				rbArray.push(playerObj);

				finalRbObj['rbObject'] = rbObject;
				finalRbObj['rbArray'] = rbArray;
			});

      // console.log('finalRbObj_week1 - ', finalRbObj_week1);
    }
    return response.json(finalRbObj);
  });
}



/*
export function week1(req, response) {
  // scrape data + add to db
    // scrape here...
  var finalUrl = 'http://thehuddle.com/stats/2016/plays_weekly.php?week=1&pos=rb&col=FPTS&ccs=6';
  var options = {
    url: finalUrl,
    headers: {
      'Origin': 'http://thehuddle.com'
    }
  };
  var finalRbObj_week1 = {};

  request(options, (err, res, html) => {
    if (!err) {
      var $ = cheerio.load(html);
      var rbArray = [];
      var rbObject = {};

			$('div.mod-table > table > tbody > tr').each(function( index ) {
				var player = $(this).find('td.t_std_left.align-left > a').text().trim();
				var children = $(this).children();
				var rank = parseInt(index) + 1;
				var playerName = children.find('a').text().trim();
				var team = children.eq(1).text().trim();

				var touches = parseInt(children.eq(2).text().trim());
				var carries = parseInt(children.eq(4).text().trim());
        var rushingYards = parseInt(children.eq(5).text().trim());
        var rushingTouchdowns = parseInt(children.eq(6).text().trim());
				var catches = parseInt(children.eq(8).text().trim());
        var receivingYards = parseInt(children.eq(9).text().trim());
        var receivingTouchdowns = parseInt(children.eq(10).text().trim());
        var totalTouchdowns = rushingTouchdowns + receivingTouchdowns;
        var fumbles = parseInt(children.eq(11).text().trim());
				
				var fantasyPts = parseInt(children.eq(3).text().trim());
				var pointsPerTouch = (fantasyPts / touches);

				var playerObj = {};
				playerObj['rank'] = rank;
				playerObj['playerName'] = playerName;
				playerObj['team'] = team;
				playerObj['touches'] = touches;
				playerObj['carries'] = carries;
        playerObj['rushingYards'] = rushingYards;
				playerObj['catches'] = catches;
        playerObj['receivingYards'] = receivingYards;
        playerObj['receivingTouchdowns'] = receivingTouchdowns;
        playerObj['totalTouchdowns'] = totalTouchdowns;
        playerObj['fumbles'] = fumbles;
				playerObj['fantasyPoints'] = fantasyPts;
				playerObj['pointsPerTouch'] = pointsPerTouch;

        // can look up by name
				rbObject[playerName] = playerObj;

        // organized by weekly rank
				rbArray.push(playerObj);

				finalRbObj_week1['rbObject'] = rbObject;
				finalRbObj_week1['rbArray'] = rbArray;
			});

      // console.log('finalRbObj_week1 - ', finalRbObj_week1);
    }
    return response.json(finalRbObj_week1);
  });
}
*/

/**
 * Scrape RB's for 2016 Season
 */
export const season2016 = (req, response) => {
  extractWeek(2016, response);
}
// export function season2016(req, response) {
//   extractWeek(2016);
// }
export function season2015(req, response) {
  extractWeek(2015);
}
export function season2014(req, response) {
  extractWeek(2014);
}

// base season extract function
const extractSeason = (seasonNumber) => {
  // scrape data + add to db
    // scrape here...
  var finalUrl = `http://thehuddle.com/stats/${seasonNumber}/plays_std.php?ccs=6&pos=rb`
  var options = {
    url: finalUrl,
    headers: {
      'Origin': 'http://thehuddle.com'
    }
  };
  var finalRbObj = {};

  request(options, (err, res, html) => {
    if (!err) {
      var $ = cheerio.load(html);
      var rbArray = [];
      var rbObject = {};

      $('div.mod-table > table > tbody > tr').each(function( index ) {
        var player = $(this).find('td.t_std_left.align-left > a').text().trim();
        
        var children = $(this).children();
        var rank = parseInt(index) + 1;
        var playerName = children.find('a').text().trim();
        var team = children.eq(1).text().trim();
        var touches = parseInt(children.eq(2).text().trim());
        var fantasyPts = parseInt(children.eq(3).text().trim());
        var games = parseInt(children.eq(4).text().trim());
        var fantasyPtsPerGame = parseInt(children.eq(5).text().trim());
        var carries = parseInt(children.eq(6).text().trim());
        var rushingYards = parseInt(children.eq(7).text().trim());
        var rushingTds = parseInt(children.eq(8).text().trim());
        var targets = parseInt(children.eq(9).text().trim());
        var catches = parseInt(children.eq(10).text().trim());
        var receivingYards = parseInt(children.eq(11).text().trim());
        var receivingTds = parseInt(children.eq(12).text().trim());
        var fumbles = parseInt(children.eq(13).text().trim());
        var pointsPerTouch = (fantasyPts / touches);
        
        var playerObj = {};
        playerObj['rank'] = rank;
        playerObj['playerName'] = playerName;
        playerObj['team'] = team;
        playerObj['touches'] = touches;
        playerObj['fantasyPoints'] = fantasyPts;
        playerObj['games'] = games;
        playerObj['fantasyPtsPerGame'] = fantasyPtsPerGame;
        playerObj['carries'] = carries;
        playerObj['rushingYards'] = rushingYards;
        playerObj['targets'] = targets;
        playerObj['catches'] = catches;
        playerObj['receivingYards'] = receivingYards;
        playerObj['receivingTds'] = receivingTds;
        playerObj['fumbles'] = fumbles;
        playerObj['pointsPerTouch'] = pointsPerTouch;

        rbObject[playerName] = playerObj;

        rbArray.push(playerObj);

        finalRbObj['rbObject'] = rbObject;
        finalRbObj['rbArray'] = rbArray;
      });
      // console.log('finalRbObj - ', finalRbObj);
    }
    return response.json(finalRbObj);
  });

}


/*
export function season2016(req, response) {
  // scrape data + add to db
    // scrape here...
  var finalUrl = 'http://thehuddle.com/stats/2016/plays_std.php?ccs=6&pos=rb';
  var options = {
    url: finalUrl,
    headers: {
      'Origin': 'http://thehuddle.com'
    }
  };
  var finalRbObj = {};

  request(options, (err, res, html) => {
    if (!err) {
      var $ = cheerio.load(html);
      var rbArray = [];
      var rbObject = {};

      $('div.mod-table > table > tbody > tr').each(function( index ) {
        var player = $(this).find('td.t_std_left.align-left > a').text().trim();
        
        var children = $(this).children();
        var rank = parseInt(index) + 1;
        var playerName = children.find('a').text().trim();
        var team = children.eq(1).text().trim();
        var touches = parseInt(children.eq(2).text().trim());
        var fantasyPts = parseInt(children.eq(3).text().trim());
        var games = parseInt(children.eq(4).text().trim());
        var fantasyPtsPerGame = parseInt(children.eq(5).text().trim());
        var carries = parseInt(children.eq(6).text().trim());
        var rushingYards = parseInt(children.eq(7).text().trim());
        var rushingTds = parseInt(children.eq(8).text().trim());
        var targets = parseInt(children.eq(9).text().trim());
        var catches = parseInt(children.eq(10).text().trim());
        var receivingYards = parseInt(children.eq(11).text().trim());
        var receivingTds = parseInt(children.eq(12).text().trim());
        var fumbles = parseInt(children.eq(13).text().trim());
        var pointsPerTouch = (fantasyPts / touches);
        
        var playerObj = {};
        playerObj['rank'] = rank;
        playerObj['playerName'] = playerName;
        playerObj['team'] = team;
        playerObj['touches'] = touches;
        playerObj['fantasyPoints'] = fantasyPts;
        playerObj['games'] = games;
        playerObj['fantasyPtsPerGame'] = fantasyPtsPerGame;
        playerObj['carries'] = carries;
        playerObj['rushingYards'] = rushingYards;
        playerObj['targets'] = targets;
        playerObj['catches'] = catches;
        playerObj['receivingYards'] = receivingYards;
        playerObj['receivingTds'] = receivingTds;
        playerObj['fumbles'] = fumbles;
        playerObj['pointsPerTouch'] = pointsPerTouch;

        rbObject[playerName] = playerObj;

        rbArray.push(playerObj);

        finalRbObj_2016season['rbObject'] = rbObject;
        finalRbObj_2016season['rbArray'] = rbArray;
      });
      // console.log('finalRbObj_2016season - ', finalRbObj_2016season);
    }
    return response.json(finalRbObj_2016season);
  });
}
*/

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
  season2016,
  season2015,
  season2014
};
