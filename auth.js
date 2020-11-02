const express = require('express');
const axios = require('axios');

const route = express.Router();

const user_token = "token will be coming from the client side"
const client_secret = 'your client secret';
const app_id = 'you app id';


route.get('/', async (req, res) => {

   try {
      // to generate an App Token,
      // this is needed in order to verify user token
      const url = await axios.get(`https://graph.facebook.com/oauth/access_token?client_id=${app_id}&client_secret=${client_secret}&grant_type=client_credentials`);

   const app_token = await url.data.access_token;
   
   // verity user token, this will return a response  if everything went okay
   const inspect_token_url = await axios.get(`https://graph.facebook.com/debug_token?input_token=${user_token}&access_token=${app_token}`);
   // access data like this example
   // inspect_token_url.data.data 
   // the response will be this

//    {
//     "app_id": "your_app_id",
//     "type": "USER",
//     "application": "app_name",
//     "data_access_expires_at": life_of_token,
//     "expires_at": time_when_token_expires,
//     "is_valid": true,
//     "metadata": {
//         "auth_type": "rerequest"
//     },
//     "scopes": [
//         "email",
//         "public_profile"
//     ],
//     "user_id": "user_id"
// }

// make this request to get user profile information, you can store in database and send them to the FE if you wish
   const {data}  = await  axios({
      url: 'https://graph.facebook.com/me',
      method: 'get',
      params: {
         fields: ["email", "name", "picture", ].join(','),
         access_token: user_token
      }
   })

   res.status(200).json(data); 
   } catch (error) {
      res.status(500).json({errorMessage: error.message});
   }
  
});


module.exports = route;