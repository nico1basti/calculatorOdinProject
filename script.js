const operatorSymbols = ['x','/','+','-']
const functionSymbols = ['C','del', '=']
const numbersSymbols = [...Array(10).keys()]
const operatorsDiv = document.querySelector('#operators')
const inputDiv = document.querySelector('#inputtext')
const numbersDiv = document.querySelector('#numbers')
const resultDiv = document.querySelector('#results')
let operation = []

function createButton (arr,div){
    arr.forEach(element => {
        iButton = document.createElement('button')
        iButton.textContent = String(element)
        if (isNaN(element)){
            element === 'C' ? iButton.addEventListener('click',clear) : 
            element === 'del' ? iButton.addEventListener('click',del) : 
            element === '=' ? iButton.addEventListener('click',equal) : 
                iButton.addEventListener('click',input) 
        } else {
            iButton.addEventListener('click',input)
            iButton.addEventListener('click',evaluate)
        }
        div.appendChild(iButton)
    });
}

function input (event) {
    let inputText =  event.target.textContent 

    if ((isNaN(operation.slice(-1)) & isNaN(inputText)) | 
        (((operation.length === 0) &  isNaN(inputText)) & inputText !== '-')) {
        null
    } else {
        operation += inputText
        inputDiv.textContent += inputText
    }

}

function evaluate (event) {
    let optPattern = /[x\+\-\/]+/
    let numPattern = /[0-9]+/
    let firstOperator = operation[0]
    
    let numbers = operation.split(optPattern)
    let operators = operation.split(numPattern)
    if (operation[0] === '-') {
        numbers.shift()
        numbers[0] = '-' + numbers[0]
    }

    operators.pop()
    operators.shift()
    let optToEvaluate = operators.slice().sort((a, b) => operatorSymbols.indexOf(a) - operatorSymbols.indexOf(b))
   
    optToEvaluate.forEach(element => {
        let operatorIndex = operators.indexOf(element)
        let firstNumberIndex = operatorIndex
        let secondNumberIndex = operatorIndex + 1
        let firstNumber = Number(numbers[firstNumberIndex])
        let secondNumber = Number(numbers[secondNumberIndex])
        let result = 
        element === 'x' ? firstNumber * secondNumber : 
        element === '/' ? firstNumber / secondNumber : 
        element === '+' ? firstNumber + secondNumber :
        element === '-' ? firstNumber - secondNumber : null
   
        numbers = numbers.filter((value,index) => ![firstNumberIndex,secondNumberIndex].includes(index))
        numbers.splice(firstNumberIndex, 0, result)
        operators.splice(operatorIndex,1)
    })
    let result = Math.round(numbers[0]*10000)/10000
    printResult(result)
    return result
}

function printResult (result){
    resultDiv.textContent = result
}

function equal (event) {
    let result = evaluate()
    inputDiv.textContent = result
    operation = [String(result)]
}

function clear (event) {
    inputDiv.textContent = ''
    resultDiv.textContent = ''
    operation = []
}

function del (event) {
    inputDiv.textContent = inputDiv.textContent.slice(0,-1)
    operation = operation.slice(0,-1)
    evaluate()

}
createButton(operatorSymbols,operatorsDiv)
createButton(functionSymbols,operatorsDiv)
createButton(numbersSymbols,numbersDiv)

