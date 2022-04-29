const path = require("path"); // It is core module and hence need not to be installed
const express = require("express");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

// console.log(__dirname);
// console.log(__filename);

// console.log(path.join(__dirname, "../")); // joins: Joins and returns final path. (../ will go to parent dir.)
// console.log(path.join(__dirname, "../public"));

const app = express();

// Define Path for Express Config:
const publicDirPath = path.join(__dirname, "../public");
// Incase we have different directory name than 'views' for hbs:
const viewPath = path.join(__dirname, "../templates/views");
// partials (elements which can be reused like header) files path:
const partialsPath = path.join(__dirname, "../templates/partials");

// To setup handlebars engine:
app.set("view engine", "hbs");
// To set viewPath:
app.set("views", viewPath);
// Register partials:
hbs.registerPartials(partialsPath);

// Serving the html file
// static(): This is a built-in middleware function in Express. It takes the file path.
// It serves static files and is based on serve-static.
app.use(express.static(publicDirPath)); // Serves the static html file in root (localhost:3000)
// We can also visit html page by specifing localhost:3000/filename.html

// Lets say we own domain app.com
// app.com
// app.com/help
// app.com/about
// All of these are gonna run on single express server. We have setup multiple routes.
// We need to setup our server to get a response at the specific route.

// app.get("", (req, res) => {
//   // First parameter is route, second is the function which describe what to send back on this route.
//   // Functions args: First (req) is the object conatining info about the incoming request to the server.
//   // Second (res) is the response which contain methods allowing us to customize what we are going to send
//   // back to the requester.
//   res.send("<h1>Weather</h1>");
// });

// app.get("/help", (req, res) => {
//   res.send([
//     {
//       name: "Shaurya",
//       age: 25,
//     },
//     {
//       name: "Suhani",
//       age: 22,
//     },
//   ]);
// });

// app.get("/about", (req, res) => {
//   res.send("<h1>About Page</h1>");
// });

// Handlebars:
app.get("", (req, res) => {
  // render(): 1st arg: takes the view file index from views folder
  // 2nd arg: Object which contains all of the values you want that view to be able to access.
  res.render("index", {
    title: "Weather App",
    name: "Shaurya",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Shaurya",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text",
    title: "Help",
    name: "Shaurya",
  });
});

app.get("/weather", (req, res) => {
  console.log(req.query.address);

  if (!req.query.address) {
    return res.send({
      error: "Enter an address",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      // console.log(latitude, longitude, location);
      if (error) {
        return res.send({ error }); // error: error
      }

      forecast(latitude, longitude, (forecastError, forecastData) => {
        // console.log(forecastRes);
        if (forecastError) {
          return res.send({ error: forecastError });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  console.log(req.query);
  console.log(req.query.rating);

  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  // To get all the pages after /help/
  // res.send("Help Article not found");

  res.render("404", {
    title: "404",
    name: "Shaurya",
    msg: "Help Article not found",
  });
});

app.get("*", (req, res) => {
  // * means match anything which hasn't matched in above urls
  // res.send("My 404 page");

  res.render("404", {
    title: "404",
    name: "Shaurya",
    msg: "My 404 page",
  });
});

// Starting server
app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});

// We can use nodemon to listen to changes without manually re-running the server.
