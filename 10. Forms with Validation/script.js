const container = document.querySelector('.container');
const signInBtn = document.querySelector('.signin-btn');
const signUpBtn = document.querySelector('.signup-btn');
const headingSpan2 = document.querySelector('.heading-span-2');

signUpBtn.addEventListener('click', () => {
    container.classList.add('change');
    setTimeout(() => {
        headingSpan2.textContent = "Up";
    }, 200);
    form.className = 'form sign-up';
    clearForm();
});

signInBtn.addEventListener('click', () => {
    container.classList.remove('change');
    setTimeout(() => {
        headingSpan2.textContent = "In";
    }, 200);
    form.className = 'form sign-in';
    clearForm();
});

const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

const form = document.querySelector('.form');

const error = (input, message) => {
    const inputWrapper = input.parentElement;
    inputWrapper.className = 'form-input-wrapper error inp';
    inputWrapper.querySelector('.message').textContent = message;
}

const success = (input) => {
    const inputWrapper = input.parentElement;
    inputWrapper.className = 'form-input-wrapper success inp';
    inputWrapper.querySelector('.message').textContent = '';
}

const clearForm = () => {
    const formInputs = document.querySelectorAll('.form-input-wrapper');
    formInputs.forEach((item) => {
        item.className = 'form-input-wrapper inp';
        form.reset();
    })
}

const checkLength = (input, min, max) => {
    if (input.value.length < min) {
        error(input, `${input.id} must be at least ${min} characters`);
    }
    else if (input.value.length > max) {
        error(input, `${input.id} must be less than ${max} characters`);
    }
    else {
        success(input);
    }
}

const checkEmail = (input) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        success(input);
    }
    else {
        error(input, 'Email is not valid');
    }
}

const matchPasswords = (input1, input2) => {
    if (input1.value === '' || input2.value === '') {
        return;
    }
    if (input1.value !== input2.value) {
        error(input2, 'Passwords do not match');
    }
    else {
        success(input2);
    }
}

const checkRequiredFields = (inputArray) => {
    inputArray.forEach(input => {
        if (input.value.trim() === '') {
            if (input.id === 'password2') {
                error(input, 'Password confirmation is required');
            }
            else {
                error(input, `${input.id} is required`);
            }

        }
        else {
            success(input);
        }
    })
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (form.classList[1] === 'sign-up') {
        checkRequiredFields([username, email, password, password2]);
        checkLength(username, 3, 15);
        checkLength(password, 6, 25);
        matchPasswords(password, password2);

    }
    else {
        checkRequiredFields([email, password]);
    }
    checkEmail(email);
})