/* ========================================
   LOGIN PAGE - JAVASCRIPT
   ======================================== */

// ========== ELEMENTOS DO DOM ==========
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const togglePasswordBtn = document.getElementById('togglePassword');
const successMessage = document.getElementById('successMessage');
const errorAlert = document.getElementById('errorAlert');
const signupBtn = document.getElementById('signupBtn');
const loader = document.getElementById('loader');

// ========== VALIDAÇÃO DE EMAIL ==========
/**
 * Valida se o email está em formato correto
 * @param {string} email - Email a validar
 * @returns {boolean} - True se válido
 */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ========== VALIDAÇÃO DE SENHA ==========
/**
 * Valida se a senha atende aos requisitos mínimos
 * @param {string} password - Senha a validar
 * @returns {boolean} - True se válido
 */
function validatePassword(password) {
    return password.length >= 6;
}

// ========== TOGGLE DE VISIBILIDADE DA SENHA ==========
togglePasswordBtn.addEventListener('click', () => {
    const isPassword = passwordInput.type === 'password';
    
    // Alternar tipo de input
    passwordInput.type = isPassword ? 'text' : 'password';
    
    // Alternar ícone
    togglePasswordBtn.innerHTML = `<span class="eye-icon">${isPassword ? '🙈' : '👁️'}</span>`;
});

// ========== LIMPEZA DE MENSAGENS DE ERRO ==========
/**
 * Remove mensagem de erro de um campo
 */
emailInput.addEventListener('focus', () => {
    emailError.classList.remove('show');
    emailInput.parentElement.style.borderColor = '';
});

passwordInput.addEventListener('focus', () => {
    passwordError.classList.remove('show');
    passwordInput.parentElement.style.borderColor = '';
});

// ========== VALIDAÇÃO EM TEMPO REAL ==========
emailInput.addEventListener('blur', () => {
    if (emailInput.value && !validateEmail(emailInput.value)) {
        emailError.textContent = 'Por favor, digite um email válido';
        emailError.classList.add('show');
    }
});

passwordInput.addEventListener('blur', () => {
    if (passwordInput.value && !validatePassword(passwordInput.value)) {
        passwordError.textContent = 'A senha deve ter no mínimo 6 caracteres';
        passwordError.classList.add('show');
    }
});

// ========== SUBMISSÃO DO FORMULÁRIO ==========
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Limpar mensagens anteriores
    emailError.classList.remove('show');
    passwordError.classList.remove('show');
    errorAlert.classList.remove('show');
    errorAlert.textContent = '';

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    let isValid = true;

    // Validar email
    if (!email) {
        emailError.textContent = 'Email é obrigatório';
        emailError.classList.add('show');
        isValid = false;
    } else if (!validateEmail(email)) {
        emailError.textContent = 'Por favor, digite um email válido';
        emailError.classList.add('show');
        isValid = false;
    }

    // Validar senha
    if (!password) {
        passwordError.textContent = 'Senha é obrigatória';
        passwordError.classList.add('show');
        isValid = false;
    } else if (!validatePassword(password)) {
        passwordError.textContent = 'A senha deve ter no mínimo 6 caracteres';
        passwordError.classList.add('show');
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    // Simular envio (desabilitar botão e mostrar loader)
    const submitBtn = loginForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    loader.classList.add('show');

    try {
        // Simular delay de requisição
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Armazenar dados do usuário no localStorage
        const userData = {
            email: email,
            name: email.split('@')[0],
            loginTime: new Date().toISOString()
        };
        localStorage.setItem('currentUser', JSON.stringify(userData));
        localStorage.setItem('isLoggedIn', 'true');

        // Mostrar mensagem de sucesso
        successMessage.classList.add('show');

        // Redirecionar após 1 segundo
        setTimeout(() => {
            window.location.href = './home.html';
        }, 1000);

    } catch (error) {
        console.error('Erro ao fazer login:', error);
        errorAlert.textContent = 'Erro ao conectar. Por favor, tente novamente.';
        errorAlert.classList.add('show');
        
        submitBtn.disabled = false;
        loader.classList.remove('show');
    }
});

// ========== BOTÃO CRIAR CONTA ==========
signupBtn.addEventListener('click', () => {
    // Mostrar animação
    signupBtn.style.animation = 'none';
    setTimeout(() => {
        signupBtn.style.animation = '';
    }, 10);

    // Simular redirect para página de signup (poderia ser um modal)
    alert('Funcionalidade de criação de conta em breve! Por enquanto, use:\nEmail: usuario@email.com\nSenha: 123456');
});

// ========== VERIFICAR SE JÁ ESTÁ LOGADO ==========
window.addEventListener('load', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        window.location.href = './home.html';
    }
});

// ========== PREVENIR AUTOFILL INDESEJADO ==========
/**
 * Limpa o campo de email ao carregar a página se estiver preenchido automaticamente
 */
document.addEventListener('DOMContentLoaded', () => {
    // Dar foco e remover foco para resetar autofill
    emailInput.blur();
});

// ========== ENTER PARA SUBMETER ==========
/**
 * Permite submeter o formulário pressionando Enter na senha
 */
passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        loginForm.dispatchEvent(new Event('submit'));
    }
});
