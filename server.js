// server.js

// setup ===================
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');                     // log requests to the console (express4)
var bodyParser = require('body-parser');            // pull information from HTML POST (express4)
var methodOverride = require('method-override');    // simulate DELETE and PUT (express4)

// configuration =====================

// force the port
var _PORT = 8080;
(require('./config/port')).forcePort(app, _PORT);

// load the cloud foundry config
var cloudFoundryConfig = require('./config/cloudFoundry');
//console.log('cloudFoundryConfig: ' + JSON.stringify(cloudFoundryConfig));

// load the database config
var databaseConfig = require('./config/database')(cloudFoundryConfig.mongoCredentials.username,
                                                  cloudFoundryConfig.mongoCredentials.password,
                                                  cloudFoundryConfig.mongoCredentials.url);
//console.log('databaseConfig: ' + JSON.stringify(databaseConfig));

// connect to db
mongoose.connect(databaseConfig);

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// bring in the routes
require('./app/routes')(app);

app.listen(cloudFoundryConfig.appEnv.port, cloudFoundryConfig.appEnv.bind, function() {
    console.log("server starting on " + cloudFoundryConfig.appEnv.url + " !");
});
