const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');

module.exports = function(app) {

    return {
        instance: null,
        express: null,
        port: null,

        /// FUNCTION ///
        create: function() {
            this.express = express();
            this.port = process.env.PORT || 8080;
            this.express.use(bodyParser.urlencoded({ extended: true }));
            this.express.use(bodyParser.json());
            this.instance = http.Server(this.express);
            app.views.setup();
            app.routes.create();
            this.listen();
        },

        listen: function() {
            this.instance.listen(this.port, function() {
                console.log('Server listening on *:' + this.port);
            });
        }
    };
};
