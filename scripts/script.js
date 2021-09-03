
// shortest function 
const sum = (n1, n2) => n1 + n2;
const sub = (n1, n2) => n1 - n2;
const prod = (n1, n2) => n1 * n2;
const div = (n1, n2) => n1 / n2;


const inputScreen = document.querySelector('#inputScreen');
const outputScreen = document.querySelector('#outputScreen');


// this function make a click or touch input
const inputType = 'click' || 'touchstart';

const buttons = document.querySelectorAll('div.buttons');

buttons.forEach((button) => {
    button.addEventListener(inputType,(tap) => {
        let inputValue = tap.target.getAttribute('data-key') || "";
        inputScreen.textContent += inputValue;
        outputScreen.textContent = "";
    })
})


// remove last item or C button click
const c_button = document.querySelector('#clear');
c_button.addEventListener(inputType,clearLastInput);

function clearLastInput(){
    outputScreen.textContent = "";
    inputScreen.textContent = inputScreen.textContent.slice(0, -1);
}


// clear all button

const ac_button = document.querySelector('#clearAll');

ac_button.addEventListener(inputType,clearAllInput);

function clearAllInput(){
    inputScreen.textContent = "";
    outputScreen.textContent = "";
}


// On click of Equal
const equal = document.querySelector('#evalt');
equal.addEventListener(inputType,showResult);

function showResult(){
    outputScreen.textContent = operator(inputScreen.textContent);
}





// This handles all keyboard input
window.addEventListener('keydown', (key) =>{
    console.log(key)
    if((key.location === 3 || key.key === '(' || key.key === ')') && !(key.key === "Enter")){
        inputScreen.textContent += key.key;
    }
    if(key.key === "Enter"){
        showResult();
    }
    if(key.key === "Backspace"){
        clearLastInput();
    }
})













// All in one operator function
function operator(exp) {

    while( exp.includes('(') || exp.includes(')') )
    {
        exp = braceSolver(exp);
    }
    
    return solver(exp);
}







// This function gets symbolic order of provided symbol in expression
function get_symbol_order(exp,sym1,sym2){
    const arr = [];

    for(let i of exp){
        if
            (
            i === sym1 && !(arr.includes(sym1))
            ||
            i === sym2 && !(arr.includes(sym2))
            )
            {
                arr.push(i);
            }
    }

    return arr;
}

// This function get bodmas order according to expression
function get_bodmas_order(exp){
    const mulDiv = get_symbol_order(exp,'*','/');
    const plusMin = get_symbol_order(exp,'+','-');

    return mulDiv.concat(plusMin);
}


// This function get symbolic Array 
function get_symbol_array(exp){
    const arr = [];

    for(let i of exp){
        if( i === '*' || i === '/' || i === '+' || i === '-' )
        {
            arr.push(i);
        }
    }

    return arr;
}


// This function get numeric Array 
function get_numbers_array(exp){
    const arr = [];
    let num = '';
    
    for(let i = 0; i < exp.length; i++){
        if(!(exp[i] === '/' || exp[i] === '*' || exp[i] === '+' || exp[i] === '-'))
        {
            num += exp[i];
        }
        else{
            num = Number(num);
            arr.push(num);
            num = '';
        }

        if(i === exp.length - 1){
            num = Number(num);
            arr.push(num);
            num = '';
        }
    }

    return arr;
}

// This function combined symbolic and numeric Array
function the_expression_array(exp){
    const symbols = get_symbol_array(exp);
    const numbers = get_numbers_array(exp);
    const combined = [];

    for(let i = 0; i < exp.length; i++){
        combined.push(numbers[i], symbols[i]);
    }

    let undef = combined.indexOf(undefined);
    
    while(combined.includes(undefined))
    {
        combined.splice(undef,1);
    }

    return combined;
}



// This function will solve the expression
function solver(exp){
    const expression = the_expression_array(exp);  
    let bodmas = get_bodmas_order(exp);            
    let result;                     

    while(expression.includes(bodmas[0]) ){                                    
        let index = expression.indexOf(bodmas[0]);  

        if(index === -1){                           
            bodmas.shift();
        }
        else{                                       
            let arg1 = expression[index - 1];       
            let arg2 = expression[index + 1];       
            result = applyFunction(bodmas[0],arg1,arg2); 
        }
        expression.splice(index - 1, 3, result);  
        bodmas = get_bodmas_order(expression);      
    }

    return expression[0];
}



function applyFunction(symbol,arg1,arg2){
    let result;
    if(symbol === '/'){
        result = div(arg1,arg2);
    }
    else if(symbol === '*'){
        result = prod(arg1,arg2);
    }
    else if(symbol === '+'){
        result = sum(arg1,arg2);
    }
    else if(symbol === '-'){
        result = sub(arg1,arg2);
    }
    return result;
}


// this function solve braces
function braceSolver(exp){
    let start = exp.indexOf('(') +1;
    let end = exp.indexOf(')') || exp.length - 1;

    let braceExp = exp.slice(start,end);

    let result = solver(braceExp);

    exp = exp.replace(`(${braceExp})`, 'N');
    exp = exp.replace('N',`${result}`);

    return exp;
}


