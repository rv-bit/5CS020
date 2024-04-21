const movePage = (page) => {
    const accountLogin = document.querySelector('[role="account-login"]');
    const accountSignup = document.querySelector('[role="account-signup"]');

    const loginDetails = accountLogin.querySelector('[role="login-details"]');
    const loginForm = accountLogin.querySelector('[role="login-form"]');

    const signUpDetails = accountSignup.querySelector('[role="signUp-details"]');
    const signUpForm = accountSignup.querySelector('[role="signUp-form"]');

    if (page === 'login') {
        accountLogin.classList.add('flex')
        accountLogin.classList.remove('hidden')

        accountSignup.classList.add('hidden')
        accountSignup.classList.remove('flex')

        loginForm.classList.add('slide-from-right');
        loginDetails.classList.add('slide-from-left');

        setTimeout(() => {
            loginForm.classList.remove('slide-from-right');
            loginDetails.classList.remove('slide-from-left');

            signUpDetails.style.order = '2';
            signUpForm.style.order = '1';
        }, 500); // Remove the class after 0.5s, which is the duration of the animation
    } else {
        accountSignup.classList.add('flex')
        accountSignup.classList.remove('hidden')

        accountLogin.classList.add('hidden')
        accountLogin.classList.remove('flex')

        signUpDetails.classList.add('slide-from-right');
        signUpForm.classList.add('slide-from-left');

        signUpDetails.style.order = '1';
        signUpForm.style.order = '2';

        setTimeout(() => {
            signUpDetails.classList.remove('slide-from-right');
            signUpForm.classList.remove('slide-from-left');
        }, 500); // Remove the class after 0.5s, which is the duration of the animation
    }
}

const checkDetailsForSignUp = () => {
    const email = document.getElementById('email-signup');
    const password = document.getElementById('password-signup');
    const passwordConfirmation = document.getElementById('password-confirmation');

    if (email.value === '') {
        email.parentElement.querySelector('p').classList.remove('hidden');
        email.parentElement.querySelector('p').classList.add('block');
        return;
    }

    if (password.value === '') {
        password.parentElement.querySelector('p').classList.remove('hidden');
        password.parentElement.querySelector('p').classList.add('block');
        return;
    }

    if (passwordConfirmation.value === '') {
        passwordConfirmation.parentElement.querySelector('p').classList.remove('hidden');
        passwordConfirmation.parentElement.querySelector('p').classList.add('block');
        return;
    }

    if (passwordConfirmation.value !== password.value) {
        passwordConfirmation.parentElement.querySelector('p').classList.remove('hidden');
        passwordConfirmation.parentElement.querySelector('p').classList.add('block');

        passwordConfirmation.parentElement.querySelector('p').textContent = 'Passwords do not match';
        return;
    }

    const data = {
        email: email.value,
        password: password.value,
    };

    localStorage.setItem('user', JSON.stringify(data));

    movePage('login');
}

const checkDetailsForLogin = () => {
    const email = document.getElementById('email-login');
    const password = document.getElementById('password-login');

    if (email.value === '') {
        email.parentElement.querySelector('p').classList.remove('hidden');
        email.parentElement.querySelector('p').classList.add('block');
        return;
    }

    if (password.value === '') {
        password.parentElement.querySelector('p').classList.remove('hidden');
        password.parentElement.querySelector('p').classList.add('block');
        return;
    }

    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
        movePage();
        return;
    }

    if (user.email !== email.value) {
        email.parentElement.querySelector('p').classList.remove('hidden');
        email.parentElement.querySelector('p').classList.add('block');

        email.parentElement.querySelector('p').textContent = 'Email does not exist';

        movePage();
        return;
    }

    if (user.password !== password.value) {
        password.parentElement.querySelector('p').classList.remove('hidden');
        password.parentElement.querySelector('p').classList.add('block');

        password.parentElement.querySelector('p').textContent = 'Password is incorrect';
        return;
    }

    user.loggedIn = true;
    localStorage.setItem('user', JSON.stringify(user));

    window.location.href = '../index.html';
}

document.addEventListener('DOMContentLoaded', () => {
    const formSignUp = document.getElementById('signUpForm');
    const formLogin = document.getElementById('loginForm');

    const emailLogin = document.getElementById('email-login');
    const passwordLogin = document.getElementById('password-login');

    const emailSignUp = document.getElementById('email-signup');
    const passwordSignUp = document.getElementById('password-signup');
    const passwordConfirmation = document.getElementById('password-confirmation');

    formLogin.addEventListener('submit', (e) => {
        e.preventDefault();
        checkDetailsForLogin();
    });

    emailLogin.addEventListener('keyup', () => {
        if (emailLogin.value === '') {
            emailLogin.parentElement.querySelector('p').classList.remove('hidden');
            emailLogin.parentElement.querySelector('p').classList.add('block');
        } else {
            emailLogin.parentElement.querySelector('p').classList.remove('block');
            emailLogin.parentElement.querySelector('p').classList.add('hidden');
        }
    });

    passwordLogin.addEventListener('keyup', () => {
        if (passwordLogin.value === '') {
            passwordLogin.parentElement.querySelector('p').classList.remove('hidden');
            passwordLogin.parentElement.querySelector('p').classList.add('block');
        } else {
            passwordLogin.parentElement.querySelector('p').classList.remove('block');
            passwordLogin.parentElement.querySelector('p').classList.add('hidden');
        }
    });

    formSignUp.addEventListener('submit', (e) => {
        e.preventDefault();
        checkDetailsForSignUp();
    });

    emailSignUp.addEventListener('keyup', () => {
        if (emailSignUp.value === '') {
            emailSignUp.parentElement.querySelector('p').classList.remove('hidden');
            emailSignUp.parentElement.querySelector('p').classList.add('block');
        } else {
            emailSignUp.parentElement.querySelector('p').classList.remove('block');
            emailSignUp.parentElement.querySelector('p').classList.add('hidden');
        }
    });

    passwordSignUp.addEventListener('keyup', () => {
        if (passwordSignUp.value === '') {
            passwordSignUp.parentElement.querySelector('p').classList.remove('hidden');
            passwordSignUp.parentElement.querySelector('p').classList.add('block');
        } else {
            passwordSignUp.parentElement.querySelector('p').classList.remove('block');
            passwordSignUp.parentElement.querySelector('p').classList.add('hidden');
        }
    });

    passwordConfirmation.addEventListener('keyup', () => {
        const password = document.getElementById('password-signup');
        const passwordConfirmation = document.getElementById('password-confirmation');

        if (password.value === passwordConfirmation.value) {
            passwordConfirmation.parentElement.querySelector('p').classList.remove('block');
            passwordConfirmation.parentElement.querySelector('p').classList.add('hidden');
        } else {
            passwordConfirmation.parentElement.querySelector('p').classList.remove('hidden');
            passwordConfirmation.parentElement.querySelector('p').classList.add('block');

            passwordConfirmation.parentElement.querySelector('p').textContent = 'Passwords do not match';
        }
    });
});