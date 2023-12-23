const r = document.querySelector(':root');
let dark = localStorage.getItem('dark');
if (dark === 'false') {
    dark = false;
} else {
    dark = true;
}
setTheme(dark);

document.addEventListener('DOMContentLoaded', () => {
    const logo = document.querySelector('header img');
    const themeButton = document.querySelector('header button');
    
    if (!dark) {
        logo.src = 'assets/signature-black.png';
        themeButton.innerHTML = 'Dark';
    }

    const form = document.querySelector('form');
    const name = document.getElementById('name');
    const nameError = document.querySelector('input#name + output');
    const email = document.getElementById('email');
    const emailError = document.querySelector('input#email + output');
    const message = document.getElementById('message');
    const messageError = document.querySelector('textarea#message + output');
    const messageInfo = document.querySelector('textarea#message + output + output');
    let nameValid, emailValid, messageValid, lengthValid = false;
    let form_errors = [];

    name.addEventListener('input', checkName);
    email.addEventListener('input', checkEmail);
    message.addEventListener('input', checkMessage);
    message.addEventListener('input', checkLength);
    form.addEventListener('submit', submitForm);

    themeButton.addEventListener('click', changeTheme);

    function changeTheme() {
        if (dark) {
            dark = false;
            localStorage.setItem('dark', 'false');
            setTheme(dark);
            logo.src = 'assets/signature-black.png';
            themeButton.innerHTML = 'Dark';
        } else {
            dark = true;
            localStorage.removeItem('dark');
            setTheme(dark);
            logo.src = 'assets/signature-white.png';
            themeButton.innerHTML = 'Light';
        }
    }

    function submitForm(event) {
        event.preventDefault();
        if (!(nameValid && emailValid && messageValid && lengthValid)) {
            alert('invalid form content');
        } else {
            let errors_json = JSON.stringify(form_errors);

            let jsonInput = document.createElement('input');
            jsonInput.setAttribute('type', 'hidden');
            jsonInput.setAttribute('name', 'form_errors');
            jsonInput.setAttribute('id', 'form_errors');
            jsonInput.setAttribute('value', errors_json);
            form.appendChild(jsonInput);

            form.submit();
        }
    }

    function checkName() {
        if (name.validity.valid) {
            nameError.style.visibility = 'hidden';
            nameValid = true;
        } else {
            nameError.style.visibility = 'visible';
            nameValid = false;
            form_errors.push('name missing');
        }
    }

    function checkEmail() {
        if (email.validity.valid) {
            emailError.style.visibility = 'hidden';
            emailValid = true;
        } else {
            if (email.validity.valueMissing) {
                emailError.innerHTML = 'Please input your email';
                emailError.style.visibility = 'visible';
                emailValid = false;
                form_errors.push('email missing');
            } else {
                emailError.innerHTML = 'Please input a valid email';
                emailError.style.visibility = 'visible';
                emailValid = false;
                form_errors.push('email not in correct format');
            }
        }
    }

    function clear() {
        messageError.style.visibility = 'hidden';
        messageError.style.removeProperty('animation-name');
        messageError.style.removeProperty('animation-duration');
    }

    function checkMessage() {
        if (message.validity.valueMissing) {
            messageError.innerHTML = 'Please input your message';
            messageError.style.visibility = 'visible';
            messageValid = false;
            form_errors.push('message missing');
            return;
        }

        let content = message.value;
        if (!/^([A-Za-z0-9 ,.!:;'])*$/.test(content)) {
            messageError.innerHTML = 'Please do not inlcude illegal characters';
            messageError.style.visibility = 'visible';
            messageError.style.animationName = 'disappear';
            messageError.style.animationDuration = '1s';

            setTimeout(clear, 1000);

            messageValid = false;
            console.log('1');
            form_errors.push('message include illegal character');
        } else {
            messageError.style.visibility = 'hidden';
            messageValid = true;
        }
    }

    function checkLength() {
        let length = message.value.length;
        messageInfo.innerHTML = length + '/100';
        if (length < 80) {
            messageInfo.style.color = 'black';
            lengthValid = true;
            console.log('2');
        } else if (length > 100) {
            messageInfo.style.color = 'red';
            lengthValid = false;
            form_errors.push('message too long');
        } else {
            messageInfo.style.color = 'darkgoldenrod';
            lengthValid = true;
        }
    }
});

function setTheme(dark) {
    if (dark) {
        r.style.setProperty('--nav-color', '#205295');
        r.style.setProperty('--text-color', 'rgb(243, 243, 243)');
        r.style.setProperty('--home-color', '#0A2647');
        r.style.setProperty('--project-color', '#144272');
        r.style.setProperty('--button-text-color', '#333');
        r.style.setProperty('--button-hover-color', '#a0a0a0');
        r.style.setProperty('--contact-color', '#0A2647');
    } else {
        r.style.setProperty('--nav-color', 'white');
        r.style.setProperty('--text-color', '#333');
        r.style.setProperty('--home-color', '#fffdde');
        r.style.setProperty('--project-color', '#e9fac7');
        r.style.setProperty('--button-text-color', 'white');
        r.style.setProperty('--button-hover-color', '#646464');
        r.style.setProperty('--contact-color', '#eee');
    }
}