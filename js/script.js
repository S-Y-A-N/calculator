// DOM Variables

let a = '';
let b = '';
let op = '';
let isEvaluated = false;
let shouldClear = false;
const DEFAULT_VALUE = 0;

const operatorButtons = document.querySelectorAll('button[data-op]');
const numberButtons = document.querySelectorAll('button[data-num]');
const equalButton = document.getElementById('equal');
const deleteButton = document.getElementById('delete');
const clearButton = document.getElementById('clear');
const pointButton = document.getElementById('point');
const topScreen = document.getElementById('topScreen');
const bottomScreen = document.getElementById('bottomScreen');
bottomScreen.textContent = DEFAULT_VALUE;

// Event Listeners

equalButton.addEventListener('click', evaluate);
clearButton.addEventListener('click', clear);
deleteButton.addEventListener('click', deleteNumber);
pointButton.addEventListener('click', addPoint);
window.addEventListener('keydown', keyboardListener);

operatorButtons.forEach(button => {
    button.addEventListener('click', () => setOperator(button.textContent));
});

numberButtons.forEach(button => {
    button.addEventListener('click', () => setNumber(button.textContent));
});

// DOM Functions

function keyboardListener(e) {
    if(e.key >= 0 && e.key <= 9) setNumber(e.key);
    if(e.key == '+' || e.key == '-' || e.key == '*' || e.key == '/') setOperator(e.key);
    if(e.key == '.') addPoint();
    if(e.key == '=' || e.key == 'Enter') evaluate();
    if(e.key == 'Backspace') deleteNumber();
    if(e.key == 'Escape') clear();
}

function setNumber(number) {
    if(isEvaluated) return;
    if(shouldClear) clear();
    if(bottomScreen.textContent == DEFAULT_VALUE && !bottomScreen.textContent.includes('.')) {
            bottomScreen.textContent = '';
        }

    bottomScreen.textContent += number;
}

function setOperator(operator) {
    // Prevents typing an operator before a number
    // if(bottomScreen.textContent == '') return;

    // Performs previous operation first if an operator is clicked again
    if(op !== '') evaluate();

    // Prevents typing an operator after division by zero
    if(shouldClear) return;

    // 1st operand equals typed number ONLY after a clear start
    if(a == '') a = bottomScreen.textContent;

    op = operator;
    if(op == '*') op = '×';
    topScreen.textContent = `${a} ${op}`;
    bottomScreen.textContent = '';
    isEvaluated = false;
}

function evaluate() {
    // Prevents error when clicking '=' without a new operation OR after division by zero
    if(isEvaluated || shouldClear) return;
    
    b = bottomScreen.textContent;

    // Prevents error when clicking '=' without typing 1st or 2nd operands
    if(a == '' || b == '') return;

    topScreen.textContent += ' ' + b + ' =';
    let result = operate(op, a, b);
    bottomScreen.textContent = result;
    a = result;
    op = '';
    isEvaluated = true;
    if(isNaN(result)) {
        isEvaluated = false;
        shouldClear = true;
    }
}

function clear() {
    topScreen.textContent = '';
    bottomScreen.textContent = '';
    a = '';
    b = '';
    op = '';
    isEvaluated = false;
    shouldClear = false;
    bottomScreen.textContent = DEFAULT_VALUE;
}

function addPoint() {
    if(bottomScreen.textContent.includes('.') || isEvaluated || shouldClear) return;
    if(bottomScreen.textContent == '') bottomScreen.textContent = DEFAULT_VALUE;
    bottomScreen.textContent += '.';
}

function deleteNumber() {
    if(bottomScreen.textContent == '' || isEvaluated || shouldClear) return;
    bottomScreen.textContent = bottomScreen.textContent.slice(0, -1);
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
    if(b === 0) {
        return 'ERROR: Cannot Divide by Zero!';
    }
    return a / b;
}

function operate(op, a, b) {
    a = Number(a);
    b = Number(b);
    let result;
    if(op == '×') op = '*';

    switch(op) {
        case '+':
            result = add(a, b);
            break;
        case '-':
            result = subtract(a, b);
            break;
        case '*':
            result = multiply(a, b);
            break;
        case '/':
            result = divide(a, b);
            break;
    }

    return roundResult(result);
}

function roundResult(result) {
    return Math.round(result * 1000000000) / 1000000000;
}