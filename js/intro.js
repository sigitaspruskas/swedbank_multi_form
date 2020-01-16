const introContainer = document.querySelector('.intro')

let currentStepId = 0;
let stepToBeLoaded = currentStepId;
let fieldsetNodeList = document.querySelectorAll('fieldset');
const currentStepContainer = document.getElementsByTagName("fieldset");

/**
 * Function shows range input value in HTML element.
 * @param {*} val 
 */
function showInputValue(val) {
    return document.querySelector('#sumValue').innerHTML = val + ' eur';
}

/**
 * Function hides intro window, and renders first form step.
 */
const goToForm = () => {
    event.preventDefault();
    introContainer.className = 'intro slide-out';
    loadNextStep();
    setTimeout(() => introContainer.classList.add('hide'), 200)
}

/**
 * Function closes form step 1 question, and renders Intro container.
 */
function closeForm() {
    event.preventDefault();
    currentStepContainer[0].className = 'hide';
    introContainer.className = 'intro slide-in';
    currentStepId = 0;
    stepToBeLoaded = currentStepId;
};

/**
 * Function handles which question content to load in HTML, depending on previous answer.
 */
function renderOptionalStep() {
    if (currentStepId === 2) {
        const selection = document.querySelector('#isEmployed');
        const value = selection.value;
        const questionContainer = document.querySelector('#dependingOnAnswer');

        if (value === 'yes') {
            // Question about time spent at current job position will be rendered
            questionContainer.innerHTML = `
            <h1>Vartojimo Paskolos paraiška</h1>
            <h2>Dabartinė darbovietė</h2>                
            <p class="text-justify">
                Kiek laiko dirbate dabartinėje darbovietėje?
            </p>
            <select id="jobStatus">
                <option value="under6Months">Mažiau nei 6 mėn.</option>
                <option value="underOneYear">Tarp 6 mėn ir 1 metų</option>
                <option value="moreThanAYear">Daugiau nei 1 metai</option>
            </select>
            <input type="submit" value="Kitas" class="button" onclick="nextBtn()">
            <input type="submit" value="Grįžti" class="button" onclick="backBtn()">`;
        } else {
            // Question about marital status will be rendered
            questionContainer.innerHTML = `
            <h1>Vartojimo Paskolos paraiška</h1>
            <h2>Ar turite sutuoktinį?</h2>                
            <p class="text-justify">
                Nurodykite šeiminynį statusą.
            </p>
            <select id="isMarried">
                <option value="yes">Taip</option>
                <option value="no">Ne</option>
            </select>
            <input type="submit" value="Kitas" class="button" onclick="nextBtn()">
            <input type="submit" value="Grįžti" class="button" onclick="backBtn()">`;
        }
    }
}

/**
 * Basic inputs validation. If validation is successful, function handles current step counter 
 * variables, then calls renderOptionalStep() and loadNextStep() functions.
 */
function nextBtn() {
    event.preventDefault();
    let validation = true;
    let fieldset = fieldsetNodeList[currentStepId];
    let inputsCount = fieldset.querySelectorAll('input').length;
    let textarea = fieldset.querySelector('textarea');

    // Inputs validation
    for (i = 0; i < inputsCount; ++i) {
        var inputEl = fieldset.querySelectorAll('input')[i];

        if (inputEl.getAttribute('type') !== 'submit' && inputEl.getAttribute('type') !== 'range') {

            if (inputEl.value === '') {
                validation = false;
                let errMsg = fieldset.querySelector('#err-msg');
                errMsg.innerHTML = 'Neužpildėte visų laukų!';
                errMsg.className = 'error';
                break;
            } else validation = true;
        }
    }

    // Textarea validation
    if (textarea) {
        let errMsg = document.getElementById('err-msg');

        if (textarea.value === '') {
            errMsg.innerHTML = 'Neužpildėte visų laukų!';
            errMsg.className = 'error';
            validation = false;
        }
        else errMsg ? errMsg.className = 'hide' : null;

    }

    // validation success 
    if (validation) {
        if (event.target.value === 'Siųsti') {
            // Do smth to send form data
            const div = document.createElement('div')
            div.innerHTML = `
            <h2>Užklausa sėkmingai išsiųsta!</h2>                
            <p class="success">
                Gavome jūsų prašymą, mūsų konsultantai peržvelgs jį, ir susisieks su jumis per 3 darbo dienas.
            </p>`;
            currentStepContainer[currentStepId].className = 'hide';
            setTimeout(() => {
                div.className = 'slide-in';
                document.querySelector('.container').appendChild(div);
            }, 10);
        } else {
            renderOptionalStep();
            loadNextStep();
            currentStepId++;
            stepToBeLoaded++;
        }
    }
}

/**
 * Function handles previous step rendering to HTML
 */
function backBtn() {
    event.preventDefault();
    stepToBeLoaded = currentStepId - 1;
    currentStepContainer[currentStepId].className = 'hide';
    setTimeout(() => {
        currentStepContainer[stepToBeLoaded].className = 'slide-in';
        currentStepId--;
        stepToBeLoaded = currentStepId + 1;
    }, 10);
}

/**
 * Function renders next question to HTML by adding and removing css classes.
 */
function loadNextStep() {
    event ? event.preventDefault() : null;
    currentStepId === 3 ? summaryText() : null;

    if (event.target.value !== 'Kitas') {
        // This activates when Intro window button is clicked
        currentStepContainer[stepToBeLoaded].className = 'slide-in';
        stepToBeLoaded++;
    } else {
        currentStepContainer[currentStepId].className = 'slide-out';
        currentStepContainer[stepToBeLoaded].className = 'slide-in';
        // setting timeOut for events that should happen after animations.
        setTimeout(() => {
            currentStepContainer[currentStepId - 1].className = 'hide';
        }, 200);
    }
};

/**
 * Text handling for summary and contacts step.
 */
function summaryText() {
    // selected HTML elements for summary information placement
    const money = document.querySelector('#money'),
        text = document.querySelector('#whatFor'),
        employ = document.querySelector('#employed'),
        married = document.querySelector('#married'),
        job = document.querySelector('#job');

    // Text from Step 3 
    const isEmployedSel = document.querySelector('#isEmployed');
    const isEmployedText = isEmployedSel.options[isEmployedSel.selectedIndex];

    // Text from Step 4
    const isMarriedSel = document.querySelector('#isMarried');
    if (isMarriedSel) {
        const isMarriedText = isMarriedSel.options[isMarriedSel.selectedIndex];
        married.innerHTML = `${isMarriedText.text}`;
        document.querySelector('#married-text-box').className = 'summary-text-box';
        document.querySelector('#job-text-box').className = 'hide';
    };

    // Text from Step 5 text
    const howLongSel = document.querySelector('#jobStatus');
    if (howLongSel) {
        const howLongText = howLongSel.options[howLongSel.selectedIndex];
        job.innerHTML = `${howLongText.text}`;
        document.querySelector('#married-text-box').className = 'hide';
        document.querySelector('#job-text-box').className = 'summary-text-box';
    };

    money.innerHTML = `${document.querySelector('#moneySum').value} eur.`;
    text.innerHTML = `${document.querySelector('#text').value}`;
    employ.innerHTML = `${isEmployedText.text}`;
};
