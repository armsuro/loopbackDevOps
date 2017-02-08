'use strict';

module.exports = function(server) {
    // Install a `/` route that returns server status
    var router = server.loopback.Router();
    var shell = require('shelljs');
    router.get('/', server.loopback.status());

    router.get('/ping', function(req, res) {
        shell.exec("cd /var/www/html && mkdir testttt", {
            silent: true,
            async: true
        });
    });
    server.use(router);
};