const express = require('express');
const fs = require('fs');

module.exports = function (app) {

    return {
        create: function ()  {
            app.server.express.use('/', express.static(app.root + '/public'));
            var controllerFiles = fs.readdirSync(app.root + '/server/controllers');
            controllerFiles.forEach(function (controllerFile) {
                if (controllerFile.indexOf('.js') === -1) {
                    return;
                } else {
                    controllerFile = controllerFile.replace('.js', '');
                    var controller = require(app.root + '/server/controllers/' + controllerFile)(app);
                    controller.setup();
                }
            });

            fs.readFile(app.root + '/config/routes.static.json', 'utf8', function (err, data) {
                if (err) throw err;
                var routes = JSON.parse(data);

                for (var i = 0; i < routes.length; i++) {
                    var _r = routes[i];
                    app.server.express.use(_r.path, express.static(app.root + '/' + _r.folder));
                }
            });
        }
    };
};
