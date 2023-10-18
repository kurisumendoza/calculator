let firstValue = document.querySelector('.first-value');
let operator = document.querySelector('.displayed-operator')
let secondValue = document.querySelector('.second-value');

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
  if (resultDisplay.classList.contains('evaluated')) {
    clear();
  }
  if (firstValue.classList.contains('filled')) {
    if (secondValue.textContent.length <= 12 && (secondValue.textContent < 1000000 && secondValue.textContent > -1000000)) {
      secondValue.textContent += button.textContent;
    }
  } else {
    if (firstValue.textContent.length <= 12 && (firstValue.textContent < 1000000 && firstValue.textContent > -1000000)) {
      firstValue.textContent += button.textContent;
    }
  }
}

function addDecimal(button) {
  if (firstValue.classList.contains('filled')) {
    if (!secondValue.textContent) {
      secondValue.textContent += '0.';
    } else if (!secondValue.textContent.includes('.')) {
      secondValue.textContent += button.textContent;
    }
  } else {
    if (!firstValue.textContent) {
      firstValue.textContent += '0.';
    } else if (!firstValue.textContent.includes('.')) {
      firstValue.textContent += button.textContent;
    }
  }

}

function clear(button) {
  firstValue.textContent = '';
  firstValue.classList.remove('filled');
  operator.textContent = '';
  secondValue.textContent = '';
  resultDisplay.textContent = '0';
  resultDisplay.classList.remove('evaluated');
}

function deleteChar(button) {
  if (secondValue.textContent) {
    secondValue.textContent = secondValue.textContent.slice(0, -1)
  } else if (!secondValue.textContent && operator.textContent) {
    operator.textContent = operator.textContent.slice(0, -1);
    firstValue.classList.remove('filled');
    // add code to remove extra zeros
  } else if (!secondValue.textContent && !operator.textContent) {
    firstValue.textContent = firstValue.textContent.slice(0, -1);
  }
  if (resultDisplay.textContent != 0) {
    resultDisplay.textContent = 0;
  }
}

function operatorButtons(button) {
  if (!firstValue.textContent) {
    console.log('do nothing');
  } else if (operator.textContent && secondValue.textContent) {
    resultDisplay.textContent = operate(operator.textContent, Number(firstValue.textContent), Number(secondValue.textContent));
    if (resultDisplay.textContent.length <= 12 && (resultDisplay.textContent < 10000000 && resultDisplay.textContent > -10000000)) {
      firstValue.textContent = resultDisplay.textContent;
      operator.textContent = button.textContent;
      secondValue.textContent = '';
    } else {
      console.log('error');
    }
  }
  else {
    operator.textContent = button.textContent;
    firstValue.classList.add('filled');
  }
  if (resultDisplay.textContent.length > 14) {
    resultDisplay.textContent = resultDisplay.textContent.substring(0, 14)
  }
  resultDisplay.classList.remove('evaluated');
}

function isEqualTo(button) {
  if (!operator.textContent || !secondValue.textContent) {
    if (!firstValue.textContent) {
      resultDisplay.textContent = 0;
    } else {
      resultDisplay.textContent = firstValue.textContent;
    }
  } else {
    resultDisplay.textContent = firstValue
    resultDisplay.textContent = operate(operator.textContent, Number(firstValue.textContent), Number(secondValue.textContent));
  }
  if (resultDisplay.textContent.length > 14) {
    resultDisplay.textContent = resultDisplay.textContent.substring(0, 14)
  }
  resultDisplay.classList.add('evaluated');
}