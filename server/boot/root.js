'use strict';

module.exports = function(server) {
    // Install a `/` route that returns server status
    var router = server.loopback.Router();
    var shell = require('shelljs');
    router.get('/', server.loopback.status());
    var homePath = "/home/vartan"

    var pullScript = function(progectName, folderName) {
        var script = "docker exec " + progectName + "_api_1 /app/node_modules/.bin/pm2 restart all"
        if (progectName == "all") {
            script = "docker exec dataowl_api_1 /app/node_modules/.bin/pm2 restart all && docker exec oxford_api_1 /app/node_modules/.bin/pm2 restart all && docker exec envi_api_1 /app/node_modules/.bin/pm2 restart all && docker exec thegood_api_1 /app/node_modules/.bin/pm2 restart all";
        }
        if (folderName) {
            var project = "cd " + homePath + " && bash pull.sh " + progectName;
        } else {
            var project = "cd " + homePath + " && bash pull.sh " + progectName + " " + folderName;
        }
        shell.exec(project, {
            silent: true,
            async: true
        }, function(done) {
            shell.exec(script, {
                silent: true,
                async: true
            }, function(done) {
                return true
            });
        });
    }

    router.post('/pull', function(req, res) {
        if (req.body.project) {
            pullScript(req.body.project)
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

    router.post('/pullProject', function(req, res) {
        if (req.body.projectName && req.body.folderName) {
            pullScript(req.body.projectName, req.body.folderName)
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

    server.use(router);
};