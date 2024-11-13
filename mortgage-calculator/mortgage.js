const defaultText = document.getElementById('default-text');
const calculationsContainer = document.getElementById('calculations-container');

// Query selector
document.querySelectorAll('.mortgage-type').forEach(input => {
    input.addEventListener('change', function() {
        document.querySelectorAll('.radio-inputs').forEach(div => {
            div.classList.remove('selected');
        });

        if (this.checked) {
            this.parentElement.classList.add('selected');
        }
    });
});

document.getElementById('calculate-btn').addEventListener('click', () => {
    const amount = parseFloat(document.getElementById('mortgage-amount').value);
    const term = parseFloat(document.getElementById('mortgage-term').value);
    const rate = parseFloat(document.getElementById('interest-rate').value) / 100;
    const mortgageType = document.querySelector('input[name="mortgage-type"]:checked');

    let isValid = true;

    // Clear all error classes before validation
    document.querySelectorAll('.form-flex').forEach(el => {
        el.classList.remove('error');
    });

    // Validate mortgage amount
    if (isNaN(amount) || amount <= 0) {
        document.getElementById('amount-alert').style.display = "block";
        document.getElementById('mortgage-amount-main').classList.add('error');
        isValid = false;
    } else {
        document.getElementById('amount-alert').style.display = 'none';
    }

    // Validate mortgage term
    if (isNaN(term) || term <= 0) {
        document.getElementById('term-alert').style.display = "block";
        document.getElementById('mortgage-term-main').classList.add('error');
        isValid = false;
    } else {
        document.getElementById('term-alert').style.display = 'none';
    }

    // Validate interest rate
    if (isNaN(rate) || rate <= 0) {
        document.getElementById('rate-alert').style.display = "block";
        document.getElementById('interest-rate-main').classList.add('error');
        isValid = false;
    } else {
        document.getElementById('rate-alert').style.display = 'none';
    }

    // Validate mortgage type
    if (!mortgageType) {
        document.getElementById('type-alert').style.display = 'block';
        document.querySelectorAll('.radio-inputs').forEach(el => {
            el.classList.add('error');
        });
        isValid = false;
    } else {
        document.getElementById('type-alert').style.display = 'none';
    }

    if (isValid) {
        let monthlyPayment = 0;
        let totalRepayment = 0;

        defaultText.classList.add('hide');
        calculationsContainer.classList.add('show');

        if (mortgageType.value === 'repayment') {
            const monthlyRate = rate / 12;
            const n = term * 12;
            monthlyPayment = (amount * monthlyRate) / (1 - Math.pow((1 + monthlyRate), -n));
            totalRepayment = monthlyPayment * n;
        } else if (mortgageType.value === 'interest only') {
            monthlyPayment = (amount * rate) / 12;
            totalRepayment = monthlyPayment * term * 12;
        }

        document.getElementById('result').innerText = `$${monthlyPayment.toFixed(2)}`;
        document.getElementById('term-result').innerText = `$${totalRepayment.toFixed(2)}`;
    } else {
        document.getElementById('result').innerText = '';
        document.getElementById('term-result').innerText = '';

        defaultText.classList.remove('hide');
        calculationsContainer.classList.remove('show');
    }
});

document.getElementById('clear-btn').addEventListener('click', clearAllFields);

function clearAllFields() {
  document.getElementById('mortgage-amount').value = '';
  document.getElementById('mortgage-term').value = '';
  document.getElementById('interest-rate').value = '';

  document.querySelectorAll('.mortgage-type').forEach((radio) => {
    radio.checked = false;
  });

  document.getElementById('amount-alert').style.display = 'none';
  document.getElementById('term-alert').style.display = 'none';
  document.getElementById('rate-alert').style.display = 'none';
  document.getElementById('type-alert').style.display = 'none';

  document.getElementById('result').textContent = '';
  document.getElementById('term-result').textContent = '';

  defaultText.classList.remove('hide');
  calculationsContainer.classList.remove('show');
}

document.querySelectorAll('.form-alert').forEach(element => {
    element.style.display = 'none';
});
