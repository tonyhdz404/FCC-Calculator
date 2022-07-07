const calculator = document.querySelector(".calculator");
const output = document.querySelector(".display__output");

//* Sorting the operatos in order of PEMDAS
const operatorValues = {
  X: 4,
  "/": 3,
  "+": 0,
  "-": 2,
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
  //* 1) Creating an array that is split AT any operator
  const rawExpression = output.innerText.split(/([-+\/X])/);

  //* 2) Checking if only ONE number was entered
  if (rawExpression.length === 1) {
    return (output.innerText = rawExpression[0].replace(/(?!\d).(?=\.)/g, ""));
  }
  //* 3) Formatting the numbers in the raw expression
  const expression = rawExpression.map((number, index, array) => {
    if (
      number.match(/(?!\d).(?=\.)/g) &&
      number.match(/(?!\d).(?=\.)/g).length >= 1
    ) {
      const formattedNumber = number.replace(/(?!\d).(?=\.)/g, "");
      return formattedNumber;
    }
    if (/\d/.test(number)) {
      if (index > 0 && array[index - 1] === "-" && array[index - 2] === "") {
        const negativeNumber = 0 - +number;
        console.log(rawExpression.splice(index - 2, 3, negativeNumber));
        console.log(rawExpression);
        return;
      }
      return +number;
    }
    return number;
  });
  console.log(expression);

  //* 4) creating an array of all the operators and sorting them
  const operators = output.innerText.match(/[-+\/X]/g);
  operators.sort((a, b) => operatorSort(a, b));

  //* 5) Looping through all the operators
  let result;
  for (let i = 0; i < operators.length; i++) {
    const operator = operators[i];
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

  //* Decimal Validation
  if (button.id === "decimal") {
    if (!/([-+\/X])/.test(output.innerText) && /\./.test(output.innerText))
      return;
    if (/([-+\/X])/.test(output.innerText)) {
      const lastNumber = output.innerText.split(/([-+\/X])/).at(-1);
      if (/\./.test(lastNumber)) return;
    }
  }
  output.innerText += buttonValue;
});
