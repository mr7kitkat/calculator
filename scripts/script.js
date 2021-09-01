// Show message on input Screen
const inputScr = document.querySelector('#inputScreen');
const outputScr = document.querySelector('#outputScreen');

const buttons = document.querySelectorAll('.buttons');
let inputtext;
buttons.forEach((button) => {
    button.addEventListener(('click' || 'touchstart'), (e) => {
        outputScr.textContent = "";
        inputtext = e.target.getAttribute('data-key');
        if (!inputtext){
            inputtext = "";
        }
        inputScr.textContent += inputtext;
    });
});

// Clear All Button Setup
const clearAll = document.querySelector('#clearAll');

clearAll.addEventListener(('click' || 'touchstart'),clearAllInput);

function clearAllInput(){
    inputScr.textContent = "";
    outputScr.textContent = "";
}

// Clear single input button setup
const clearOne = document.querySelector('#clear');

clearOne.addEventListener(('click' || 'touchstart'), clearOneInput);

function clearOneInput(){
    let cutout = inputScr.textContent;
    inputScr.textContent = cutout.slice(0, cutout.length-1);
    outputScr.textContent = "";
}

// Evaluate function 
const equalClick = document.querySelector('#evalt');

equalClick.addEventListener(('click' || 'touchstart'), calculation);

function calculation(text) {
    text = inputScr.textContent;
    text = text.replaceAll('^','**');
    outputScr.textContent = eval(text);
}