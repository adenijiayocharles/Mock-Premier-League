const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// configure express to use bodyParser json method
app.use(bodyParser.json());

// listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started, listening on PORT ${PORT}`);
});