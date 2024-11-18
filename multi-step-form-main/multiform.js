// Selectors
const steps = document.querySelectorAll('.stp');
const roundSteps = document.querySelectorAll('.step');
const formInputs = document.querySelectorAll('.round-1 form input');
const allPlans = document.querySelectorAll('.plans');
const switcher = document.querySelector('.switch');
const addOns = document.querySelectorAll('.box');
const total = document.querySelector('.total b');
const planPriceElements = document.querySelectorAll('.plan-priced');
const nextButtons = document.querySelectorAll('.next-step');
const previousButtons = document.querySelectorAll('.previous-step');

// State variables
let time = false; // Monthly or yearly flag (false: monthly, true: yearly)
let currentStep = 1;

// Plan and pricing object
const obj = {
    plan: { innerText: "Default Plan" },
    kind: false,
    price: { innerText: "$0" },
};

// Handle step transitions
function changeStep(direction) {
    // Hide current step
    document.querySelector(`.step-${currentStep}`).style.display = "none";

    // Update step index
    currentStep += direction;

    // Show the new step
    document.querySelector(`.step-${currentStep}`).style.display = "flex";

    // Update round step indicators
    if (direction > 0) {
        roundSteps[currentStep - 1].classList.add("active");
        roundSteps[currentStep - 2].classList.remove("active");
    } else {
        roundSteps[currentStep].classList.remove("active");
        roundSteps[currentStep - 1].classList.add("active");
    }
}

// Next and previous button event listeners
nextButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (validateForm()) {
            changeStep(1);
            setTotal();
            summary(obj);
        }
    });
});

previousButtons.forEach((button) => {
    button.addEventListener("click", () => {
        changeStep(-1);
    });
});

// Validate form inputs
function validateForm() {
    let isValid = true;

    formInputs.forEach((input) => {
        const label = findLabel(input);

        if (!input.value.trim()) {
            isValid = false;
            input.classList.add("error");
            if (label) label.nextElementSibling.style.display = "flex"; // Show error message
        } else {
            input.classList.remove("error");
            if (label) label.nextElementSibling.style.display = "none"; // Hide error message
        }
    });

    return isValid;
}
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(event) {
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => {
            const errorMessage = input.nextElementSibling; // Assuming error message is directly after input
            if (!input.validity.valid) {
                errorMessage.style.display = 'block';
                event.preventDefault(); // Prevent form submission if any input is invalid
            } else {
                errorMessage.style.display = 'none'; // Hide error message if input is valid
            }
        });
    });
});

// Find corresponding label for an input
function findLabel(input) {
    const idVal = input.id;
    const labels = document.getElementsByTagName("label");

    for (let i = 0; i < labels.length; i++) {
        if (labels[i].htmlFor === idVal) return labels[i];
    }
    return null;
}

// Plan selection
allPlans.forEach((plan) => {
    plan.addEventListener("click", () => {
        document.querySelector(".selected").classList.remove("selected");
        plan.classList.add("selected");

        const planName = plan.querySelector("b");
        const planPrice = plan.querySelector(".plan-priced");

        obj.plan = planName;
        obj.price = planPrice;
    });
});

// Switch between monthly and yearly pricing
switcher.addEventListener("click", () => {
    const isYearly = switcher.querySelector("input").checked;

    document.querySelector(".monthly").classList.toggle("sw-active", !isYearly);
    document.querySelector(".yearly").classList.toggle("sw-active", isYearly);

    switchPrice(isYearly);
    obj.kind = isYearly;
});

// Handle addon selection
addOns.forEach((addon) => {
    addon.addEventListener("click", (e) => {
        const addonSelect = addon.querySelector("input");
        const ID = addon.getAttribute("data-id");

        if (addonSelect.checked) {
            addonSelect.checked = false;
            addon.classList.remove("ad-selected");
            showAddon(ID, false);
        } else {
            addonSelect.checked = true;
            addon.classList.add("ad-selected");
            showAddon(addon, true);
            e.preventDefault();
        }
    });
});

// Update plan pricing
function switchPrice(isYearly) {
    const yearlyPrices = [90, 120, 150];
    const monthlyPrices = [9, 12, 15];

    planPriceElements.forEach((price, index) => {
        price.innerHTML = isYearly
            ? `$${yearlyPrices[index]}/yr`
            : `$${monthlyPrices[index]}/mo`;
    });

    setTime(isYearly);
}

// Display addons in summary
function showAddon(addon, isSelected) {
    const temp = document.getElementsByTagName("template")[0];
    const clone = temp.content.cloneNode(true);

    const serviceName = clone.querySelector(".service-name");
    const servicePrice = clone.querySelector(".service-price");
    const serviceID = clone.querySelector(".selected-addon");

    if (isSelected) {
        serviceName.innerText = addon.querySelector("label").innerText;
        servicePrice.innerText = addon.querySelector(".price").innerText;
        serviceID.setAttribute("data-id", addon.dataset.id);
        document.querySelector(".addons").appendChild(clone);
    } else {
        const addons = document.querySelectorAll(".selected-addon");

        addons.forEach((addonItem) => {
            if (addonItem.getAttribute("data-id") === addon) {
                addonItem.remove();
            }
        });
    }
}

// Update total cost
function setTotal() {
    const basePrice = parseInt(obj.price.innerText.replace(/\D/g, ""), 10);
    const addonPrices = document.querySelectorAll(".selected-addon .service-price");
    let totalAddonPrice = 0;

    addonPrices.forEach((addon) => {
        const price = parseInt(addon.innerText.replace(/\D/g, ""), 10);
        totalAddonPrice += price;
    });

    total.innerHTML = `$${basePrice + totalAddonPrice}/${time ? "yr" : "mo"}`;
}

// Update time state
function setTime(isYearly) {
    time = isYearly;
}

// Update summary
function summary(obj) {
    const planName = document.querySelector('.plan-name');
    const planPrice = document.querySelector('.plan-price');

    if (!obj.plan || !obj.price) {
        console.error("Missing plan or price in object:", obj);
        return;
    }

    planName.innerHTML = `${obj.plan.innerText} (${obj.kind ? "yearly" : "monthly"})`;
    planPrice.innerHTML = `${obj.price.innerText}`;
}
