var _forcePort = function(app, port) {
    // force the port
    //var _PORT = 8080;
    if (process == undefined)
        process = new process();
    if (process.env == undefined)
        process.env = {};
    process.env.PORT = port;
    app.set('port', port);
}

module.exports = {
    forcePort : _forcePort
};