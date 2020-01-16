const introBtn = document.querySelector('.intro-btn');
const introContainer = document.querySelector('.intro')

let currentStepId = 0;
let stepToBeLoaded = currentStepId;
let fieldsetArray = document.querySelectorAll('fieldset');
const currentStepContainer = document.getElementsByTagName("fieldset");

function showInputValue(val) {
    return document.querySelector('#sumValue').innerHTML = val + ' eur';
}

const leaveIntro = () => {
    event.preventDefault();
    introContainer.classList.add('slide-out');
    loadStep();
    setTimeout(() => introContainer.classList.add('hide'), 200)
}

function validateInputs(value) {
    console.log(event);
    event.preventDefault();
    // console.log(document.getElementById('moneySum').value);
    loadStep();
}

// Valdiate loop ang go next
function nextBtn() {
    console.log(fieldsetArray.length);
    event.preventDefault();
    let validation = true;
    let fieldset = document.querySelectorAll('fieldset')[currentStepId];
    let inputsCount = fieldset.querySelectorAll('input').length;
    let textarea = fieldset.querySelector('textarea');
    let select = fieldset.querySelector('select');

    // validating inputs
    for (i = 0; i < inputsCount; ++i) {
        var inputEl = fieldset.querySelectorAll('input')[i];

        if (inputEl.getAttribute('type') !== 'submit' && inputEl.getAttribute('type') !== 'range') {
            console.log(inputEl);
            console.log(i);
            if (inputEl.value === '') {
                validation = false;
                let errMsg = fieldset.querySelector('#err-msg');
                errMsg.innerHTML = 'Neužpildėte visų laukų!';
                errMsg.className = 'error';
                console.log('emptyyyyy');
                break;
            } else {
                // errMsg.className = 'hide';
                validation = true;
            }
        }
    }

    // validate textarea value
    if (textarea) {
        let errMsg = document.getElementById('err-msg');

        if (textarea.value === '') {
            errMsg.innerHTML = 'Neužpildėte visų laukų!';
            errMsg.className = 'error';
            validation = false;
        }
        else {
            errMsg ? errMsg.className = 'hide': null;
        }
    }

    if (validation) {
        if (event.target.value === 'Siųsti') {
            // Send form data
        } else {
            loadStep()
            console.log('validation succes call next()');
        }
    }
}

function loadStep() {
    event ? event.preventDefault() : null;
    currentStepId === 4 ? summaryText() : null;

    if (event.target.innerHTML === 'Pildyti paraišką') {
        // LOADS STEP 0
        // console.log('currentStepId: ' + currentStepId);
        currentStepContainer[stepToBeLoaded].className = 'slide-in';
        stepToBeLoaded++;
        // console.log('stepToBeLoaded: ' + stepToBeLoaded);
    } else if (event.target.value === 'Kitas' || event.target.value === 'Kitas') {
        // Hiding current form input container
        currentStepContainer[currentStepId].className = 'slide-out';
        // Enabling newly loaded container
        currentStepContainer[stepToBeLoaded].className = 'slide-in';
        // setting timeOut for events that should happen after animations.
        setTimeout(() => {
            currentStepContainer[currentStepId].className = 'hide';
            currentStepId++;
            stepToBeLoaded = currentStepId + 1
            // console.log('currentStepId: ' + currentStepId);
            // console.log('stepToBeLoaded: ' + stepToBeLoaded);
        }, 200);
    }
    else if (event.target.value === 'Grįžti') {
        stepToBeLoaded = currentStepId - 1;
        // Hiding current form input container
        currentStepContainer[currentStepId].className = 'slide-out';
        // setting timeOut for events that should happen after animations.
        setTimeout(() => {
            // Enabling newly loaded container
            currentStepContainer[stepToBeLoaded].className = 'slide-in';
            currentStepContainer[currentStepId].className = 'hide';
            currentStepId--;
            stepToBeLoaded = currentStepId + 1;
            // console.log('currentStepId: ' + currentStepId);
            // console.log('stepToBeLoaded: ' + stepToBeLoaded);
        }, 200);
    }

};

function summaryText() {
    let money = document.querySelector('#money');
    let text = document.querySelector('#whatFor');
    let employ = document.querySelector('#employed');
    let married = document.querySelector('#married');
    let job = document.querySelector('#job');

    // Text from Step 3 
    let isEmployedSel = document.querySelector('#isEmployed');
    let isEmployedText = isEmployedSel.options[isEmployedSel.selectedIndex];
    // Text from Step 4
    let isMarriedSel = document.querySelector('#isMarried');
    let isMarriedText = isMarriedSel.options[isMarriedSel.selectedIndex];
    // Text from Step 5 text
    let howLongSel = document.querySelector('#jobStatus');
    let howLongText = howLongSel.options[howLongSel.selectedIndex];

    money.innerHTML = `${document.querySelector('#moneySum').value} eur.`;
    text.innerHTML = `${document.querySelector('#text').value}`;
    employ.innerHTML = `${isEmployedText.text}`;
    married.innerHTML = `${isMarriedText.text}`;
    job.innerHTML = `${howLongText.text}`;
}

introBtn.addEventListener('click', leaveIntro);
