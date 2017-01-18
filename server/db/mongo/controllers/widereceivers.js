import _ from 'lodash';
// import Topic from '../models/topics';
import cheerio from 'cheerio';
import request from 'request';
import fs from 'fs';

/**
 * Scrape WRs week 1
 */
export function week1(req, response) {
  // scrape data + add to db
    // scrape here...
  var finalUrl = 'http://thehuddle.com/stats/2016/plays_weekly.php?week=1&pos=wr&col=FPTS&ccs=6';
  var options = {
    url: finalUrl,
    headers: {
      'Origin': 'http://thehuddle.com'
    }
  };
  var finalObj = {};

  request(options, (err, res, html) => {
    if (!err) {
      var $ = cheerio.load(html);
      var arrayOfPlayers = [];
      var objectOfPlayers = {};

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
        objectOfPlayers[playerName] = playerObj;

        // organized by weekly rank
        arrayOfPlayers.push(playerObj);

        finalObj['objectOfPlayers'] = objectOfPlayers;
        finalObj['arrayOfPlayers'] = arrayOfPlayers;
      });
      // console.log('finalObj - ', finalObj);
    }
    return response.json(finalObj);
  });
}

/**
 * Scrape WRs 2016 Season
 */
export function season2016(req, response) {
  // scrape data + add to db
    // scrape here...
  var finalUrl = 'http://thehuddle.com/stats/2016/plays_std.php?ccs=6&pos=wr';
  var options = {
    url: finalUrl,
    headers: {
      'Origin': 'http://thehuddle.com'
    }
  };
  var finalObj = {};

  request(options, (err, res, html) => {
    if (!err) {
      var $ = cheerio.load(html);
      var arrayOfPlayers = [];
      var objectOfPlayers = {};

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

        objectOfPlayers[playerName] = playerObj;

        arrayOfPlayers.push(playerObj);

        finalObj['objectOfPlayers'] = objectOfPlayers;
        finalObj['arrayOfPlayers'] = arrayOfPlayers;
      });
      // console.log('finalObj - ', finalObj);
    }
    return response.json(finalObj);
  });
}

export default {
  week1,
  season2016
};
