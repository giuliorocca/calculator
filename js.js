let num1;
let num2;
let operator;
const sound = new Audio('click.mp3');

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
function percent (num1, num2) {
    return ((num1 / 100) * num2);
}

// Define how calculator evaluates operator inputs
function operate (num1, num2, operator) {
    if (operator == "+") {
        return add(num1, num2);
    }
    if (operator == "-") {
        return subtract(num1, num2);
    }
    if (operator == "x") {
        return multiply(num1, num2);
    }
    if (operator == "÷") {
        return divide(num1, num2);
    }
    if (operator == "%") {
        return percent(num1, num2);
    }
}

// Define how the calculator's display updates (on two lines)
function updateDisplay(event) {
    sound.play();
    let buttonText = event.target.textContent;
    let firstLine = document.getElementById("firstline");
    let secondLine = document.getElementById("secondline");

    // Clear display and memory when AC button clicked
    if (event.target.id === "ac") {
        firstLine.textContent = "";
        secondLine.textContent = "";
        operator = undefined;
        num1 = undefined;
        num2 = undefined;
    }

    // Delete last thing entered when C button clicked
    if (event.target.id === "c") {
        firstLine.textContent = firstLine.textContent.slice(0, -1);
        secondLine.textContent = secondLine.textContent.slice(0, -1);
    }


    // Show numbers/decimals in display when numbers/decimals buttons clicked
    // in first line or on second line display if first number already input
    if (event.target.classList.contains("number")) {
        if (typeof operator === 'undefined') {
            firstLine.textContent = firstLine.textContent + buttonText;
        }
        else {
            secondLine.textContent = secondLine.textContent + buttonText;
        }
    }

    // Reduce font of first number when followed by an operator button
    // and save the first number and operator as variables
    if (event.target.classList.contains("operator")) {
        // Do not allow user to input two operators consecutively
        if (firstLine.textContent.includes("x", "+", "-", "÷", "%")) {
            return;
        }

        firstLine.textContent = firstLine.textContent + buttonText;
        firstLine.style.fontSize = "30px";
        operator = buttonText.trim();
        num1 = parseFloat(firstLine.textContent.slice(0, -1));
    }
    
    // Evaluate the two inputted numbers when equals button clicked
    if (event.target.id === "equals") {
        num2 = parseFloat(secondLine.textContent);
        let output = operate(num1, num2, operator);
        firstLine.textContent = output;
        firstLine.style.fontSize = "46px";
        secondLine.textContent = "";
        operator = undefined;
    }
}

// Attach click event listeners to all the buttons
const buttons = document.getElementsByClassName("button");
for (i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", updateDisplay);
}
