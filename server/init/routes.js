/**
 * Routes for express app
 */
import passport from 'passport';
import unsupportedMessage from '../db/unsupportedMessage';
import { controllers, passport as passportConfig } from '../db';
// import cheerio from 'cheerio';
// import request from 'request';
// import fs from 'fs';

const usersController = controllers && controllers.users;
const topicsController = controllers && controllers.topics;
const scrapeController = controllers && controllers.scrape;

export default (app) => {
  app.get('/scrape', scrapeController.scrape);
  // app.get('/scrape', (req, res) => {
    // // scrape here...
    // var finalUrl = 'http://thehuddle.com/stats/2016/plays_weekly.php?week=1&pos=qb&col=FPTS&ccs=1';
		// var options = {
		// 	url: finalUrl,
		// 	headers: {
		// 		'Origin': 'http://thehuddle.com'
		// 	}
		// };
    // var finalObj = {};

    // request(options, (err, res, html) => {
    //   if (!err) {
    //     var $ = cheerio.load(html);
    //     var arrayOfPlayers = [];
    //     var objectOfPlayers = {};

    //     $('div.mod-table > table > tbody > tr').each(function( index ) {
    //       var player = $(this).find('td.t_std_left.align-left > a').text().trim();
          
    //       var children = $(this).children();
    //       var rank = parseInt(index) + 1;
    //       var playerName = children.find('a').text().trim();
    //       var team = children.eq(1).text().trim();
    //       var targets = parseInt(children.eq(7).text().trim());
    //       var catches = parseInt(children.eq(8).text().trim());
    //       var fantasyPts = parseInt(children.eq(3).text().trim());
    //       var pointsPerTarget = (fantasyPts / targets);
          
    //       var playerObj = {};
    //       playerObj['playerName'] = playerName;
    //       playerObj['rank'] = rank;
    //       playerObj['team'] = team;
    //       playerObj['targets'] = targets;
    //       playerObj['catches'] = catches;
    //       playerObj['fantasyPoints'] = fantasyPts;
    //       playerObj['pointsPerTarget'] = pointsPerTarget;

    //       objectOfPlayers[playerName] = playerObj;

    //       arrayOfPlayers.push(playerObj);

    //       finalObj['objectOfPlayers'] = objectOfPlayers;
    //       finalObj['arrayOfPlayers'] = arrayOfPlayers;
    //     });
    //     // console.log('finalObj - ', finalObj);
    //   }
    // });
    // fs.writeFile('output.json', JSON.stringify(finalObj, null, 4), (err) => {
    //   console.log('CHECK FOR OUTPUT.JSON!!!')
    // });
  // });
  
  // user routes
  if (usersController) {
    app.post('/login', usersController.login);
    app.post('/signup', usersController.signUp);
    app.post('/logout', usersController.logout);
  } else {
    console.warn(unsupportedMessage('users routes'));
  }

  if (passportConfig && passportConfig.google) {
    // google auth
    // Redirect the user to Google for authentication. When complete, Google
    // will redirect the user back to the application at
    // /auth/google/return
    // Authentication with google requires an additional scope param, for more info go
    // here https://developers.google.com/identity/protocols/OpenIDConnect#scope-param
    app.get('/auth/google', passport.authenticate('google', {
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ]
    }));

    // Google will redirect the user to this URL after authentication. Finish the
    // process by verifying the assertion. If valid, the user will be logged in.
    // Otherwise, the authentication has failed.
    app.get('/auth/google/callback',
      passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/login'
      })
    );
  }

  // topic routes
  if (topicsController) {
    app.get('/topic', topicsController.all);
    app.post('/topic/:id', topicsController.add);
    app.put('/topic/:id', topicsController.update);
    app.delete('/topic/:id', topicsController.remove);
  } else {
    console.warn(unsupportedMessage('topics routes'));
  }


};
