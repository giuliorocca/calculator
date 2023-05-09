let num1;
let num2;
let operator;

// Define the basic math operations
function add (num1, num2) {
    return num1 + num2;
}
function subtract (num1, num2) {
    return num1 - num2;
}
function multiply (num1, num2) {
    return num1 * num2;
}
function divide (num1, num2) {
    return num1/num2;
}

// Define the basic calculator functionality
function operate (num1, num2, operator) {
    if (operator == "+") {
        return add(num1, num2);
    }
    if (operator == "-") {
    return subtract(num1, num2);
    }
    if (operator == "/") {
    return divide(num1, num2);
    }
}

