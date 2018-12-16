const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// load router files
//admin
const adminRouter = require("./router/admin/admin");
const teamRouter = require("./router/admin/teams");
const fixtureRouter = require("./router/admin/fixtures");

//user
const userRouter = require("./router/users/user");
const userTeam = require("./router/users/teams");
const userFixtures = require("./router/users/fixtures");

// connect to mongodb
mongoose.connect("mongodb://localhost/mrp", { useNewUrlParser: true });
//mongoose.connect("mongodb://charles:windscreen1@ds253353.mlab.com:53353/mrp", { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

// configure express to use bodyParser json method
app.use(bodyParser.json());

// cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === "OPTIONS"){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// let express use router
app.use(adminRouter);
app.use(teamRouter);
app.use(fixtureRouter);
app.use(userRouter);
app.use(userTeam);
app.use(userFixtures);

// error middleware
app.use((req, res, next) => {
    res.status(404).send('Api endpoint not available')
});

//error 500
app.use((err, req, res, next) => {
    console.error(err.stack)
});

// listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started, listening on PORT ${PORT}`);
});
module.exports = app;