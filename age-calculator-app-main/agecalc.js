const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");

const dayOutput = document.getElementById("DD");
const monthOutput = document.getElementById("MM");
const yearOutput = document.getElementById("YY");

const form = document.querySelector("form");

form.addEventListener("submit", handleSubmit);

const date = new Date();
let day = date.getDate();
let month = 1 + date.getMonth();
let year = date.getFullYear();

const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function validate() {
  let validator = true;

  // Day input validation
  if (!dayInput.value) {
    dayInput.style.borderColor = "red";
    const dayError = dayInput.parentElement.querySelector("small");
    if (dayError) {
      dayError.innerText = "This field is required.";
    } else {
      console.warn("No <small> element found for Day input.");
    }
    validator = false;
  } else if (dayInput.value < 1 || dayInput.value > 31) {
    dayInput.style.borderColor = "red";
    dayInput.parentElement.querySelector("small").innerText = "Must be a valid day.";
    validator = false;
  } else {
    dayInput.style.borderColor = "black";
    dayInput.parentElement.querySelector("small").innerText = "";
  }

  // Month input validation
  if (!monthInput.value) {
    monthInput.style.borderColor = "red";
    const monthError = monthInput.parentElement.querySelector("small");
    if (monthError) {
      monthError.innerText = "This field is required.";
    } else {
      console.warn("No <small> element found for Month input.");
    }
    validator = false;
  } else if (monthInput.value < 1 || monthInput.value > 12) {
    monthInput.style.borderColor = "red";
    monthInput.parentElement.querySelector("small").innerText = "Must be a valid month.";
    validator = false;
  } else {
    monthInput.style.borderColor = "black";
    monthInput.parentElement.querySelector("small").innerText = "";
  }

  // Year input validation
  if (!yearInput.value) {
    yearInput.style.borderColor = "red";
    const yearError = yearInput.parentElement.querySelector("small");
    if (yearError) {
      yearError.innerText = "This field is required.";
    } else {
      console.warn("No <small> element found for Year input.");
    }
    validator = false;
  } else {
    yearInput.style.borderColor = "black";
    yearInput.parentElement.querySelector("small").innerText = "";
  }

  return validator;
}



function handleSubmit(e) {
  e.preventDefault();
  
  if (validate()) {
    const today = new Date();
    let day = today.getDate();
    let month = 1 + today.getMonth();
    let year = today.getFullYear();

    let inputDay = parseInt(dayInput.value);
    let inputMonth = parseInt(monthInput.value);
    let inputYear = parseInt(yearInput.value);

    const months = [31, ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (inputDay > day) {
      day += months[month - 2];
      month -= 1;
    }
    if (inputMonth > month) {
      month += 12;
      year -= 1;
    }

    const d = day - inputDay;
    const m = month - inputMonth;
    const y = year - inputYear;

    // Display the output
    dayOutput.innerHTML = d;
    monthOutput.innerHTML = m;
    yearOutput.innerHTML = y;
  }
}
