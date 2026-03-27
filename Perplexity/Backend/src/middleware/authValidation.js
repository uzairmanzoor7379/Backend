// import { body, validationResult } from 'express-validator';

// // Middleware to handle validation errors
// export const handleValidationErrors = (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({
//             success: false,
//             message: 'Validation failed',
//             errors: errors.array()
//         });
//     }
//     next();
// };

// // Validation rules for user registration
// export const validateRegister = [
//     body('email')
//         .isEmail()
//         .normalizeEmail()
//         .withMessage('Please provide a valid email'),
//     body('password')
//         .isLength({ min: 6 })
//         .withMessage('Password must be at least 6 characters long'),
//     body('username')
//         .trim()
//         .isLength({ min: 2 })
//         .withMessage('Name must be at least 2 characters long'),
//     handleValidationErrors
// ];

// // Validation rules for user login
// export const validateLogin = [
//     body('email')
//         .isEmail()
//         .normalizeEmail()
//         .withMessage('Please provide a valid email'),
//     body('password')
//         .notEmpty()
//         .withMessage('Password is required'),
//     handleValidationErrors
// ];

import { body, validationResult } from 'express-validator';

// ── Error Handler ────────────────────────────────────────────────────────────

export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const formatted = errors.array({ onlyFirstError: true }).reduce((acc, err) => {
            acc[err.path] = err.msg;
            return acc;
        }, {});

        return res.status(422).json({
            success: false,
            message: 'Validation failed',
            errors: formatted
        });
    }
    next();
};

// ── Reusable Field Rules ─────────────────────────────────────────────────────

const emailField = (field = 'email') =>
    body(field)
        .trim()
        .notEmpty().withMessage('Email is required')
        .bail()
        .isEmail().withMessage('Must be a valid email address')
        .bail()
        .normalizeEmail()
        .isLength({ max: 254 }).withMessage('Email must not exceed 254 characters');

const passwordField = (field = 'password', minLength = 8) =>
    body(field)
        .notEmpty().withMessage('Password is required')
        .bail()
        .isLength({ min: minLength }).withMessage(`Password must be at least ${minLength} characters`)
        .bail()
        .isLength({ max: 128 }).withMessage('Password must not exceed 128 characters')
        .bail()
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
        .bail()
        .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
        .bail()
        .matches(/\d/).withMessage('Password must contain at least one number')
        .bail()
        .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain at least one special character');

const usernameField = (optional = false) => {
    const field = body('username').trim();
    const chain = optional ? field.optional() : field.notEmpty().withMessage('Username is required').bail();
    return chain
        .isLength({ min: 2, max: 30 }).withMessage('Username must be between 2 and 30 characters')
        .bail()
        .matches(/^[a-zA-Z0-9_.-]+$/).withMessage('Username can only contain letters, numbers, underscores, hyphens, and dots')
        .bail()
        .not().matches(/^[._-]|[._-]$/).withMessage('Username cannot start or end with a special character');
};

// ── Register ─────────────────────────────────────────────────────────────────

export const validateRegister = [
    usernameField(),

    emailField(),

    passwordField('password', 8),

    body('confirmPassword')
        .notEmpty().withMessage('Please confirm your password')
        .bail()
        .custom((value, { req }) => {
            if (value !== req.body.password)
                throw new Error('Passwords do not match');
            return true;
        }),

    handleValidationErrors
];

// ── Login ─────────────────────────────────────────────────────────────────────

export const validateLogin = [
    emailField(),

    body('password')
        .notEmpty().withMessage('Password is required')
        .bail()
        .isLength({ max: 128 }).withMessage('Invalid credentials'), // avoids leaking constraints on login

    handleValidationErrors
];

// ── Update Profile ────────────────────────────────────────────────────────────

export const validateUpdateProfile = [
    usernameField(true), // optional = true

    emailField().optional(),

    handleValidationErrors
];

// ── Change Password ───────────────────────────────────────────────────────────

export const validateChangePassword = [
    body('currentPassword')
        .notEmpty().withMessage('Current password is required'),

    body('newPassword')
        .notEmpty().withMessage('New password is required')
        .bail()
        .custom((value, { req }) => {
            if (value === req.body.currentPassword)
                throw new Error('New password must be different from the current password');
            return true;
        }),

    passwordField('newPassword', 8), // ✅ correctly targets newPassword field

    body('confirmNewPassword')
        .notEmpty().withMessage('Please confirm your new password')
        .bail()
        .custom((value, { req }) => {
            if (value !== req.body.newPassword)
                throw new Error('Passwords do not match');
            return true;
        }),

    handleValidationErrors
];