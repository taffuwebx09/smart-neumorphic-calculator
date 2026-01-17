'use strict';

const displayValueEL = document.querySelector('#displayValue');
const displayHistoryEl = document.querySelector('#displayHistory');

const keysParent = document.querySelector('.keys');
const allKeys = document.querySelectorAll('.key');

/*---------- Start Coding ----------*/

displayValueEL.textContent = 0;
displayHistoryEl.textContent = '';

let firstValue = null;
let secondValue = null;
let operator = null;
let shouldResetDisplay = false;

const deleteNumber = (currentDisplay) => {
  if (currentDisplay === '0') return;

  const del = currentDisplay.slice(0, -1);
  displayValueEL.textContent = del === '' ? '0' : del;
  return;
};

const clearNumber = () => {
  displayValueEL.textContent = '0';
  displayHistoryEl.textContent = '';
  firstValue = null;
  secondValue = null;
  operator = null;
  shouldResetDisplay = false;
  return;
};

const calculateNow = (v1, op, v2) => {
  let result = 0;

  switch (op) {
    case '+':
      result = v1 + v2;
      break;
    case '-':
      result = v1 - v2;
      break;
    case '*':
      result = v1 * v2;
      break;
    case '/':
      result = v2 === 0 ? 'error' : v1 / v2;
      break;
    default:
      result = 0;
  }

  return result;
};

const calculate = () => {
  if (!operator) return;

  secondValue = displayValueEL.textContent;

  const v1 = +firstValue;
  const v2 = +secondValue;

  let result = calculateNow(v1, operator, v2);

  displayValueEL.textContent = result;
  displayHistoryEl.textContent = `${firstValue} ${operator} ${secondValue} =`;

  firstValue = null;
  secondValue = null;
  operator = null;
  shouldResetDisplay = true;
};

const operatorCalc = (key) => {
  const currentDisplay = displayValueEL.textContent;

  if (firstValue !== null && currentDisplay === '0') {
    operator = key;
    displayHistoryEl.textContent = `${firstValue} ${operator}`;
    return;
  }

  if (firstValue !== null && operator !== null && currentDisplay !== '0') {
    secondValue = currentDisplay;

    const v1 = +firstValue;
    const v2 = +secondValue;

    const result = calculateNow(v1, operator, v2);

    firstValue = result;
    operator = key;

    displayValueEL.textContent = '0';
    displayHistoryEl.textContent = `${firstValue} ${operator}`;
    shouldResetDisplay = false;
    return;
  }

  firstValue = currentDisplay;
  operator = key;

  displayValueEL.textContent = '0';
  displayHistoryEl.textContent = `${firstValue} ${operator}`;
};

const parcentCalc = () => {
  const v = +displayValueEL.textContent;

  if (firstValue === null || operator === null) {
    displayValueEL.textContent = v / 100;
    displayHistoryEl.textContent = `${v}%`;
    return;
  }

  const base = +firstValue;
  const percentValue = (base * v) / 100;

  displayValueEL.textContent = percentValue;
  displayHistoryEl.textContent = `${firstValue} ${operator} ${v}%`;
  return;
};

const toggleSign = () => {
  const currentDisplay = displayValueEL.textContent;

  if (currentDisplay === 'error') return;

  if (currentDisplay === '0' && operator !== null) {
    displayValueEL.textContent = '-0';
    shouldResetDisplay = false;
    return;
  }

  if (currentDisplay === '0') return;

  if (!currentDisplay.startsWith('-')) {
    const negitive = 0 - currentDisplay;
    displayValueEL.textContent = negitive;
  } else {
    const positive = Math.abs(+currentDisplay);
    displayValueEL.textContent = positive;
  }

  shouldResetDisplay = false;
  return;
};

document.addEventListener('keydown', (e) => {
  const key = e.key;

  const currentDisplay = displayValueEL.textContent;

  if (key === 'Backspace') {
    deleteNumber(currentDisplay);
    return;
  }

  if (key === 'Delete' || key === 'Escape') {
    clearNumber();
    return;
  }

  if (key == 'F9') {
    toggleSign();
    return;
  }

  if (key === '%') {
    parcentCalc();
    return;
  } else if (['+', '-', '*', '/'].includes(key)) {
    operatorCalc(key);
    return;
  }

  if (key === 'Enter' || key === '=') {
    calculate();
    return;
  }

  const isNumber = key >= '0' && key <= '9';
  const isDot = key === '.';

  if (isNumber || isDot) {
    if (currentDisplay === '-0' && isNumber) {
      displayValueEL.textContent = '-' + key;
      return;
    }

    if (shouldResetDisplay) {
      displayValueEL.textContent = isDot ? '0.' : key;
      shouldResetDisplay = false;
      return;
    }

    if (isDot && currentDisplay.includes('.')) return;

    if (currentDisplay === '0' && !isDot) {
      displayValueEL.textContent = key;
    } else {
      displayValueEL.textContent += key;
    }
  }
});

keysParent.addEventListener('click', (e) => {
  let btnValue = e.target.dataset.value;
  let btnAction = e.target.dataset.action;

  const currentDisplay = displayValueEL.textContent;

  if (btnValue) {
    const isDigit = btnValue >= '0' && btnValue <= '9';

    if (currentDisplay === '-0' && isDigit) {
      displayValueEL.textContent = '-' + btnValue;
      return;
    }

    if (shouldResetDisplay) {
      displayValueEL.textContent = btnValue === '.' ? '0.' : btnValue;
      shouldResetDisplay = false;
      return;
    }

    if (btnValue === '.') {
      if (!currentDisplay.includes('.')) {
        displayValueEL.textContent += btnValue;
      }
      return;
    }

    if (currentDisplay === '0') {
      displayValueEL.textContent = btnValue;
    } else {
      displayValueEL.textContent += btnValue;
    }
    return;
  }

  if (btnAction) {
    if (btnAction === 'backspace') {
      deleteNumber(currentDisplay);
      return;
    }

    if (btnAction === 'clear') {
      clearNumber();
      return;
    }

    if (btnAction == 'sign') {
      toggleSign();
      return;
    }

    const btnOperator = {
      divide: '/',
      multiply: '*',
      plus: '+',
      minus: '-',
      percent: '%',
    };

    if (btnAction === 'percent') {
      parcentCalc();
      return;
    }

    if (btnOperator[btnAction]) {
      operatorCalc(btnOperator[btnAction]);
      return;
    }

    if (btnAction === 'equals') {
      calculate();
      return;
    }
  }
});
