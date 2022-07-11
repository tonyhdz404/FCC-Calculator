const calculator = document.querySelector(".calculator");
const output = document.querySelector(".display__output");

//* Sorting the operator in order of PEMDAS
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
  let expression = output.innerText
    .split(/([-+\/X])/)
    .filter((item) => item !== "");

  //* 2) Checking if only ONE number was entered
  if (expression.length === 1) {
    return (output.innerText = expression[0].replace(/(?!\d).(?=\.)/g, ""));
  }
  //* 3) Formatting the numbers in the raw expression
  for (let i = 0; i < expression.length; i++) {
    const number = expression[i];
    if (
      number.match(/(?!\d).(?=\.)/g) &&
      number.match(/(?!\d).(?=\.)/g).length >= 1
    ) {
      const formattedNumber = number.replace(/(?!\d).(?=\.)/g, "");
      expression[i] = formattedNumber;
    }
    if (/\d/.test(number)) {
      if (
        i > 0 &&
        expression[i - 1] === "-" &&
        /([-+\/X])/.test(expression[i - 2])
      ) {
        const negativeNumber = 0 - +number;
        expression[i] = negativeNumber;
        expression.splice(i - 1, 1);
        break;
      }
      expression[i] = +number;
    }
  }
  //* Eliminate consecutive operators
  let j = 1;
  for (let cur = 0; cur < expression.length; cur++) {
    let number = expression[cur];
    console.log(number);
    if (!/\d/.test(number) && !/\d/.test(expression[j])) {
      expression[cur] = "";
    }
    j++;
  }

  expression = expression.filter((value) => value !== "");

  //* 4) creating an array of all the operators and sorting them
  const operators = expression.filter((item) => /[-+\/X]/.test(item));
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
