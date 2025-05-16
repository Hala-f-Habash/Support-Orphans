const axios = require('axios');

exports.validateLocation = async (rawLocation) => {
  const url = 'https://nominatim.openstreetmap.org/search';

  try {
    const res = await axios.get(url, {
      params: {
        q: rawLocation,
        format: 'json',
        limit: 1
      },
      headers: {
        'User-Agent': 'HopeConnectApp (raghadmoh.tha@gmail.com)'
      }
    });

    const data = res.data;

    if (!data.length) return null;
//the returned values , cooredinates ,fromatted address
    const location = data[0];
    return {
      formatted_address: location.display_name,
      lat: location.lat,
      lon: location.lon
    };
  } catch (err) {
    console.error('error in Location validation :', err.message);
    return null;
  }
};
