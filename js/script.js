// DOM Variables

const operators = document.querySelectorAll('button[data-op]');
const numbers = document.querySelectorAll('button[data-num]');
const equal = document.getElementById('equal');
const del = document.getElementById('delete');
const clear = document.getElementById('clear');

const topScreen = document.getElementById('topScreen');
const bottomScreen = document.getElementById('bottomScreen');
const numRegex = /\d+/;
const opRegex = /([\*\-\+\/])+/

// a = text until op, b = text after op
let a = '', b = '', op;

// Event Listeners

operators.forEach(op => {
    op.addEventListener('click', e => {
        showExpression(getOperator(e));
    });
});

numbers.forEach(num => {
    num.addEventListener('click', e => {
        showExpression(getNumber(e))
    });
});

equal.addEventListener('click', showResult);
clear.addEventListener('click', clearScreen);

// DOM Functions

function getNumber(e) {
    return e.target.value;
}

function getOperator(e) {
    return e.target.value;
}

function showExpression(exp) {
    if(opRegex.test(exp) && (!numRegex.test(topScreen.textContent) || opRegex.test(topScreen.textContent))) return;
    let content;

    if(numRegex.test(exp) && !opRegex.test(topScreen.textContent)) {
        content = document.createTextNode(exp);
        topScreen.appendChild(content);
        a += exp;
    }

    if(opRegex.test(exp)
        && !opRegex.test(topScreen.textContent)
        && numRegex.test(topScreen.textContent)) {
        content = document.createTextNode(exp);
        topScreen.appendChild(content);
        op = exp;
    }

    if(numRegex.test(exp) && opRegex.test(topScreen.textContent)) {
        content = document.createTextNode(exp);
        topScreen.appendChild(content);
        b += exp;
    }

}

function showResult() {
    let result = calculate(a, b, op);
    bottomScreen.textContent = result;
}

function clearScreen() {
    topScreen.innerText = '';
    bottomScreen.innerText = '';
    a = '';
    b = '';
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
    if(b === 0) return 'ERROR: Cannot Divide by Zero!'
    return a / b;
}

function calculate(a, b, op) {
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
        case '*':
            result = multiply(a, b);
            break;
        case '/':
            result = divide(a, b);
            break;
    }

    return result;
}