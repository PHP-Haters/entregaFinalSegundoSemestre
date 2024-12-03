const toggleThemeButton = document.getElementById('toggle-theme');
const body = document.body;

const showLoginButton = document.getElementById('show-login');
const showRegisterButton = document.getElementById('show-register');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const sendLogin = document.getElementById('btn-login');

toggleThemeButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
});

showLoginButton.addEventListener('click', () => {
    toggleForms(loginForm, registerForm);
    setActiveButton(showLoginButton, showRegisterButton);
});

showRegisterButton.addEventListener('click', () => {
    toggleForms(registerForm, loginForm);
    setActiveButton(showRegisterButton, showLoginButton);
});

function toggleForms(showForm, hideForm) {
    hideForm.classList.remove('active');
    showForm.classList.add('active');
}

function setActiveButton(activeButton, inactiveButton) {
    activeButton.classList.add('active');
    inactiveButton.classList.remove('active');
}

sendLogin.addEventListener('click', () => {

});

async function getData() {
    const url = "https://example.org/products.json";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json);
    } catch (error) {
        console.error(error.message);
    }
}

