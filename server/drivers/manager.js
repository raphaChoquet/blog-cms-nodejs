const mongoose = require('mongoose');
const fs = require('fs');

module.exports = function(app) {

    var models = {};

    return {
        /// FUNCTION ///
        create: function() {
            mongoose.connect('mongodb://localhost/' + app.config.database);
            var modelFiles = fs.readdirSync(app.root + '/server/models');
            modelFiles.forEach(function (model) {
                if (model.indexOf('.js') === -1) {
                    return;
                } else {
                    model = model.replace('.js', '');
                    models[model] = require(app.root + '/server/models/' + model);
                }
            });
        },

        getModel: function (modelName) {
            if (typeof models[modelName.toLowerCase()] === 'undefined') {
                throw 'Schema ' + modelName + ' not exist. Please create the schema before use.';
            }
            return models[modelName.toLowerCase()];
        }

    };
};
