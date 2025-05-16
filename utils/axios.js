const axios = require('axios');

const getLocationFromIP = async (req) => {
  const ip = req.ip; // or req.headers['x-forwarded-for']
  const { data } = await axios.get(`http://ip-api.com/json/${ip}`);
  return {
    lat: data.lat,
    lng: data.lon
  };
};
module.exports ={
    getLocationFromIP
}
