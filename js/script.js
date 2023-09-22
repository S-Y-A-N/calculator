// DOM Variables

let a = '';
let b = '';
let op = '';

const operatorButtons = document.querySelectorAll('button[data-op]');
const numberButtons = document.querySelectorAll('button[data-num]');
const equalButton = document.getElementById('equal');
const deleteButton = document.getElementById('delete');
const clearButton = document.getElementById('clear');
const topScreen = document.getElementById('topScreen');
const bottomScreen = document.getElementById('bottomScreen');

// Event Listeners

equalButton.addEventListener('click', evaluate);
clearButton.addEventListener('click', clear);
deleteButton.addEventListener('click', deleteNumber);

operatorButtons.forEach(button => {
    button.addEventListener('click', () => setOperator(button.textContent));
});

numberButtons.forEach(button => {
    button.addEventListener('click', () => setNumber(button.textContent));
});

// DOM Functions

function setNumber(number) {
    bottomScreen.textContent += number;
}

function setOperator(operator) {
    if(op !== '') evaluate();
    if(topScreen.textContent = '') return;
    if(a == '') a = bottomScreen.textContent;
    op = operator;
    topScreen.textContent = `${a} ${op}`;
    bottomScreen.textContent = '';
}

function evaluate() {
    b = bottomScreen.textContent;
    topScreen.textContent += ' ' + b;
    let result = operate(op, a, b);
    bottomScreen.textContent = result;
    a = result;
    op = '';
}

function clear() {
    topScreen.textContent = '';
    bottomScreen.textContent = '';
    a = '';
    b = '';
    op = '';
}

function deleteNumber() {
    
}

// Calculator Logic

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if(b === 0) return 'ERROR: Cannot Divide by Zero!';
    return a / b;
}

function operate(op, a, b) {
    a = Number(a);
    b = Number(b);
    let result;

    switch(op) {
        case '+':
            result = add(a, b);
            break;
        case '-':
            result = subtract(a, b);
            break;
        case '×':
            result = multiply(a, b);
            break;
        case '/':
            result = divide(a, b);
            break;
    }

    return result;
}