const operatorSymbols = ['+','-','x','/','C','del', '=']
const numbersSymbols = [...Array(10).keys()]
const operatorsDiv = document.querySelector('#operators')
const inputDiv = document.querySelector('#inputtext')
const numbersDiv = document.querySelector('#numbers')
let operation = [0]

function createButton (arr,div){
    arr.forEach(element => {
        iButton = document.createElement('button')
        iButton.textContent = String(element)
        if 
        if element === 'C' ? iButton.addEventListener('click',clear) : 
            element === 'del' ? iButton.addEventListener('click',del) : null
            element === '=' ? iButton.addEventListener('click',equal) : 
        div.appendChild(iButton)
    });
}

function input (event) {
    operation +=event.target.textContent
    inputDiv.textContent += event.target.textContent
    console.log(operation)
}

function equal (event) {
    return
}

function clear (event) {
    inputDiv.textContent = ''
}

function del (event) {
    inputDiv
}
createButton(operatorSymbols,operatorsDiv)
createButton(numbersSymbols,numbersDiv)

