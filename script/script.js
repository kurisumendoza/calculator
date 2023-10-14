let firstNumber;
let secondNumber;
let operator;

const operations = [
  {
    symbol: '+',
    function: function add(a, b) {
      return a + b;
    }
  },
  {
    symbol: '-',
    function: function subtract(a, b) {
      return a - b;
    }
  },
  {
    symbol: '*',
    function: function multiply(a, b) {
      return a * b;
    }
  },
  {
    symbol: '/',
    function: function divide(a, b) {
      return a / b;
    }
  }
]

function operate(operator, a, b) {
  let result;
  operations.forEach(operation => {
    if (operation.symbol === operator) {
      result = operation.function(a, b);
    }
  })
  return result;
}

console.log(operate('/', 1, 2));