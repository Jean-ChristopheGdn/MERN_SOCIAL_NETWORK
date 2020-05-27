const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const dotenv = require("dotenv");
const cors = require('cors');
const mongoose = require("mongoose");

dotenv.config();

//DB

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true  })
.then(() => console.log('DB connected !'))

mongoose.connection.on("error", err =>{
    console.log(`DB connection error: ${err.message}`)
})

// Amène les Routes

const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

// middlewares

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());
app.use("/", postRoutes);
app.use("/", authRoutes);
app.use("/", userRoutes);

app.use(function (err, req, res, next) {           
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({error: "Accès non autorisé"});
    }
  });

app.get("/");
const port = process.env.PORT || 3000;
app.listen(port, () => {console.log(`Server running on port : ${port}`)});