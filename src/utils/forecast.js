const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=a23c18e779d459299e5fe543bc1604e7&query=" +
    latitude +
    "," +
    longitude +
    "&units=f";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      // This error will be only true for error like during 'internet disconnection'.
      // BUT there might be an error which we get in the response body from the server side.
      callback("Unable to connect to weather service", undefined);
    } else if (body.error) {
      // For error which we get in the response body from the server side.
      callback(
        "Unable to find location because of error code: " +
          body.error.code +
          ". " +
          body.error.info,
        undefined
      );
    } else {
      const data = body.current;
      callback(
        undefined,
        `${data.weather_descriptions[0]}. Is is currently ${data.temperature} degrees out. It feels like ${data.feelslike} degrees out. the humidity is ${data.humidity}`
      );
    }
  });
};

module.exports = forecast;
