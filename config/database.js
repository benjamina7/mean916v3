// config/database.js

module.exports = function(username, password, url) {
    var urlCredentialed = 'mongodb://' + username + ':' + password + '@' + url;
    return urlCredentialed;
};