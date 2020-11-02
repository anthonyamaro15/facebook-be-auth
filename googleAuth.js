const express = require('express');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client('your google client id');

const route = express.Router();

const client_id = 'your google client id'
const id_token = "id token will be coming from client after giving access"

route.get('/', async(req, res) => {

      const ticket = await client.verifyIdToken({
         idToken: id_token,
         audience: client_id
      });

      const payload = await ticket.getPayload();
      res.status(200).json(payload);

      // Warning: Once you get these claims, you still need to check that the aud claim 
      // contains one of your app's client IDs. If it does, then the token is both valid and intended for your client,
      // and you can safely retrieve and use the user's unique Google ID from the sub claim.

      // here is the example response
//       {
//     "iss": "example.google.com",
//     "azp": "your client id",
//     "aud": "your cliend id",
//     "sub": "users unique id",
//     "email": "user email",
//     "email_verified": true,
//     "at_hash": "hash",
//     "name": "user name",
//     "picture": "user profile img",
//     "given_name": "name",
//     "family_name": "last name",
//     "locale": "en",
//     "iat": token ifo,
//     "exp": token life,
//     "jti": "not sure about this"
//   }
})


module.exports = route;