const createError = require(`http-errors`);
const express = require(`express`);
const path = require(`path`);
const cookieParser = require(`cookie-parser`);
const logger = require(`morgan`);
const mongoose = require(`mongoose`);

//Load environment variables from .env file
require(`dotenv`).config();

//Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log(`Connected to MongoDB Atlas`);
}).catch((error) => {
  console.error(`Failed to connect to MongoDB Atlas:`, error);
  process.exit(1); // Exit the application if unable to connect to the database
});

const app = express();

const costRouter = require(`./src/routes/cost_routes`);
const reportRouter = require(`./src/routes/report_routes`);
const aboutRouter = require(`./src/routes/about_routes`);

// view engine setup
app.set(`views`, path.join(__dirname, `views`));
app.set(`view engine`, `pug`);

app.use(logger(`dev`));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, `public`)));

app.use(`/`, costRouter);
app.use(`/`, reportRouter);
app.use(`/`, aboutRouter);
app.use(costRouter);
app.use(reportRouter);
app.use(aboutRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get(`env`) === `development` ? err : {};

  //send JSON response for API routes
  if (req.originalUrl.startsWith(`/addcost`) || req.originalUrl.startsWith(`/report`) || req.originalUrl.startsWith(`/about`)) {
    res.status(err.status || 500).json({ error: err.message || `Internal Server Error` });
    return;
  }

  // render the error page
  res.status(err.status || 500);
  res.render(`error`);
});


module.exports = app;