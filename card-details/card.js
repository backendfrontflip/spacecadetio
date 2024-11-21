// Grabbing the necessary elements
const cardNumber = document.getElementById("number");
const numberInp = document.getElementById("card-number");

const cardName = document.getElementById("name");
const nameInp = document.getElementById("card-name");

const cardMonth = document.getElementById("month");
const monthInp = document.getElementById("card-month");

const cardYear = document.getElementById("year");
const yearInp = document.getElementById("card-year");

const cardCvc = document.getElementById("cvc");
const cvcInp = document.getElementById("card-cvc");

const submitButton = document.getElementById("submit-btn");
const completed = document.querySelector(".thanks");
const form = document.querySelector("form");

// Format card numbers with spaces
function formatCardNumber(s) {
  return s.replace(/(\d{4})(?=\d)/g, "$1 ");
}

// Update card details dynamically
function setCardDetails(e) {
  const target = e.target;

  if (target === nameInp) {
    cardName.textContent = target.value || "Jane Appleseed"; // Default name
  } else if (target === numberInp) {
    cardNumber.textContent = formatCardNumber(target.value) || "0000 0000 0000 0000"; // Default number
  } else if (target === monthInp || target === yearInp) {
    // Update the expiry date
    const month = monthInp.value.padStart(2, "0") || "00"; // Default month
    const year = yearInp.value.padStart(2, "0") || "00"; // Default year
    cardMonth.textContent = `${month}/${year}`;
  } else if (target === cvcInp) {
    cardCvc.textContent = target.value || "000"; // Default CVC
  }
}

// Validation on form submission
function handleSubmit(e) {
  e.preventDefault(); // Prevent form submission
  let valid = true; // Tracks overall form validity

  const inputs = [
    { input: nameInp, errorMessage: "Name cannot be blank" },
    { input: numberInp, errorMessage: "Card number cannot be blank" },
    { input: monthInp, errorMessage: "Month cannot be blank" },
    { input: yearInp, errorMessage: "Year cannot be blank" },
    { input: cvcInp, errorMessage: "CVC cannot be blank" },
  ];

  inputs.forEach(({ input, errorMessage }) => {
    const errorSpan = input.nextElementSibling; // The span element for error messages

    if (!input.value) {
      valid = false;
      input.classList.add("error");
      errorSpan.textContent = errorMessage;
    } else {
      input.classList.remove("error");
      errorSpan.textContent = ""; // Clear any previous error
    }
  });

  // If all fields are valid, show the "Thank You" message
  if (valid) {
    completed.classList.remove("hidden");
    form.classList.add("hidden");
  }
}

// Add event listeners for input changes and form submission
nameInp.addEventListener("input", setCardDetails);
numberInp.addEventListener("input", setCardDetails);
monthInp.addEventListener("input", setCardDetails);
yearInp.addEventListener("input", setCardDetails);
cvcInp.addEventListener("input", setCardDetails);
submitButton.addEventListener("click", handleSubmit);
