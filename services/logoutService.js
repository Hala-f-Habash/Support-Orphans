const { addToBlacklist } = require('../utils/tokenBlacklist');

exports.logoutUser = (token) => {
  addToBlacklist(token);
};
