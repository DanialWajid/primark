window.onload = function () {
  var gform = document.getElementById("gform");
  gform.onsubmit = handleFormSubmit;
};

function handleFormSubmit(event) {
  for (let index = 0; index < 4; index++) {
    let errorMessage = document.getElementsByClassName("error-message");
    errorMessage[index].style.display = "none";
  }

  let query = document.getElementsByClassName("query");
  let isValid = true;

  for (let index = 0; index < 4; index++) {
    if (query[index].value) {
      console.log("Valid Input");
    } else {
      console.log("Invalid form");
      let errorMessage = document.getElementsByClassName("error-message");
      errorMessage[index].style.display = "inline";
      isValid = false;
      event.preventDefault();
    }
  }

  if (isValid) {
    for (let index = 0; index < query.length; index++) {
      query[index].value = "";
    }
  }
}
