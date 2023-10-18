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
  return result;
}

const buttons = document.querySelectorAll('button');
const operators = document.querySelectorAll('.operator');
const computationDisplay = document.querySelector('.computation-display');
const resultDisplay = document.querySelector('.result-display');
resultDisplay.textContent = 0;

buttons.forEach(button => button.addEventListener('click', () => {
  if (button.classList.contains('number')) {
    numberButtons(button);
  } else if (button.classList.contains('decimal')) {
    addDecimal(button);
  } else if (button.classList.contains('operator')) {
    operatorButtons(button)
  } else if (button.classList.contains('clear')) {
    clear(button);
  } else if (button.classList.contains('delete')) {
    deleteChar(button);
  } else if (button.classList.contains('equals')) {
    isEqualTo(button);
  }
}));

function numberButtons(button) {
  limitCharacters();
  if (computationDisplay.classList.contains('exceeded')) {
    console.log('exceeded');
  } else
  if (resultDisplay.textContent != 0 && resultDisplay.classList.contains('evaluated')) {
    clear();
    computationDisplay.textContent += button.textContent;
  } else {
    computationDisplay.textContent += button.textContent;
  }
}

function addDecimal(button) {
  const lastNum = computationDisplay.innerText.charAt(computationDisplay.innerText.length -1);
  const operatorArray = ['+', '-', '*', '/'];
  limitCharacters();
  if (!computationDisplay.textContent || operatorArray.includes(lastNum)) {
    computationDisplay.textContent += '0.';
  } else if (lastNum === '.' || button.classList.contains('ticked') || computationDisplay.classList.contains('exceeded')) {
    console.log('do nothing');
  } else if (resultDisplay.textContent != 0) {
    computationDisplay.textContent = '';
    resultDisplay.textContent = 0;
    computationDisplay.textContent += '0.';
  } else {
    computationDisplay.textContent += button.textContent;
    button.classList.add('ticked')
  }
}

function clear(button) {
  computationDisplay.textContent = '';
  resultDisplay.textContent = '0';
  resultDisplay.classList.remove('evaluated');
  operators.forEach(item => item.classList.remove('clicked'));
  document.querySelector('.decimal').classList.remove('ticked');
  computationDisplay.classList.remove('exceeded');
}

function deleteChar(button) {
  const lastNum = computationDisplay.innerText.charAt(computationDisplay.innerText.length -1);
  const decimalCheck = document.querySelector('.decimal');
  const operatorArray = ['+', '-', '*', '/']; 
  if (operatorArray.includes(lastNum)) {
    operators.forEach(item => item.classList.remove('clicked'));
    computationDisplay.innerText = computationDisplay.innerText.slice(0, -2);
  } else {
    computationDisplay.innerText = computationDisplay.innerText.slice(0, -1);
  }
  if (lastNum === '.') {
    decimalCheck.classList.remove('ticked');
  }
  if (resultDisplay.textContent != 0) {
    resultDisplay.textContent = 0;
  }
  computationDisplay.classList.remove('exceeded');
}

function operatorButtons(button) {
  const lastNum = computationDisplay.innerText.charAt(computationDisplay.innerText.length -1);
  limitCharacters();
  if (!computationDisplay.textContent || computationDisplay.classList.contains('exceeded')) {
    console.log('empty');
  } else if (button.classList.contains('clicked') || lastNum === '.') {
    splitEquation();
    if (!secondValue) {
      console.log('invalid');
    } else {
      resultDisplay.textContent = operate(operator, firstValue, secondValue);
      computationDisplay.textContent = resultDisplay.textContent;
      computationDisplay.textContent += ` ${button.textContent} `;
    }
    resultDisplay.classList.remove('evaluated');
  } else {
    operators.forEach(item => item.classList.add('clicked'))
    computationDisplay.textContent += ` ${button.textContent} `;
  };
}

function isEqualTo(button) {
  splitEquation();
  if (!operator) {
    resultDisplay.textContent = firstValue;
    if (firstValue != 0) {
      resultDisplay.classList.add('evaluated');
    }
  } else if (!secondValue) {
    console.log('invalid');
  } else {
    resultDisplay.textContent = operate(operator, firstValue, secondValue);
    resultDisplay.classList.add('evaluated');
  }
  if (resultDisplay.textContent.length > 12) {
    resultDisplay.textContent = resultDisplay.textContent.substring(0, 12)
  }
}

function splitEquation() {
  const computationArray = computationDisplay.innerText.split(' ');
  firstValue = Number(computationArray[0]);
  secondValue = Number(computationArray[2]);
  operator = computationArray[1];
}

function limitCharacters() {
  let exemptSpaces = computationDisplay.textContent.replace(/ /g, '').length;
  console.log(exemptSpaces);
  if (exemptSpaces >= 24) {
    computationDisplay.classList.add('exceeded');
  }
}