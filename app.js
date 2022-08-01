require("dotenv").config();

const express = require("express");

const app = express();

const userRouter = require("./api/user/user.router");
const otpRouter = require("./api/otp/otp.router");
const schRouter = require("./api/scheme/scheme.router");
const cors = require('cors');


app.use(express.json());
app.use(cors());

app.use("/api/users", userRouter);
app.use("/api/otp", otpRouter);
app.use("/api/scheme", schRouter);

app.listen(process.env.APP_PORT);