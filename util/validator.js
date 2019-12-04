module.exports.validateRegisterInput = (
    username,
    email,
    password,
    confirmPassword
) => {
    const errors = {};
    if (username.trim() === '') {
        errors.username = 'username must not be empty'
    }
    else {
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if (!email.match(regEx))
            errors.email = 'email not valid'

    }
    if (password.trim() === '') {
        errors.password = 'password must not be empty'
    }
    else if (password !== confirmPassword) {
        errors.confirmPassword = 'passwords must match'
    }
    return { errors, valid: Object.keys(errors).length < 1 }
}

module.exports.validateLoginInput = (username, password) => {
    const errors = {};
    if (username.trim() === '') {
        error.username = 'username must not be empty'
    }
    if (password.trim() === '') {
        error.password = 'password must not be empty'
    }

    return { errors, valid: Object.keys(errors).length < 1 }
}