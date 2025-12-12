// Toggle password visibility
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

togglePassword.addEventListener('click', (e) => {
    e.preventDefault();
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    // Toggle icon
    const icon = togglePassword.querySelector('i');
    icon.classList.toggle('fa-eye');
    icon.classList.toggle('fa-eye-slash');
});

// Clear error messages on input
const emailInput = document.getElementById('email');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

emailInput.addEventListener('input', () => {
    emailError.textContent = '';
});

passwordInput.addEventListener('input', () => {
    passwordError.textContent = '';
});

// Form submission
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const remember = document.getElementById('remember').checked;
    
    // Reset error messages
    emailError.textContent = '';
    passwordError.textContent = '';
    
    let isValid = true;
    
    // Email validation
    if (!email) {
        emailError.textContent = 'Email is required';
        isValid = false;
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            emailError.textContent = 'Please enter a valid email address';
            isValid = false;
        }
    }
    
    // Password validation
    if (!password) {
        passwordError.textContent = 'Password is required';
        isValid = false;
    } else if (password.length < 6) {
        passwordError.textContent = 'Password must be at least 6 characters';
        isValid = false;
    }
    
    if (!isValid) {
        return;
    }
    
    // Disable button and show loading state
    const submitBtn = this.querySelector('.login-btn');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Signing In...';
    
    // Store remember me preference
    if (remember) {
        localStorage.setItem('rememberEmail', email);
    } else {
        localStorage.removeItem('rememberEmail');
    }
    
    // Simulate API call
    setTimeout(() => {
        console.log('Login attempt:', {
            email: email,
            password: password,
            remember: remember
        });
        
        // Success animation
        submitBtn.style.background = '#00D084';
        submitBtn.textContent = '✓ Success!';
        
        // Sliding transition to dashboard
        setTimeout(() => {
            document.querySelector('.login-wrapper').style.animation = 'slideOut 0.6s ease-in forwards';
            setTimeout(() => {
                alert('Login successful! (This is a demo)');
                document.getElementById('loginForm').reset();
                document.querySelector('.login-wrapper').style.animation = '';
                submitBtn.style.background = '';
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                passwordInput.setAttribute('type', 'password');
                togglePassword.querySelector('i').classList.remove('fa-eye-slash');
                togglePassword.querySelector('i').classList.add('fa-eye');
            }, 600);
        }, 1500);
    }, 1000);
});

// Social login buttons
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const provider = btn.classList[1];
        console.log('Social login attempt with:', provider);
        alert(`Social login with ${provider.replace('-btn', '')} is not yet implemented`);
    });
});

// Forgot Password Modal
const forgotPasswordBtn = document.getElementById('forgotPasswordBtn');
const forgotPasswordModal = document.getElementById('forgotPasswordModal');
const closeModal = document.getElementById('closeModal');
const forgotPasswordForm = document.getElementById('forgotPasswordForm');
const resetEmail = document.getElementById('resetEmail');
const resetEmailError = document.getElementById('resetEmailError');
const resetSuccess = document.getElementById('resetSuccess');
const backToLoginBtn = document.getElementById('backToLoginBtn');

forgotPasswordBtn.addEventListener('click', (e) => {
    e.preventDefault();
    forgotPasswordModal.classList.add('show');
});

closeModal.addEventListener('click', () => {
    forgotPasswordModal.classList.remove('show');
    resetSuccess.style.display = 'none';
    forgotPasswordForm.style.display = 'block';
    resetEmail.value = '';
    resetEmailError.textContent = '';
});

window.addEventListener('click', (e) => {
    if (e.target === forgotPasswordModal) {
        forgotPasswordModal.classList.remove('show');
        resetSuccess.style.display = 'none';
        forgotPasswordForm.style.display = 'block';
        resetEmail.value = '';
        resetEmailError.textContent = '';
    }
});

forgotPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    resetEmailError.textContent = '';
    
    const email = resetEmail.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
        resetEmailError.textContent = 'Email is required';
        return;
    }
    
    if (!emailRegex.test(email)) {
        resetEmailError.textContent = 'Please enter a valid email address';
        return;
    }
    
    // Disable button and show loading state
    const submitBtn = forgotPasswordForm.querySelector('.modal-btn');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    // Simulate API call
    setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        
        // Show success message
        forgotPasswordForm.style.display = 'none';
        resetSuccess.style.display = 'block';
    }, 1500);
});

backToLoginBtn.addEventListener('click', () => {
    forgotPasswordModal.classList.remove('show');
    resetSuccess.style.display = 'none';
    forgotPasswordForm.style.display = 'block';
    resetEmail.value = '';
    resetEmailError.textContent = '';
});

window.addEventListener('load', function() {
    const savedEmail = localStorage.getItem('rememberEmail');
    if (savedEmail) {
        emailInput.value = savedEmail;
        document.getElementById('remember').checked = true;
        // Focus on password field
        passwordInput.focus();
    }
});
