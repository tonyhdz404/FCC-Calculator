const calculator = document.querySelector(".calculator");
const output = document.querySelector(".display__output");

//* Sorting the operatos in order of PEMDAS
const operatorValues = {
  X: 4,
  "/": 3,
  "+": 2,
  "-": 0,
};
function operatorSort(a, b) {
  if (operatorValues[a] > operatorValues[b]) {
    return -1;
  }
  if (operatorValues[a] < operatorValues[b]) {
    return 1;
  }
  return 0;
}

function calculate() {
  const expression = output.innerText.split(/(\D)/);
  const operators = output.innerText.match(/[-+\/X]/g);
  let result;
  operators.sort((a, b) => operatorSort(a, b));

  for (let i = 0; i < operators.length; i++) {
    console.log(`Start`, expression);
    const operator = operators[i];
    console.log(operator);
    const operatorIndex = expression.indexOf(operator);

    switch (operator) {
      case "+":
        result =
          +expression[operatorIndex - 1] + +expression[operatorIndex + 1];
        break;
      case "-":
        result =
          +expression[operatorIndex - 1] - +expression[operatorIndex + 1];
        break;
      case "X":
        result =
          +expression[operatorIndex - 1] * +expression[operatorIndex + 1];
        break;
      case "/":
        result =
          +expression[operatorIndex - 1] / +expression[operatorIndex + 1];
        break;

      default:
        break;
    }
    expression.splice(operatorIndex - 1, 3, result);
    console.log(`End`, expression);
  }

  output.innerText = result;
}

calculator.addEventListener("click", function (e) {
  const button = e.target;
  if (!button.classList.contains("btn")) return;
  if (button.id === "clear") {
    return (output.innerText = 0);
  }
  if (button.id === "equals") {
    return calculate();
  }
  const buttonValue = button.innerText;
  if (output.innerText === "0" && !button.classList.contains("operator")) {
    return (output.innerText = buttonValue);
  }
  output.innerText += buttonValue;
});
