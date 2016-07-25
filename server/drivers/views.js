const exphbs = require('express-handlebars');

module.exports = function (app) {
    return {
        setup: function () {
            app.server.express.set('views', 'public/views/hbs/');
            app.server.express.engine('.hbs', exphbs({
                extname: '.hbs',
                layoutsDir: 'public/views/hbs/layouts/',
                partialsDir: 'public/views/hbs/partials/'
            }));
            app.server.express.set('view engine', '.hbs');
        },
        render: function (res, name, data) {
            res.render(name, data);
        },
        renderHTML: function (res, name) {
            res.sendFile(app.root + '/public/views/html/' + name + '.html');
        }
    };
};
