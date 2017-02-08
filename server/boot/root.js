'use strict';

module.exports = function(server) {
    // Install a `/` route that returns server status
    var router = server.loopback.Router();
    var shell = require('shelljs');
    router.get('/', server.loopback.status());
    var homePath = "/home/vartan"

    var pullScript = function(progectName) {
        shell.exec("cd " + homePath + " && bash pull.sh " + progectName, {
            silent: true,
            async: true
        }, function(done) {
            shell.exec("cd " + homePath + "/" + progectName + " && docker exec api /app/node_modules/.bin/pm2 restart all", {
                silent: true,
                async: true
            }, function(done) {
                return true
            });
        });
    }

    router.post('/pull', function(req, res) {
        if (req.body.progect) {
            pullScript(req.body.progect)
            res.json({
                success: true
            })
        } else {
            res.json({
                "success": false,
                "message": "Parametrs Incorect"
            })
        }
    });

    router.post('/pullAll', function(req, res) {
        shell.exec("cd " + homePath + " && bash pull.sh all", {
            silent: true,
            async: true
        }, function(done) {
            shell.exec("cd " + homePath + "/dataowl && docker exec api /app/node_modules/.bin/pm2 restart all && cd " + homePath + "/oxford && docker exec api /app/node_modules/.bin/pm2 restart all && cd " + homePath + "/envi && docker exec api /app/node_modules/.bin/pm2 restart all && cd " + homePath + "/thegood && docker exec api /app/node_modules/.bin/pm2 restart all", {
                silent: true,
                async: true
            }, function(done) {
                res.json({
                    success: true
                })
            });
        });
    });
    server.use(router);
};