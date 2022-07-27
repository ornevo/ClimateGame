const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const passport = require('passport');
const httpStatus = require('http-status');
const path = require('path');
const config = require('./config/config');
const morgan = require('./config/morgan');
const { jwtStrategy } = require('./config/passport');
const { authLimiter } = require('./middlewares/rateLimiter');
const routes = require('./routes/v1');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');
const bodyParser = require('body-parser');


function isNumeric(str) {
  if (typeof str != "string") return false // we only process strings!
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}


const app = express();

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('/v1/auth', authLimiter);
}

// v1 api routes
const router = express.Router();
router.route("/").get((req, res) => {
  res.set('Content-Security-Policy', "script-src 'unsafe-inline'");
  res.sendFile(path.join(__dirname, '/../../index.html'));
});
router.route("/tailwind.js").get((req, res) => {
  res.sendFile(path.join(__dirname, '/../../tailwind.js'));
});
router.route("/jquery.js").get((req, res) => {
  res.sendFile(path.join(__dirname, '/../../jquery.js'));
});
router.route("/my.js").get((req, res) => {
  res.sendFile(path.join(__dirname, '/../../my.js'));
});
router.route("/show").get((req, res) => {
  // res.setHeader('Content-Type', 'text/html; charset=UTF-8');
  res.setHeader('Content-Type', 'application/json');


  app.db.collection("options").find().toArray().then(options => {
    app.db.collection("events").find().toArray().then(events => {
      // console.log(events[2].title, JSON.stringify(events[2].title, null, 2));
      // let result = "==== events ====<br />" + JSON.stringify(events, null, 2).replace(/\n/g, '<br/>') + "<br /><br />==== options ====<br />" + JSON.stringify(options, null, 2);
      let result = JSON.stringify({events, options}, null, 2);
      res.end(result);
    });
  });
})

router.route("/submit").post((req, res) => {
  let event = {threshold: {}};
  let options = {};

  // some checkbox fillups
  req.body['event-is-surprise'] = req.body.hasOwnProperty('event-is-surprise');
  req.body['threshold-is-year-max'] = req.body.hasOwnProperty('threshold-is-year-max');
  req.body['threshold-is-money-max'] = req.body.hasOwnProperty('threshold-is-money-max');
  req.body['threshold-is-emissions-max'] = req.body.hasOwnProperty('threshold-is-emissions-max');
  req.body['threshold-is-life-quality-max'] = req.body.hasOwnProperty('threshold-is-life-quality-max');

  Object.keys(req.body).forEach(key => {
    let local_key = key.replace(/-/g, "_");
    let value = req.body[key];
    // will hopefully not cause too many bugs in the future
    if (isNumeric(value)) {
      value = parseFloat(value);
    }

    if (key.indexOf("option-") === 0) {
      let opt_id = key.split("-")[1];
      if(!options.hasOwnProperty(opt_id))
        options[opt_id] = {effect: {}};
      let options_key = local_key.substr("option-".length + 1 + opt_id.length);
      if(options_key.indexOf("effect_") === 0)
        options[opt_id].effect[options_key.substr("effect_".length)] = value;
      else
        options[opt_id][options_key] = value;
    } else if(key.indexOf("threshold-") === 0) {
      local_key = local_key.substr("threshold-".length)
      event.threshold[local_key] = value;
    } else{
      if(key.indexOf("event-") === 0)
        local_key = local_key.substr("event-".length)
      event[local_key] = value;
    }
  })

  let num_of_options = Object.keys(options).length;
  let options_arr = []
  for (let i = 0; i < num_of_options; i++) options_arr[i] = options[i + 1];

  app.db.collection("options").insertMany(options_arr).then(result => {
    event['options'] = Object.values(result.insertedIds);
    app.db.collection("events").insert(event).then(result =>
      res.redirect("/"))
  });
});


app.use('/', router);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
