const movePage = (page) => {
    if (page === 'login') {
        const accountLogin = document.querySelector('[role="account-login"]');
        const accountSignup = document.querySelector('[role="account-signup"]');

        accountLogin.classList.add('flex')
        accountLogin.classList.remove('hidden')

        accountSignup.classList.add('hidden')
        accountSignup.classList.remove('flex')
        return;
    }

    const accountLogin = document.querySelector('[role="account-login"]');
    const accountSignup = document.querySelector('[role="account-signup"]');

    accountSignup.classList.add('flex')
    accountSignup.classList.remove('hidden')

    accountLogin.classList.add('hidden')
    accountLogin.classList.remove('flex')
}