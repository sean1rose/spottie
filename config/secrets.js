/** Important **/
/** You should not be committing this file to GitHub **/
/** Repeat: DO! NOT! COMMIT! THIS! FILE! TO! YOUR! REPO! **/
export const sessionSecret = process.env.SESSION_SECRET || 'Your Session Secret goes here';
export const google = {
  clientID: process.env.GOOGLE_CLIENTID || '962648543980-iq0lfk5jn32s408m0an3fvl6vlt0okmn.apps.googleusercontent.com',
  clientSecret: process.env.GOOGLE_SECRET || 'sGG2SRZYgX4cFLH2c7h1mpau',
  callbackURL: process.env.GOOGLE_CALLBACK || '/auth/google/callback'
};

