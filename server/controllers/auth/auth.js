const bcrypt = require('bcryptjs')
const { body } = require('express-validator')
const fs = require('fs')
const path = require('path')
const validator = require("validator")
const xss = require('xss')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const authModel = require('../../model/auth/auth')
const countryModel = require('../../model/country/country')


const registerValidation = [

    body('first_name')
        .trim()
        .notEmpty().withMessage('First name is required')
        .isLength({ min: 2, max: 255 }).withMessage('First name must be between 2–255 characters'),

    body('last_name')
        .trim()
        .notEmpty().withMessage('Last name is required')
        .isLength({ min: 2, max: 255 }).withMessage('Last name must be between 2–255 characters'),

    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email')
        .normalizeEmail(),

    body('mobile_number')
        .trim()
        .notEmpty().withMessage('Mobile number is required')
        .isMobilePhone('any').withMessage('Invalid mobile number'),

    body('country_id')
        .notEmpty().withMessage('Country is required')
        .isInt().withMessage('Country must be numeric'),

    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
        .matches(/[A-Z]/).withMessage('Password must contain at least 1 uppercase letter')
        .matches(/[a-z]/).withMessage('Password must contain at least 1 lowercase letter')
        .matches(/[0-9]/).withMessage('Password must contain at least 1 number')
        .matches(/[@$!%*?&]/).withMessage('Password must contain at least 1 special character'),

    body('confirm_password')
        .notEmpty().withMessage('Confirm password is required')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match')
            }
            return true
        }),
    // body('agree')
    //     .notEmpty().withMessage('Agreement is required')
    //     .custom(value => {
    //         if (value !== 'true' && value !== true) {
    //             throw new Error('You must accept terms and conditions')
    //         }
    //         return true
    //     })
]

const loginValidation = [
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email')
        .normalizeEmail(),

    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
]

const SALT_ROUNDS = 12

const deleteFile = (filePath) => {
    if (filePath && fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
    }
}

const authController = {

    register: async (req, res) => {
        try {
            const {
                first_name,
                last_name,
                email,
                mobile_number,
                password,
                confirm_password,
                address,
                city,
                state,
                country_id,
                zipcode
            } = req.body

            if (!validator.isEmail(email)) {
                return res.status(200).json({
                    success: false,
                    message: "Invalid email"
                })
            }

            const emailExists = await authModel.findByUsername(email)
            if (emailExists) {
                return res.status(200).json({
                    success: false,
                    message: "Email already exists"
                })
            }

            const mobileExists = await authModel.findByMobile(mobile_number)
            if (mobileExists) {
                return res.status(200).json({
                    success: false,
                    message: "Mobile already exists"
                })
            }

            const countryData = await countryModel.getById(Number(country_id))

            if (!countryData) {
                return res.status(200).json({
                    success: false,
                    message: "Invalid country selected"
                })
            }

            if(password !== confirm_password){
                return res.status(200).json({
                    success: false,
                    message: "Password and Confirm Password Doest not match."
                })
            }

            const cleanPassword = xss(password)

            const hashedPassword = await bcrypt.hash(cleanPassword, SALT_ROUNDS)

            const data = {
                user_name: email,
                password: hashedPassword,
                old_password: hashedPassword,
                first_name,
                last_name,
                mobile_number,
                address,
                city,
                state,
                country: countryData.country_name,
                zipcode,
                status: '1',
                is_verified: '0',
                login_type: 'normal',
                ip_address: req.ip,
                account_created_date: new Date(),
                actkey: ''
            }

            await authModel.create(data)

            return res.status(201).json({
                success: true,
                message: 'Registration successful'
            })

        } catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message || 'Registration failed'
            })
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body

            const safeLogin = xss(email)

            let user = await authModel.findByUsername(safeLogin)

            if (!user) {
                user = await authModel.findByMobile(safeLogin)
            }

            if (!user) {
                return res.status(200).json({
                    success: false,
                    message: 'Invalid credentials'
                })
            }

            if (user.status !== '1') {
                return res.status(200).json({
                    success: false,
                    message: 'Account inactive'
                })
            }

            if (user.is_blocked === '1') {
                return res.status(200).json({
                    success: false,
                    message: 'Account is blocked'
                })
            }

            const match = await bcrypt.compare(password, user.password)
            if (!match) {
                return res.status(200).json({
                    success: false,
                    message: 'Invalid credentials'
                })
            }

            const accessToken = jwt.sign(
                {
                    id: user.customers_id,
                    email: user.user_name
                },
                process.env.ACCESS_SECRET,
                { expiresIn: process.env.ACCESS_EXPIRES_IN || '2d' }
            )

            const refreshToken = jwt.sign(
                {
                    id: user.customers_id,
                    type: 'refresh'
                },
                process.env.REFRESH_SECRET,
                { expiresIn: process.env.REFRESH_EXPIRES_IN || '10d' }
            )

            return res.status(200).json({
                success: true,
                message: 'Login successful',
                accessToken,
                refreshToken
            })

        } catch (err) {
            return res.status(500).json({
                success: false,
                message: 'Login failed'
            })
        }
    },

    logout: async (req, res) => {
        try {
            return res.status(201).json({
                success: true,
                message: 'Logged out successfully. Please remove the token from your client.'
            })
        } catch (err) {
            console.error(err)
            return res.status(201).json({
                success: false,
                message: 'Logout failed'
            })
        }
    },

    refreshToken: async (req, res) => {
        try {
            const refreshToken = req.headers['x-refresh-token']

            if (!refreshToken) {
                return res.status(201).json({
                    success: false,
                    message: 'Refresh token required'
                })
            }

            let decoded
            try {
                decoded = jwt.verify(
                    refreshToken,
                    process.env.REFRESH_SECRET
                )
            } catch (err) {
                return res.status(201).json({
                    success: false,
                    message: 'Invalid or expired refresh token'
                })
            }

            if (decoded.type !== 'refresh') {
                return res.status(201).json({
                    success: false,
                    message: 'Invalid token type'
                })
            }

            const userId = decoded.id
            const appId = decoded.appId

            let user = null

            if (userId) {
                user = await authModel.findById(userId)
            }

            if (!user && appId) {
                user = await authModel.findByAppId(appId)
            }

            if (!user) {
                return res.status(201).json({
                    success: false,
                    message: 'Unauthorized'
                })
            }

            if (user.is_blocked === '1') {
                return res.status(201).json({
                    success: false,
                    message: 'User blocked'
                })
            }

            const ACCESS_SECRET = process.env.ACCESS_SECRET
            const ACCESS_EXPIRES_IN = process.env.ACCESS_EXPIRES_IN || '2d'

            const REFRESH_SECRET = process.env.REFRESH_SECRET
            const REFRESH_EXPIRES_IN = process.env.REFRESH_EXPIRES_IN || '10d'

            const newAccessToken = jwt.sign(
                {
                    id: user.customers_id,
                    appId: user.app_id,
                    type: 'access'
                },
                ACCESS_SECRET,
                { expiresIn: ACCESS_EXPIRES_IN }
            )

            const newRefreshToken = jwt.sign(
                {
                    id: user.customers_id,
                    appId: user.app_id,
                    deviceId: user.device_id,
                    type: 'refresh'
                },
                REFRESH_SECRET,
                { expiresIn: REFRESH_EXPIRES_IN || '10d' }
            )

            return res.status(201).json({
                success: true,
                access_token: newAccessToken,
                refresh_token: newRefreshToken
            })

        } catch (err) {
            console.error(err)
            return res.status(201).json({
                success: false,
                message: 'Internal server error'
            })
        }
    },

    getUser: async (req, res) => {
        try {
            const userId = req.user?.id
            const appId = req.user?.appId

            if (!userId || !appId) {
                return res.status(201).json({
                    success: false,
                    message: 'Unauthorized'
                })
            }

            let user = null
            if (userId) {
                user = await authModel.findById(userId)
            }

            if (!user && appId) {
                user = await authModel.findByAppId(appId)
            }

            if (!user) {
                return res.status(201).json({
                    success: false,
                    message: 'User not found.'
                })
            }

            let image_url = ''
            if (user.customer_photo) {
                const host = req.get("host").split(":")[0]
                const baseURL = `${req.protocol}://${host}`
                image_url = `${baseURL}/poultry_farming/uploaded_files/customer_images/${user.customer_photo}`
            }

            const cleanUser = {}
            for (let key in user) {
                if (user[key] === null || user[key] === undefined) {
                    cleanUser[key] = ""
                } else if (typeof user[key] === "number") {
                    cleanUser[key] = user[key].toString()
                } else {
                    cleanUser[key] = user[key]
                }
            }

            cleanUser.image_url = image_url

            return res.status(201).json({
                success: true,
                data: cleanUser
            })

        } catch (err) {
            console.error(err)
            return res.status(201).json({
                success: false,
                message: 'Internal server error.'
            })
        }
    },

    updateUser: async (req, res) => {
        try {
            const userId = req.user?.id
            const appId = req.user?.appId

            if (!userId || !appId) {
                return res.status(201).json({
                    success: false,
                    message: 'Unauthorized'
                })
            }

            let user = null
            if (userId) {
                user = await authModel.findById(userId)
            }

            if (!user && appId) {
                user = await authModel.findByAppId(appId)
            }

            if (!user) {
                return res.status(201).json({
                    success: false,
                    message: 'User not found.'
                })
            }

            const updateData = {}

            if (req.body.farm_name) updateData.farm_name = xss(req.body.farm_name)
            if (req.body.contact_person) updateData.first_name = xss(req.body.contact_person)
            if (req.body.mobile_number) updateData.mobile_number = xss(req.body.mobile_number)

            if (req.body.location_id) {
                const location = await locationModel.getById(Number(req.body.location_id))
                if (!location) {
                    return res.status(201).json({ success: false, message: 'Invalid location.' })
                }
                updateData.location_id = location.location_id
                updateData.location = location.location_name
            }

            if (req.file) {
                const customer_photo = req.file.filename
                updateData.customer_photo = customer_photo

                const user = await authModel.findById(userId)
                if (user?.customer_photo) {
                    const uploadDir = path.join(__dirname, "../../../poultry_farming/uploaded_files/customer_images", user.customer_photo)
                    if (fs.existsSync(uploadDir)) {
                        fs.unlinkSync(uploadDir)
                    }
                }
            }

            if (Object.keys(updateData).length === 0) {
                return res.status(201).json({ success: false, message: 'No fields provided to update' })
            }

            await authModel.update(userId, updateData)

            return res.status(201).json({ success: true, message: 'Profile updated successfully' })
        } catch (err) {
            console.error(err)
            if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path)
            return res.status(201).json({ success: false, message: 'Internal server error' })
        }
    },

    deleteUser: async (req, res) => {
        try {
            const userId = req.user?.id
            const appId = req.user?.appId

            if (!userId || !appId) {
                return res.status(201).json({
                    success: false,
                    message: 'Unauthorized'
                })
            }

            let user = null
            if (userId) {
                user = await authModel.findById(userId)
            }

            if (!user && appId) {
                user = await authModel.findByAppId(appId)
            }

            if (!user) {
                return res.status(201).json({
                    success: false,
                    message: 'User not found.'
                })
            }

            if (user.customer_photo) {
                const filePath = path.join(
                    'C:/Users/weblink/Desktop/Poultry_Farm/poultry_farming/uploaded_files/customer_images',
                    user.customer_photo
                )
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath)
                }
            }

            await authModel.delete(userId)

            return res.status(201).json({
                success: true,
                message: 'User deleted successfully'
            })
        } catch (err) {
            console.error(err)
            return res.status(201).json({
                success: false,
                message: 'Internal server error'
            })
        }
    },

    forgotPassword: async (req, res) => {
        try {
            const { email } = req.body

            if (!email) {
                return res.status(201).json({
                    success: false,
                    message: 'Email is required'
                })
            }

            const safeEmail = xss(email)

            if (!email || !validator.isEmail(email)) {
                deleteFile(uploadedFilePath)
                return res.status(201).json({
                    success: false,
                    message: "Invalid email format"
                })
            }

            const user = await authModel.findByUsername(safeEmail)

            if (!user) {
                return res.status(201).json({
                    success: true,
                    message: 'User not found with the provided email.',
                    email: safeEmail
                })
            }

            if (user.is_blocked === '1' || user.status !== '1') {
                return res.status(201).json({
                    success: false,
                    message: 'Account is inactive or blocked'
                })
            }

            const resetToken = crypto.randomBytes(32).toString('hex')

            await authModel.updateResetToken(
                user.customers_id,
                resetToken
            )

            return res.status(201).json({
                success: true,
                message: 'Password reset email has been sent to the provided email.',
                email: user.user_name
            })

        } catch (err) {
            console.error('Forgot Password Error:', err)
            return res.status(201).json({
                success: false,
                message: 'Internal server error'
            })
        }
    },

    resetPasswordByEmail: async (req, res) => {
        try {
            const { email, password, confirm_password } = req.body

            if (!email || !password || !confirm_password) {
                return res.status(201).json({
                    success: false,
                    message: 'All fields are required'
                })
            }

            if (password !== confirm_password) {
                return res.status(201).json({
                    success: false,
                    message: 'Password and confirm password do not match'
                })
            }

            const safeEmail = xss(email)

            const user = await authModel.findByUsername(safeEmail)

            if (!user) {
                return res.status(201).json({
                    success: false,
                    message: 'User not found'
                })
            }

            if (user.status !== '1' || user.is_blocked === '1') {
                return res.status(201).json({
                    success: false,
                    message: 'Account is inactive or blocked'
                })
            }

            const hashedPassword = await bcrypt.hash(password, 10)

            await authModel.updatePassword(
                user.customers_id,
                hashedPassword
            )

            return res.status(201).json({
                success: true,
                message: 'Password reset successfully'
            })

        } catch (err) {
            console.error('Reset Password (Email) Error:', err)
            return res.status(201).json({
                success: false,
                message: 'Internal server error'
            })
        }
    },

    resetPasswordFromProfile: async (req, res) => {
        try {
            const userId = req.user?.id
            const appId = req.user?.appId

            if (!userId || !appId) {
                return res.status(201).json({
                    success: false,
                    message: 'Unauthorized'
                })
            }

            let user = null
            if (userId) {
                user = await authModel.findById(userId)
            }

            if (!user && appId) {
                user = await authModel.findByAppId(appId)
            }

            if (!user) {
                return res.status(201).json({
                    success: false,
                    message: 'User not found.'
                })
            }

            const {
                old_password,
                new_password,
                confirm_new_password
            } = req.body

            if (!old_password || !new_password || !confirm_new_password) {
                return res.status(201).json({
                    success: false,
                    message: 'All fields are required'
                })
            }

            if (new_password !== confirm_new_password) {
                return res.status(201).json({
                    success: false,
                    message: 'New password and confirm password do not match'
                })
            }

            if (!user) {
                return res.status(201).json({
                    success: false,
                    message: 'User not found'
                })
            }

            const isMatch = await bcrypt.compare(
                old_password,
                user.password
            )

            if (!isMatch) {
                return res.status(201).json({
                    success: false,
                    message: 'Old password is incorrect'
                })
            }

            const hashedPassword = await bcrypt.hash(new_password, 10)

            await authModel.updatePassword(
                userId,
                hashedPassword
            )

            return res.status(201).json({
                success: true,
                message: 'Password updated successfully'
            })

        } catch (err) {
            console.error('Reset Password (Profile) Error:', err)
            return res.status(201).json({
                success: false,
                message: 'Internal server error'
            })
        }
    }
}

module.exports = { authController, registerValidation, loginValidation }