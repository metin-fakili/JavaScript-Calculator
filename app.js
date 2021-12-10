const numberButtons = document.querySelectorAll('[data-number]')
const operationsButtons = document.querySelectorAll('[data-operation]')
const equalButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const outputResultTextField = document.querySelector('[data-output]')
const calcOneTextField = document.querySelector('[data-calc-one]')
const calcTwoTextField = document.querySelector('[data-calc-two]')
const calcThreeTextField = document.querySelector('[data-calc-three]')
const titleCalcShow = document.getElementsByTagName('h4');


class Calculator {

    constructor(outputResultTextField, calcOneTextField, calcTwoTextField, calcThreeTextField) {
        this.outputResultTextField = outputResultTextField;
        this.calcOneTextField = calcOneTextField;
        this.calcTwoTextField = calcTwoTextField;
        this.calcThreeTextField = calcThreeTextField;
        this.clear()
    }

    clear() {
        this.outputResultTextField.innerText = '0';
        titleCalcShow[0].style.display = 'none'
        this.calcOneTextField.innerText = ''
        this.calcTwoTextField.innerText = ''
        this.calcThreeTextField.innerText = ''
        this.currentNumber = ''
        this.previousNumber = ''
        this.operation = undefined
        this.sign = undefined
        this.caculationCounter = 0
    }

    delete() {
        if (this.currentNumber.length <= 1) {
            this.currentNumber = '0';
            this.sign = undefined
        } else {
            this.currentNumber = this.currentNumber.substring(0, this.currentNumber.length - 1);
        }
    }

    appendNumber(number) {
        if (number === '.' && this.currentNumber.includes('.')) return
        if (this.currentNumber === '0' && number !== '.') {
            this.currentNumber = number;
        } else {
            this.currentNumber = this.currentNumber.substring(0, 7) + number.toString()
        }
    }

    chooseOperation(operation) {
        if (this.currentNumber === '' && (operation === 'x' || operation === '÷')) {
            this.currentNumber = '0'
            this.operation = operation

        } else if (this.currentNumber === '' && this.previousNumber === '' && (operation === '+' || operation === '-')) {
            this.sign = operation;
        }else{
            this.operation = operation
        }

        if (this.previousNumber !== '' && (this.previousNumber !== '+' || this.previousNumber !== '-')) {
            this.solve();
        }
        if (this.sign === '-' && this.currentNumber !== '') {
            this.previousNumber = this.sign + this.currentNumber
        } else {
            this.previousNumber = this.currentNumber
        }
        this.currentNumber = ''

    }

    solve() {
        let solution
        const previous = parseFloat(this.previousNumber)
        const current = parseFloat(this.currentNumber)
        if (isNaN(previous) || isNaN(current)) return
        switch (this.operation) {
            case '÷':
                solution = previous / current
                break;
            case 'x':
                solution = previous * current
                break;
            case '+':
                solution = previous + current
                break;
            case '-':
                solution = previous - current
                break;
            default:
                break;
        }
        this.caculationCounter++
        this.bottomCalculationDisplay(previous, current, solution)
        this.currentNumber = solution.toString()
        this.previousNumber = ''

        this.sign = undefined
    }

    bottomCalculationDisplay(prev, cur, sol) {
        titleCalcShow[0].style.display = 'block'
        let calc = prev + ' ' + this.operation + ' ' + cur + ' = ' + sol
        switch (this.caculationCounter) {
            case 1:
                this.calcThreeTextField.innerText = this.calcTwoTextField.innerText
                this.calcTwoTextField.innerText = this.calcOneTextField.innerText
                this.calcOneTextField.innerText = calc
                break;
            case 2:
                this.calcThreeTextField.innerText = this.calcTwoTextField.innerText
                this.calcTwoTextField.innerText = this.calcOneTextField.innerText
                this.calcOneTextField.innerText = calc
                break;
            case 3:
                this.calcThreeTextField.innerText = this.calcTwoTextField.innerText
                this.calcTwoTextField.innerText = this.calcOneTextField.innerText
                this.calcOneTextField.innerText = calc
                this.caculationCounter = 0
            default:
                break
        }
    }

    update() {
        if (this.sign !== undefined && this.previousNumber === '') {
            this.outputResultTextField.innerText = this.sign + this.currentNumber
        } else if (this.previousNumber !== '') {
            this.outputResultTextField.innerText = this.previousNumber + this.operation + this.currentNumber
            console.log(this.operation)

        }else{
            this.outputResultTextField.innerText = this.currentNumber

        }

    }
}

const calculator = new Calculator(outputResultTextField, calcOneTextField, calcTwoTextField, calcThreeTextField)

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText)
        calculator.update()
    })
})

operationsButtons.forEach(operation => {
    operation.addEventListener("click", () => {
        calculator.chooseOperation(operation.innerText)
        calculator.update();
    })
})

equalButton.addEventListener("click", () => {
    calculator.solve();
    calculator.update();
})

deleteButton.addEventListener("click", () => {
    calculator.delete();
    calculator.update();
})

allClearButton.addEventListener("click", () => {
    calculator.clear();
    calculator.update();
})