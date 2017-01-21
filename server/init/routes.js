/**
 * Routes for express app
 */
import passport from 'passport';
import unsupportedMessage from '../db/unsupportedMessage';
import { controllers, passport as passportConfig } from '../db';

const usersController = controllers && controllers.users;
const topicsController = controllers && controllers.topics;
const widereceiversController = controllers && controllers.widereceivers;
const runningbacksController = controllers && controllers.runningbacks;

export default (app) => {
  app.get('/wrweek1', widereceiversController.week1);
  app.get('/wrweek2', widereceiversController.week2);
  app.get('/wrweek3', widereceiversController.week3);
  app.get('/wrweek4', widereceiversController.week4);
  app.get('/wrweek5', widereceiversController.week5);
  app.get('/wrweek6', widereceiversController.week6);
  app.get('/wrweek7', widereceiversController.week7);
  app.get('/wrweek8', widereceiversController.week8);
  app.get('/wrweek9', widereceiversController.week9);
  app.get('/wrweek10', widereceiversController.week10);
  app.get('/wrweek11', widereceiversController.week11);
  app.get('/wrweek12', widereceiversController.week12);
  app.get('/wrweek13', widereceiversController.week13);
  app.get('/wrweek14', widereceiversController.week14);
  app.get('/wrweek15', widereceiversController.week15);
  app.get('/wrweek16', widereceiversController.week16);
  app.get('/wrseason2014', widereceiversController.season2016);
  app.get('/wrseason2015', widereceiversController.season2016);
  app.get('/wrseason2016', widereceiversController.season2016);
  app.get('/rbweek1', runningbacksController.week1);
  app.get('/rbweek2', runningbacksController.week2);
  app.get('/rbweek3', runningbacksController.week3);
  app.get('/rbweek4', runningbacksController.week4);
  app.get('/rbweek5', runningbacksController.week5);
  app.get('/rbweek6', runningbacksController.week6);
  app.get('/rbweek7', runningbacksController.week7);
  app.get('/rbweek8', runningbacksController.week8);
  app.get('/rbweek9', runningbacksController.week9);
  app.get('/rbweek10', runningbacksController.week10);
  app.get('/rbweek11', runningbacksController.week11);
  app.get('/rbweek12', runningbacksController.week12);
  app.get('/rbweek13', runningbacksController.week13);
  app.get('/rbweek14', runningbacksController.week14);
  app.get('/rbweek15', runningbacksController.week15);
  app.get('/rbweek16', runningbacksController.week16);
  app.get('/rbseason2014', runningbacksController.season2016);
  app.get('/rbseason2015', runningbacksController.season2016);
  app.get('/rbseason2016', runningbacksController.season2016);

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
