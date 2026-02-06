const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";
let previousInput = "";
let operator = "";

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.innerText;

        // Numbers and dot
        if (!isNaN(value) || value === ".") {
            if (value === "." && currentInput.includes(".")) return;
            currentInput += value;
            display.value = currentInput;
        }

        // Operators
        else if (button.classList.contains("operator")) {
            if (currentInput === "" && previousInput !== "") {
                operator = value;
                display.value = previousInput + " " + operator;
                return;
            }

            if (currentInput === "") return;

            operator = value;
            previousInput = currentInput;
            currentInput = "";
            display.value = previousInput + " " + operator;
        }

        // Equal
        else if (button.classList.contains("equal")) {
            if (previousInput === "" || currentInput === "") return;

            const num1 = parseFloat(previousInput);
            const num2 = parseFloat(currentInput);
            let result;

            switch (operator) {
                case "+":
                    result = num1 + num2;
                    break;
                case "-":
                    result = num1 - num2;
                    break;
                case "*":
                    result = num1 * num2;
                    break;
                case "/":
                    result = num2 === 0 ? "Error" : num1 / num2;
                    break;
            }

            display.value = result;
            currentInput = result.toString();
            previousInput = "";
            operator = "";
        }
    });
});
