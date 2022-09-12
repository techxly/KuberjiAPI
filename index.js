const express = require("express")
const app = express();

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

var cors = require('cors');

app.use(cors());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/', (req, res) => {
    res.json({
        message: "Welcome"
    })
})

require("./routes/user.routes")(app);
require("./routes/site.routes")(app);
require("./routes/leaves.routes")(app);
require("./routes/payroll.routes")(app);
require("./routes/holiday.routes")(app);
require("./routes/role.routes")(app);
require("./routes/module.routes")(app);
require("./routes/file.routes")(app);
require("./routes/attendance.routes")(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
    console.log(`Server is running on port: ${PORT}.`);
});