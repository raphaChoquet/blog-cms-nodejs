const exphbs = require('express-handlebars');

module.exports = function (app) {
    return {
        setup: function () {
            app.server.express.engine('.hbs', exphbs({
                extname: '.hbs',
                layoutsDir: 'public/views/layouts/',
                partialsDir: 'public/views/partials/'
            }));
            app.server.express.set('view engine', '.hbs');
        },
        render: function (res, name, tpl = 'hbs') {
            if (tpl === 'hbs') {
                res.render(name);
            } else if (tpl === 'html') {
                this.renderHTML(res, name);
            }

        },
        renderHTML: function (res, name) {
            res.sendFile(app.root + '/public/views/html/' + name + '.html');
        }
    };
};
