let num1;
let num2;
let operator;

// Define basic math operations
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
    return num1 / num2;
}

// Define basic calculator functionality
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

// Define function that updates the display 
function updateDisplay(event) {
    let buttonText = event.target.textContent;
    let display = document.getElementById("display");
    display.textContent = display.textContent + buttonText;
    displayValue = display.textContent;
}

// Attach click event listeners to all the buttons
const buttons = document.getElementsByClassName("button");
for (i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", updateDisplay);
}
