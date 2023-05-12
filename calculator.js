let num1;
let num2;
let operator;
let lastModifiedDisplayLine;
const maxLengthDisplayLine = 10;
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

// Define how calculator applies the operator 
// to the two numbers inputted
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

// Define how the calculator display updates 
// across two lines
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

    // Delete last char entered when C button clicked
    // on last modified display line
    if (event.target.id === "c") {
        if (lastModifiedDisplayLine === "firstLine") {
            let text = firstLine.textContent;
            text = text.slice(0, -1);
            firstLine.textContent = text;
        }
        if (lastModifiedDisplayLine === "secondLine") {
            let text = secondLine.textContent;
            text = text.slice(0, -1);
            secondLine.textContent = text;
        }
    }
    
    // Prevent user from inputting two decimals for num1 or num2
    if (event.target.classList.contains("number") && event.target.id === "dot") {
        const decimal = ".";
        if (lastModifiedDisplayLine === "firstLine" && firstLine.textContent.includes(decimal)) {
            return;
        }
        if (lastModifiedDisplayLine === "secondLine" && secondLine.textContent.includes(decimal)) {
            return;
        }
    }
    
    // Show numbers/decimals in display when numbers/decimals buttons clicked
    // in first line or on second line display if first number already input
    // and an operator has been already input

    if (event.target.classList.contains("number")) {
        if (typeof operator === 'undefined') {
            if (firstLine.textContent.length <= maxLengthDisplayLine) {
                firstLine.textContent = firstLine.textContent + buttonText;
                lastModifiedDisplayLine = "firstLine";
            }
        }
        else {
            if (secondLine.textContent.length <= maxLengthDisplayLine) {
                secondLine.textContent = secondLine.textContent + buttonText;
                lastModifiedDisplayLine = "secondLine";
            }
        }
    }

    // Reduce font of first number when followed by an operator button
    // and save the first number and operator as variables
    if (event.target.classList.contains("operator")) {
        // Prevent user from inputting two operators consecutively
        const operators = ["x", "+", "-", "÷", "%"];
        if (operators.includes(firstLine.textContent.slice(-1))) {
            return;
        }
        if (secondLine.textContent.length <= maxLengthDisplayLine) {
            firstLine.textContent = firstLine.textContent + buttonText;
            firstLine.style.fontSize = "32px";
            num1 = parseFloat(firstLine.textContent.slice(0, -1));
            operator = buttonText;
            lastModifiedDisplayLine = "firstLine";
        }
    }

    // Evaluate the two inputted numbers when equals button clicked
    if (event.target.id === "equals") {
        num2 = parseFloat(secondLine.textContent);
        let output = operate(num1, num2, operator);
        
        // Round answer to two decimals if answer isn't whole number
        if (output % 1 != 0) {
            output = output.toFixed(2);
        }

        // Convert answer to exponent notation and six decimals
        if (output.toString().length > 8) {
            output = output.toExponential(6);
        }

        firstLine.textContent = output;
        firstLine.style.fontSize = "50px";
        secondLine.textContent = "";
        operator = undefined;
        lastModifiedDisplayLine = "firstLine";
    }
}

// Attach click event listeners to all the buttons
const buttons = document.getElementsByClassName("button");
for (i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", updateDisplay);
}