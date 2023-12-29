const axios = require('axios');

const clientId = '87887eb441ed3f2'; // Replace with your Imgur Client ID
const clientSecret = '9c50ecfaa13c2c6e1467eaaccb39d2c07872d3a6'; // Replace with your Imgur Client Secret
const imageId = 'yE6WZR0'; // Replace with a valid Imgur image ID

// Exchange client ID and secret for an access token
axios
  .post('https://api.imgur.com/oauth2/token', {
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: 'client_credentials',
  })
  .then(response => {
    const accessToken = response.data.access_token;

    // Use the access token to make a request to the Imgur API
    axios
      .get(`https://api.imgur.com/3/image/${imageId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(response => {
        console.log('Image Info:', response.data.data);
      })
      .catch(error => {
        console.error('Error fetching image info:', error.response.data);
      });
  })
  .catch(error => {
    console.error('Error getting access token:', error.response.data);
  });
