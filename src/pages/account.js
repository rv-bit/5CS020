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