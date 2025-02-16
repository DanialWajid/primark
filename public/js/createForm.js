window.onload = function () {
  var productForm = document.getElementById("productForm");
  productForm.onsubmit = handleFormSubmit;
};

function handleFormSubmit(event) {
  let errorMessages = document.getElementsByClassName("error-message");
  for (let i = 0; i < errorMessages.length; i++) {
    errorMessages[i].style.display = "none";
  }

  let queryFields = document.getElementsByClassName("query");
  let isValid = true;

  for (let i = 0; i < queryFields.length; i++) {
    if (!queryFields[i].value) {
      errorMessages[i].style.display = "inline";
      isValid = false;
    }
  }

  if (!isValid) {
    event.preventDefault();
  }
}
