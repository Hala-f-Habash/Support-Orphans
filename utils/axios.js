const axios = require('axios');

const getCoordinatesFromLocation = async (locationStr) => {
  try {
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: locationStr,
        format: 'json',
        limit: 1
      },
      headers: {
        'User-Agent': 'HopeConnectApp/1.0'
      }
    });

    if (response.data.length === 0) {
      throw new Error('Location not found');
    }

    const { lat, lon } = response.data[0];
    return {
      lat: parseFloat(lat),
      lng: parseFloat(lon)
    };
  } catch (err) {
    throw new Error('Failed to retrieve coordinates from location');
  }
};

module.exports = { getCoordinatesFromLocation };
