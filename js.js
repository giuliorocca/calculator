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

// Define how calculator accepts operator inputs
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

// Define how calculator display updates (across two lines)
function updateDisplay(event) {
    let buttonText = event.target.textContent;
    let firstLine = document.getElementById("firstline");
    let secondLine = document.getElementById("secondline");

    // Clear display when AC button clicked
    if (event.target.id === "ac") {
        firstLine.textContent = "";
        secondLine.textContent = "";
    }

    // Show numbers/decimals in display when numbers/decimals buttons clicked
    // in first line or second line of display, depending if first number input
    if (event.target.classList.contains("number")) {
        if (firstLine.textContent === "") {
            firstLine.textContent = firstLine.textContent + buttonText;
        }
        else {
            secondLine.textContent = secondLine.textContent + buttonText;
        }
    }

    // Reduce font of first number when followed by an operator
    // and save the first number and operator as variables
    if (event.target.classList.contains("operator")) {
        firstLine.textContent = firstLine.textContent + buttonText;
        firstLine.style.fontSize = "24px";
        operator = buttonText;
        num1 = parseFloat(firstLine.textContent);
    }
    
    // Evaluate the two inputted numbers when equals button clicked
    if (event.target.id === "equals") {
        num2 = parseFloat(firstLine.textContent);
        let output = operate(num1, num2, operator);
        firstLine.textContent = output;
        firstLine.style.fontSize = "30px";
    }
}

// Attach click event listeners to all the buttons
const buttons = document.getElementsByClassName("button");
for (i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", updateDisplay);
}
