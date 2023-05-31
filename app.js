class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
    console.log(number);
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.currentOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '*':
        computation = prev * current;
        break;
      case '÷':
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const intergerDigits = parseFloat(stringNumber.split('.')[0]);
    console.log('from StringNumber', stringNumber);
    console.log('from IntergerDigits', intergerDigits);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    if (isNaN(intergerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = intergerDigits.toLocaleString('en', {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = '';
    }
  }
}

// const numberButtons = document.querySelectorAll('[data-number]');
// const operationButtons = document.querySelectorAll('[data-operation]');
// const equalsButton = document.querySelector('[data-equals]');
// const deleteButton = document.querySelector('[data-delete]');
// const allClearButton = document.querySelector('[data-all-clear]');
// const previousOperandTextElement = document.querySelector(
//   '[data-previous-operand]'
// );
// const currentOperandTextElement = document.querySelector(
//   '[data-current-operand]'
// );
// Type

const numberButtons = qsAll('[data-number]');
const operationButtons = qsAll('[data-operation]');
const equalsButton = qs('[data-equals]');
const deleteButton = qs('[data-delete]');
const allClearButton = qs('[data-all-clear]');
const previousOperandTextElement = qs('[data-previous-operand]');
const currentOperandTextElement = qs('[data-current-operand]');

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener('click', button => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener('click', button => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener('click', button => {
  calculator.delete();
  calculator.updateDisplay();
});

// Element select helper method

function qs(selector, parent) {
  const el = parent
    ? parent.querySelector(selector)
    : document.querySelector(selector);

  if (!el) throw new Error('Could not find elements');

  return el;
}

function qsAll(selector) {
  const ellist = document.querySelectorAll(selector);

  if (!ellist) throw new Error('Could not find elements');

  return ellist;
}
