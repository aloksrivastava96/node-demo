const request = require("postman-request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiYWxvay1zcml2YXN0YXZhIiwiYSI6ImNsMmZwNGZsOTA4NTgzZG81YmJsb3dscW8ifQ.x4LGMZ-ISR6CL4PeoL5VQA&limit=1";
  // encodeURIComponent(): Encodes a text string as a valid component of a Uniform Resource Identifier (URI).
  // It is useful when string contains special character

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to geocoding service!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
