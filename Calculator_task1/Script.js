const display = document.getElementById("display"); // Get reference to the display element
const clearButton = document.getElementById("clear"); // Get reference to the clear button
const buttons = document.querySelectorAll(".button:not(#clear):not(#delete)"); // Get references to numeric buttons excluding clear and delete buttons
const operatorButtons = document.querySelectorAll(".operator"); // Get references to operator buttons
const deleteButton = document.getElementById("delete"); // Get reference to the delete button

// Initialize expression string to store input
let expression = "";

// Add event listeners to numeric buttons
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    appendToDisplay(button.textContent); // Append clicked button's value to the display
  });
});

// Add event listener to clear button
clearButton.addEventListener("click", clearDisplay);

// Add event listeners to operator buttons
operatorButtons.forEach((operatorButton) => {
  operatorButton.addEventListener("click", () => {
    appendToDisplay(operatorButton.textContent); // Append clicked operator button's value to the display
  });
});

// Add event listener to delete button
deleteButton.addEventListener("click", deleteLastCharacter);

// Add event listener to equals button
document.getElementById("equals").addEventListener("click", calculate);

// Function to append a value to the display
function appendToDisplay(value) {
  const lastChar = expression.slice(-1); // Get the last character of the expression
  if (value === "=" && /[+\-*/]/.test(lastChar)) {
    // Check if '=' is clicked and the last character is an operator
    return; // Prevent adding '=' if it's not valid
  }
  if (value === "=") {
    // If '=' is clicked
    calculate(); // Calculate the expression
    return;
  }
  if (value === "Del") {
    // If 'Del' button is clicked
    deleteLastCharacter(); // Delete the last character
    return;
  }
  if (/[+\-*/]/.test(value) && /[+\-*/]/.test(lastChar)) {
    // If the last character is also an operator, replace it with the new operator
    expression = expression.slice(0, -1) + value;
  } else {
    expression += value; // Append the value to the expression
  }
  display.textContent = expression; // Update the display with the new expression
}

// Function to clear the display and expression
function clearDisplay() {
  expression = ""; // Reset expression
  display.textContent = "0"; // Reset display to '0'
}

// Function to delete the last character from the expression
function deleteLastCharacter() {
  expression = expression.slice(0, -1); // Remove the last character from the expression
  display.textContent = expression; // Update the display
}

// Function to calculate the expression
function calculate() {
  let result = eval(expression); // Evaluate the expression
  display.textContent = result; // Update the display with the result
  expression = result.toString(); // Update the expression with the result as a string
}
