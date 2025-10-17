const bill = document.getElementById('bill');
const quantity = document.getElementById('number-of-people');
const tipButtons = document.querySelectorAll('.tip-percentage');
const customTipButton = document.getElementById('custom');
const tipElement = document.getElementById('tip-result');
const totalElement = document.getElementById('total-result');

let billValue, quantityValue, tipAmount;

const errorStatus = {
    bill: false,
    quanity: false
}
// Bill
bill.addEventListener('input', (event) => {
    billValue = event.target.value;
    quantity.placeholder = 1;
    resetButtonActivation(billValue);
    result(billValue, quantityValue, tipAmount);
});

// Number of People
quantity.addEventListener('input', (event) => {
    quantityValue = event.target.value;
    resetButtonActivation(quantityValue);
    result(billValue, quantityValue, tipAmount);

});

// Tip Selection
customTipButton.addEventListener('input', (event) => {
    const customValue = event.target.value;
    toggleTipButton();
    tipAmount = tip(customValue);
    result(billValue, quantityValue, tipAmount);
});

// toggle through the tip buttons
tipButtons.forEach(tipButton => {
    tipButton.addEventListener('click', () => {
        customTipButton.value = ""
        toggleTipButton(tipButton)
        const tipPercent = tipButton.textContent;
        tipButton.classList.toggle('active')
        tipAmount = tip(tipPercent);
        result(billValue, quantityValue, tipAmount);
    })
})

// get percentage value and remove % and convert to integer
function tip(value) {
    if (typeof value === 'string' && value.endsWith('%')) {
        value = value.slice(0, -1);
    }
    return Number(value);
}

// remove active class on previous button
function toggleTipButton(currentButton) {
    tipButtons.forEach(button => {
        if (button === currentButton) return;
        button.classList.remove('active');
    })
}

// Display Result
function result(bill = 1, amountOfPeople = 1, tip = 15) {
    checkInput(billValue, 'bill');
    checkInput(quantityValue, 'quantity');
    if (Object.values(errorStatus).some(val => val)) return;

    const total = bill / amountOfPeople;
    const tipTotal = total * (tip / 100);
    const totalWithTip = total + tipTotal;

    tipElement.textContent = `$${tipTotal.toFixed(2)}`;
    totalElement.textContent = `$${totalWithTip.toFixed(2)}`;

}

// Toggle reset button enabled/disabled
function resetButtonActivation(input) {
    const resetButton = document.getElementById('reset');
    if (input != '' && input != '0') return resetButton.disabled = false;
    else return resetButton.disabled = true;

}

// Check for valid input
function checkInput(input, inputId) {
    if (input == '' || input == 0 || input <= 0.009) {
        errorStatus[inputId] = true
    } else {
        errorStatus[inputId] = false
    }
    changeVisualStatus()
}

// display any errors if input invalid
function changeVisualStatus() {
    console.log(errorStatus)
    let element;
    for (const key in errorStatus) {
        if (key === 'quantity') element = quantity;
        if (key === 'bill') element = bill;
        if (Object.values(errorStatus).some(val => val)) {
            if (errorStatus[key]) {
                element.parentNode.classList.remove('valid-input');
                element.parentNode.classList.add('invalid-input');
                element.parentElement.previousElementSibling.lastChild.textContent = "Can't be zero";
                tipElement.textContent = '$0.00';
                totalElement.textContent = '$0.00'
            } else {
                element.parentElement.classList.add('valid-input');
            }
        } else if (!errorStatus[key]) {
            element.parentNode.classList.remove('invalid-input');
            element.parentElement.previousElementSibling.lastChild.textContent = "";
            element.parentElement.classList.remove('valid-input');
        }
    }
}

// reset button
function reset() {
    const defaultTip = document.getElementById('default-tip');
    toggleTipButton(defaultTip);
    defaultTip.classList.add('active')
    bill.value = '';
    quantity.value = '';
    customTipButton.value = '';
    tipElement.textContent = '$0.00';
    totalElement.textContent = '$0.00'
    billValue = 0;
    quantityValue = 1;
    tipAmount = 15;
    quantity.placeholder = 0;
    resetButtonActivation('');
}