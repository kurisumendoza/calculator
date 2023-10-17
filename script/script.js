let firstValue;
let secondValue;
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
  return result.toString().substring(0, 12);
}

const buttons = document.querySelectorAll('button');
const operators = document.querySelectorAll('.operator');
const computationDisplay = document.querySelector('.computation-display');
const resultDisplay = document.querySelector('.result-display');
resultDisplay.textContent = 0;

buttons.forEach(button => button.addEventListener('click', () => {
  if (button.classList.contains('number')) {
    numberButtons(button);
    console.log('number');
  } else if (button.classList.contains('decimal')) {
    addDecimal(button);
    console.log('decimal');
  } else if (button.classList.contains('operator')) {
    operatorButtons(button)
    console.log('operator');
  } else if (button.classList.contains('clear')) {
    clear(button);
    console.log('clear');
  } else if (button.classList.contains('delete')) {
    deleteChar(button);
    console.log('delete');
  } else if (button.classList.contains('equals')) {
    isEqualTo(button);
    console.log('equals');
  }
}));

function numberButtons(button) {
  computationDisplay.textContent += button.textContent;
}

function addDecimal(button) {
  const lastNum = computationDisplay.innerText.charAt(computationDisplay.innerText.length -1);
  const operatorArray = ['+', '-', '*', '/'];
  if (!computationDisplay.textContent || operatorArray.includes(lastNum)) {
    computationDisplay.textContent += '0.';
  } else if (lastNum === '.' || button.classList.contains('ticked')) {
    console.log('do nothing');
  } else {
    computationDisplay.textContent += button.textContent;
    button.classList.add('ticked')
  }
}

function clear(button) {
  computationDisplay.textContent = '';
  resultDisplay.textContent = '0';
  operators.forEach(item => item.classList.remove('clicked'));
  document.querySelector('.decimal').classList.remove('ticked');
}

function deleteChar(button) {
  const lastNum = computationDisplay.innerText.charAt(computationDisplay.innerText.length -1);
  const decimalCheck = document.querySelector('.decimal');
  const operatorArray = ['+', '-', '*', '/']; 
  if (operatorArray.includes(lastNum)) {
    operators.forEach(item => item.classList.remove('clicked'));
  }
  if (lastNum === '.') {
    decimalCheck.classList.remove('ticked');
  }
  computationDisplay.innerText = computationDisplay.innerText.slice(0, -1);
  console.log(lastNum);
}

function operatorButtons(button) {
  if (!computationDisplay.textContent) {
    console.log('empty');
  } else if (button.classList.contains('clicked')) {
    console.log(true);
  } else {
    operators.forEach(item => item.classList.add('clicked'))
    computationDisplay.textContent += ` ${button.textContent} `;
    console.log(false);
  };
}

function isEqualTo(button) {
  if (!computationDisplay.textContent) {
    console.log('empty');
  } else {
    const computationArray = computationDisplay.innerText.split(' ');
    firstValue = Number(computationArray[0]);
    secondValue = Number(computationArray[2]);
    operator = computationArray[1];
    resultDisplay.textContent = operate(operator, firstValue, secondValue);
  
    console.log(computationArray);
  }
}