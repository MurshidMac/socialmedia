module.exports.validateRegisterInput = (
    username,
    email,
    password,
    confirmpassword
) => {
    const errors = {};
    if (username.trim() === '') {
        errors.username = 'Username must not be empty';
    }
    if (password === '') {
        errors.username = 'Password must not be empty';
    } else if (password !== confirmpassword) {
        errors.confirmpassword = 'Passwords must match'
    }
    if (email.trim() === '') {
        errors.username = 'Email must not be empty';
    } else {
        const regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!email.match(regEx)) {
            errors.email = 'Email must be a valid address'
        }
    }
    if (confirmpassword === '') {
        errors.confirmpassword = 'Confirm password must not be empty';
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

module.exports.validateLoginInput = (email, password) => {
    const errors = {};
    if (email.trim() === '') {
        errors.username = 'Email must not be empty';
    } else {
        const regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!email.match(regEx)) {
            errors.email = 'Email must be a valid address'
        }
    }
    if (password.trim() === '') {
        errors.password = 'Password must not be empty';
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}