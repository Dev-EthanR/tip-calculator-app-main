const bill = document.getElementById('bill');
const quanity = document.getElementById('number-of-people');
const tipButtons = document.querySelectorAll('.tip-percentage');
const customTipButton = document.getElementById('custom');

let billValue, quanityValue, tipAmount;
// Bill
bill.addEventListener('input', (event) => {
    billValue = event.target.value;
    result(billValue, quanityValue, tipAmount);
    resetButtonActivation(billValue);
});

// Number of People
quanity.addEventListener('input', (event) => {
    quanityValue = event.target.value;
    result(billValue, quanityValue, tipAmount);
    resetButtonActivation(quanityValue);

});

// Tip Selection
customTipButton.addEventListener('input', (event) => {
    const customValue = event.target.value;
    toggleTipButton();
    tipAmount = tip(customValue);
});

// toggle through the tip buttons
tipButtons.forEach(tipButton => {
    tipButton.addEventListener('click', () => {
        customTipButton.value = ""
        toggleTipButton(tipButton)
        const tipPercent = tipButton.textContent;
        tipButton.classList.toggle('active')
        tipAmount = tip(tipPercent);
        result(billValue, quanityValue, tipAmount);
    })
})

// get percentage value and remove % and convert to integer
function tip(value) {
    if(value.endsWith('%')) {
       value =  Number(value.slice(0, -1));
    }
    return value;
}

// remove active class on previous button
function toggleTipButton(currentButton) {
    tipButtons.forEach(button => {
        if(button === currentButton) return;
        button.classList.remove('active');
    })
}

function result(bill = 1, amountOfPeople = 1, tip = 15){
    const tipElement =  document.getElementById('tip-result');
    const totalElement =  document.getElementById('total-result');

    const total = bill / amountOfPeople;
    const tipTotal = total * (tip / 100);
    const totalWithTip = total + tipTotal;

    tipElement.textContent = `$${tipTotal.toFixed(2)}`;
    totalElement.textContent = `$${totalWithTip.toFixed(2)}`;

}

function resetButtonActivation(input){
   const resetButton =  document.getElementById('reset');
   if(input != '' && input != '0') return resetButton.disabled = false;
   else return resetButton.disabled = true;
   
}
