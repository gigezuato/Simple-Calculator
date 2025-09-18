// Toggle the application theme (green <-> purple)
document.getElementById("switch").addEventListener("click", function(){
    document.body.classList.toggle("green-theme");

    if (document.body.classList.contains("green-theme")) {
        this.textContent = "Purple";
        this.style.backgroundColor = "#a541c9";
        this.style.color = "antiquewhite";
    } else {
        this.textContent = "Green";
        this.style.backgroundColor = "#02ca5e";
        this.style.color = "antiquewhite";
    }
})

// Calculator elements
const screen = document.getElementById("screen");
const numberButtons = document.querySelectorAll(".number");
const operationsButtons = document.querySelectorAll(".operation");
const equalButton = document.getElementById("equal");
const clearButton = document.getElementById("clear");
const eraserButton = document.getElementById("eraser");

// Calculator state (numbers, operator, and control flags)
let firstNumber = null;
let secondNumber = null;
let operator = null;
let waitingForSecondNumber = false;
let justCalculated = false;

// Click on number buttons → update the display
numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        const digit = button.textContent.trim();
        
        if (justCalculated) {
            screen.value = digit;
            justCalculated = false;
            operator = null;
            firstNumber = null;
            secondNumber = null;
            waitingForSecondNumber = false;
            return;
        }
        if (screen.value == 0 || screen.value == "ERROR"){
            screen.value = button.textContent;
        } else {
            screen.value += button.textContent;
        }
        waitingForSecondNumber = false;
    })
})

// Click on operation buttons (+, -, *, /) → store operator and prepare for second number
operationsButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (operator !== null) return;
        if (screen.value === "ERROR") return;

        firstNumber = parseFloat(screen.value);
        operator = button.textContent.trim();

        screen.value += operator;
        waitingForSecondNumber = true;
        justCalculated = false;
    });
});

// Function that performs the mathematical operation
function calculate(n1, operator, n2) {
    switch (operator) {
        case "+":
            return n1 + n2;
        case "-":
            return n1 - n2;
        case "*":
            return n1 * n2;
        case "/":
            if (n2 == 0){
                return "ERROR";
            } else {
                return n1 / n2;
            }
        default:
            return "ERROR";
    }
}

// Click on "=" → process the expression and display the result
equalButton.addEventListener("click", () => {
    if (!operator) return;
    // Splits firstNumber and secondNumber
    let parts = screen.value.split(operator);

    if (parts.length < 2 || parts[1] === "") {
        screen.value = "ERROR";
        return;
    }

    firstNumber = parseFloat(parts[0]);
    secondNumber = parseFloat(parts[1]);
    // Perform the calculation when the "=" button is clicked
    screen.value = calculate(firstNumber, operator, secondNumber);
    // Reset variables
    firstNumber = null;
    secondNumber = null; 
    operator = null;
    waitingForSecondNumber = false;
    justCalculated = true;
});

// Click on "C" → reset the display and all variables
clearButton.addEventListener("click", () => {
    screen.value = "0";
    firstNumber = null;
    secondNumber = null;
    operator = null;
    waitingForSecondNumber = false;
    justCalculated = false;
})

// Click on eraser → delete the last character
eraserButton.addEventListener("click", () => {
    if (screen.value === "ERROR" || screen.value.length <= 1) {
        screen.value = "0";
        operator = null;
        firstNumber = null;
        waitingForSecondNumber = false;
        justCalculated = false;
        return;
    }
    
    const lastChar = screen.value.slice(-1);
    screen.value = screen.value.slice(0, -1);

    if (lastChar === operator) {
        operator = null;
        waitingForSecondNumber = false;
    }
})