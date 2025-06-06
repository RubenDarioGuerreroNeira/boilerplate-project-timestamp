// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
// Configurar Express para confiar en los proxies
app.set('trust proxy', true);



// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/whoami", function (req, res) {
  // Asegurarse de que los nombres de las claves sean exactamente como se especifican
  return res.json({
    "ipaddress": req.ip,
    "language": req.headers["accept-language"],
    "software": req.headers["user-agent"]
  });
});




app.get("/api/:date?", function (req, res) {
  let dateParam = req.params.date;
  let date;

  // If no date provided, use current date
  if (!dateParam) {
    date = new Date();
  } else {
    // Check if the date is a Unix timestamp (all digits)
    if (/^\d+$/.test(dateParam)) {
      date = new Date(parseInt(dateParam));
    } else {
      // Otherwise, try to parse as a date string
      date = new Date(dateParam);
    }
  }

  // Check if date is valid
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Return the Unix timestamp and UTC string
  return res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});










// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
