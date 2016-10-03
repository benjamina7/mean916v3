// config/cloudFoundry.js

var _cfenv = require("cfenv");

// pull environment variables from cf user  defined service
var _appEnv = _cfenv.getAppEnv();
//console.log(JSON.stringify(appEnv));
//console.log('process.env.MyEnvironmentVariable1 : ' + process.env.MyEnvironmentVariable1);

var _mongoCredentials = _appEnv.getServiceCreds('mongolab1');
//console.log('getServiceCreds: ' + JSON.stringify(mongoCredentials));

module.exports = {
    appEnv : _appEnv,
    mongoCredentials : _mongoCredentials
};