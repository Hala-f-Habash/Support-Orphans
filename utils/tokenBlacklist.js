const blacklist = new Set();  //  Memory stored revoked tokens

exports.addToBlacklist = (token) => {
  blacklist.add(token);       
};

exports.isBlacklisted = (token) => {
  return blacklist.has(token); 
};
