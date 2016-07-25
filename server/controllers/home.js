module.exports = function (app) {
    return {
        setup: function () {
            app.server.express.get('/', homeController);
        }
    };

    function homeController(req, res) {
        app.views.render(res, 'index');
    }

};
