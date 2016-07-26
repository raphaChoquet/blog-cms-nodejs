module.exports = function (app) {
    return {
        setup: function () {
            app.server.express.get('/', homeController);
        }
    };

    function homeController(req, res) {
        var User = app.manager.getModel('User');
        User.find({}, function(err, users) {
            if (err) throw err;
            // object of all the users
            app.views.render(res, 'index', {'users': users});
        });

    }

};
