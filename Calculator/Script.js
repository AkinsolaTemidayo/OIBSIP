const display = document.getElementById('display');
const clearButton = document.getElementById('clear');
const buttons = document.querySelectorAll('.button:not(#clear):not(#delete)');
const operatorButtons = document.querySelectorAll('.operator');
const deleteButton = document.getElementById('delete');
let expression = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        appendToDisplay(button.textContent);
    });
});

clearButton.addEventListener('click', clearDisplay);

operatorButtons.forEach(operatorButton => {
    operatorButton.addEventListener('click', () => {
        appendToDisplay(operatorButton.textContent);
    });
});

deleteButton.addEventListener('click', deleteLastCharacter);

document.getElementById('equals').addEventListener('click', calculate);

function appendToDisplay(value) {
    const lastChar = expression.slice(-1);
    if (value === '=' && /[+\-*/]/.test(lastChar)) {
        return;
    }
    if (value === '=') {
        calculate();
        return;
    }
    if (value === 'Del') {
        deleteLastCharacter();
        return;
    }
    if (/[+\-*/]/.test(value) && /[+\-*/]/.test(lastChar)) {
        // If the last character is also an operator, replace it with the new operator
        expression = expression.slice(0, -1) + value;
    } else {
        expression += value;
    }
    display.textContent = expression;
}

function clearDisplay() {
    expression = '';
    display.textContent = '0';
}

function deleteLastCharacter() {
    expression = expression.slice(0, -1);
    display.textContent = expression;
}

function calculate() {
    let result = eval(expression);
    display.textContent = result;
    expression = result.toString();
}