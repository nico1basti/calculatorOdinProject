const operatorSymbols = ['x','/','+','-']
const functionSymbols = ['C','del', '=']
const numbersSymbols = [...Array(10).keys()]
const operatorsDiv = document.querySelector('#operators')
const inputDiv = document.querySelector('#inputtext')
const numbersDiv = document.querySelector('#numbers')
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

    if ((isNaN(operation.slice(-1)) & isNaN(inputText)) | (operation.length === 0) &  isNaN(inputText)) {
        null
    } else {
        operation += inputText
        inputDiv.textContent += inputText
    }

    console.log(operation)
}

function evaluate (event) {
    let optPattern = /[x\+\-\/]+/
    let numPattern = /[0-9]+/
    let numbers = operation.split(optPattern)
    let operators = operation.split(numPattern)
    operators.shift()
    operators.pop()
    let evaluated = numbers.slice()
    let optToEvaluate = operators.slice() .sort((a, b) => operatorSymbols.indexOf(a) - operatorSymbols.indexOf(b))
   

    console.log(numbers, operators)
    console.log(optToEvaluate)

    optToEvaluate.forEach(element => {
        let operatorIndex = operators.indexOf(element)
        let firstNumberIndex = operatorIndex
        let secondNumberIndex = operatorIndex + 1
        let firstNumber = numbers[firstNumberIndex]
        let secondNumber = numbers[secondNumberIndex]
        let result = 
        element === 'x' ? firstNumber * secondNumber : 
        element === '/' ? firstNumber / secondNumber : 
        element === '+' ? firstNumber + secondNumber :
        element === '-' ? firstNumber - secondNumber : null
    })

}


function equal (event) {
    return
}

function clear (event) {
    inputDiv.textContent = ''
    operation = []
}

function del (event) {
    inputDiv.textContent = inputDiv.textContent.slice(0,-1)
    operation = operation.slice(0,-1)

}
createButton(operatorSymbols,operatorsDiv)
createButton(functionSymbols,operatorsDiv)
createButton(numbersSymbols,numbersDiv)

