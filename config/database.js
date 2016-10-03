// config/database.js

module.exports = {
    url : 'mongodb://{{mongoCredentials.username}}:{{mongoCredentials.password}}@{{mongoCredentials.url}}'
};