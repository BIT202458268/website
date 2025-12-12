// Toggle password visibility
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');
const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
const confirmPasswordInput = document.getElementById('confirmPassword');

togglePassword.addEventListener('click', (e) => {
    e.preventDefault();
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    const icon = togglePassword.querySelector('i');
    icon.classList.toggle('fa-eye');
    icon.classList.toggle('fa-eye-slash');
});

toggleConfirmPassword.addEventListener('click', (e) => {
    e.preventDefault();
    const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    confirmPasswordInput.setAttribute('type', type);
    const icon = toggleConfirmPassword.querySelector('i');
    icon.classList.toggle('fa-eye');
    icon.classList.toggle('fa-eye-slash');
});

// Email verification
const verifyEmailBtn = document.getElementById('verifyEmailBtn');
const emailInput = document.getElementById('email');
const verificationStatus = document.getElementById('verificationStatus');
const verificationCode = document.getElementById('verificationCode');
const confirmCodeBtn = document.getElementById('confirmCodeBtn');
const verifiedStatus = document.getElementById('verifiedStatus');
const emailError = document.getElementById('emailError');
const codeError = document.getElementById('codeError');

let emailVerified = false;

verifyEmailBtn.addEventListener('click', (e) => {
    e.preventDefault();
    emailError.textContent = '';
    
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
        emailError.textContent = 'Email is required';
        return;
    }
    
    if (!emailRegex.test(email)) {
        emailError.textContent = 'Please enter a valid email address';
        return;
    }
    
    // Show verification status
    verificationStatus.style.display = 'block';
    verifyEmailBtn.disabled = true;
    verifyEmailBtn.textContent = 'Email Sent';
});

confirmCodeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    codeError.textContent = '';
    
    const code = verificationCode.value.trim();
    
    if (!code) {
        codeError.textContent = 'Please enter verification code';
        return;
    }
    
    if (code.length !== 6) {
        codeError.textContent = 'Verification code must be 6 digits';
        return;
    }
    
    // Simulate verification (in real app, validate on server)
    if (code === '123456') {
        emailVerified = true;
        verificationStatus.style.display = 'none';
        verifiedStatus.style.display = 'flex';
        emailInput.disabled = true;
        verifyEmailBtn.style.display = 'none';
    } else {
        codeError.textContent = 'Invalid verification code';
    }
});

document.getElementById('resendCode').addEventListener('click', (e) => {
    e.preventDefault();
    verificationCode.value = '';
    codeError.textContent = '';
});

// Clear error messages on input
const inputs = document.querySelectorAll('input[type="email"], input[type="text"], input[type="tel"], input[type="number"]');
inputs.forEach(input => {
    input.addEventListener('input', () => {
        const errorId = input.id + 'Error';
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.textContent = '';
        }
    });
});

passwordInput.addEventListener('input', () => {
    document.getElementById('passwordError').textContent = '';
    updatePasswordStrength();
});

confirmPasswordInput.addEventListener('input', () => {
    document.getElementById('confirmPasswordError').textContent = '';
});

// Password strength indicator
function updatePasswordStrength() {
    const password = passwordInput.value;
    const strengthIndicator = document.getElementById('passwordStrength');
    
    if (password.length === 0) {
        strengthIndicator.className = 'password-strength';
        return;
    }
    
    let strength = 0;
    
    // Check length
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    
    // Check uppercase
    if (/[A-Z]/.test(password)) strength++;
    
    // Check lowercase
    if (/[a-z]/.test(password)) strength++;
    
    // Check numbers
    if (/[0-9]/.test(password)) strength++;
    
    // Check special characters
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    strengthIndicator.className = 'password-strength';
    if (strength < 3) {
        strengthIndicator.classList.add('weak');
    } else if (strength < 5) {
        strengthIndicator.classList.add('medium');
    } else {
        strengthIndicator.classList.add('strong');
    }
}

// Form submission
document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Reset all error messages
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const gender = document.querySelector('input[name="gender"]:checked');
    const age = document.getElementById('age').value;
    const grade = document.getElementById('grade').value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const termsChecked = document.getElementById('terms').checked;
    
    let isValid = true;
    
    // Email validation
    if (!emailVerified) {
        emailError.textContent = 'Please verify your email first';
        isValid = false;
    }
    
    // First name validation
    if (!firstName) {
        document.getElementById('firstNameError').textContent = 'First name is required';
        isValid = false;
    } else if (firstName.length < 2) {
        document.getElementById('firstNameError').textContent = 'First name must be at least 2 characters';
        isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(firstName)) {
        document.getElementById('firstNameError').textContent = 'First name can only contain letters';
        isValid = false;
    }
    
    // Last name validation
    if (!lastName) {
        document.getElementById('lastNameError').textContent = 'Last name is required';
        isValid = false;
    } else if (lastName.length < 2) {
        document.getElementById('lastNameError').textContent = 'Last name must be at least 2 characters';
        isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(lastName)) {
        document.getElementById('lastNameError').textContent = 'Last name can only contain letters';
        isValid = false;
    }
    
    // Phone validation
    if (!phone) {
        document.getElementById('phoneError').textContent = 'Phone number is required';
        isValid = false;
    } else if (!/^[\d\s\-\+\(\)]+$/.test(phone) || phone.replace(/\D/g, '').length < 10) {
        document.getElementById('phoneError').textContent = 'Please enter a valid phone number';
        isValid = false;
    }
    
    // Gender validation
    if (!gender) {
        document.getElementById('genderError').textContent = 'Please select your gender';
        isValid = false;
    }
    
    // Age validation
    if (!age) {
        document.getElementById('ageError').textContent = 'Age is required';
        isValid = false;
    } else if (age < 5 || age > 120) {
        document.getElementById('ageError').textContent = 'Age must be between 5 and 120';
        isValid = false;
    }
    
    // Grade validation
    if (!grade) {
        document.getElementById('gradeError').textContent = 'Please select a grade';
        isValid = false;
    }
    
    // Password validation
    if (!password) {
        document.getElementById('passwordError').textContent = 'Password is required';
        isValid = false;
    } else if (password.length < 8) {
        document.getElementById('passwordError').textContent = 'Password must be at least 8 characters';
        isValid = false;
    } else if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
        document.getElementById('passwordError').textContent = 'Password must contain uppercase, lowercase, and numbers';
        isValid = false;
    }
    
    // Confirm password validation
    if (!confirmPassword) {
        document.getElementById('confirmPasswordError').textContent = 'Please confirm your password';
        isValid = false;
    } else if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').textContent = 'Passwords do not match';
        isValid = false;
    }
    
    // Terms validation
    if (!termsChecked) {
        document.getElementById('termsError').textContent = 'You must agree to the terms and conditions';
        isValid = false;
    }
    
    if (!isValid) {
        return;
    }
    
    // Disable button and show loading state
    const submitBtn = this.querySelector('.signup-btn');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Creating Account...';
    
    // Simulate API call
    setTimeout(() => {
        console.log('Signup data:', {
            email: emailInput.value,
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            gender: gender.value,
            age: age,
            grade: grade
        });
        
        // Success animation with sliding transition
        submitBtn.style.background = '#00D084';
        submitBtn.textContent = '✓ Account Created!';
        
        // Redirect after 2 seconds with sliding transition
        setTimeout(() => {
            document.querySelector('.signup-wrapper').style.animation = 'slideOut 0.6s ease-in forwards';
            setTimeout(() => {
                alert('Account created successfully! Redirecting to login...');
                window.location.href = 'index.html';
            }, 600);
        }, 2000);
    }, 1500);
});
