import _ from 'lodash';
// import Topic from '../models/topics';
import cheerio from 'cheerio';
import request from 'request';
import fs from 'fs';

/**
 * Scrape
 */
export function scrape(req, response) {
  // scrape data + add to db
    // scrape here...
    var finalUrl = 'http://thehuddle.com/stats/2016/plays_weekly.php?week=1&pos=wr&col=FPTS&ccs=1';
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
          playerObj['playerName'] = playerName;
          playerObj['rank'] = rank;
          playerObj['team'] = team;
          playerObj['targets'] = targets;
          playerObj['catches'] = catches;
          playerObj['fantasyPoints'] = fantasyPts;
          playerObj['pointsPerTarget'] = pointsPerTarget;

          objectOfPlayers[playerName] = playerObj;

          arrayOfPlayers.push(playerObj);

          finalObj['objectOfPlayers'] = objectOfPlayers;
          finalObj['arrayOfPlayers'] = arrayOfPlayers;
        });
        // console.log('finalObj - ', finalObj);
      }
      fs.writeFile('output.json', JSON.stringify(finalObj, null, 4), (error) => {
        console.log('CHECK FOR OUTPUT.JSON!!!')
      });
      return response.json(finalObj);
    });
}


/**
 * Add a Topic
 */
export function add(req, res) {
  Topic.create(req.body, (err) => {
    if (err) {
      console.log(err);
      return res.status(400).send(err);
    }

    return res.status(200).send('OK');
  });
}


export default {
  scrape
};
