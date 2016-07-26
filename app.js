const config = require('config');

var app = {
    root: __dirname,
    config: config
};

app.server = require('./server/drivers/server')(app);
app.views = require('./server/drivers/views')(app);
app.manager = require('./server/drivers/manager')(app);
app.routes = require('./server/drivers/routes')(app);


app.server.create();
