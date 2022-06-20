console.log("Client Side JS file is loaded!");

// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });

const weatherForm = document.querySelector("form");
const searchedElement = document.querySelector("input");

const statusMsg = document.querySelector("#statusMsg");
const weatherOuput = document.querySelector("#weatherOuput");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = searchedElement.value;
  console.log("Submitted", location);

  statusMsg.textContent = "Loading...";
  weatherOuput.textContent = "";

  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error);
        statusMsg.textContent = data.error;
      } else {
        console.log(data.location);
        console.log(data.forecast);
        statusMsg.textContent = "";
        weatherOuput.textContent = `Location: ${data.location}. Forecast: ${data.forecast}`;
      }
    });
  });
});
