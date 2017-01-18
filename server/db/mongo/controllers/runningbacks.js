import _ from 'lodash';
// import Topic from '../models/topics';
import cheerio from 'cheerio';
import request from 'request';
import fs from 'fs';

/**
 * Scrape RB's week 1
 */
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

/**
 * Scrape RB's for 2016 Season
 */
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
  var finalRbObj_2016season = {};

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

export default {
  week1,
  season2016
};
