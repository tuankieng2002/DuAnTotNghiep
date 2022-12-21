const userController = require('../components/users/controller');
var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
//middleware
const { isAuthenticatedUser } = require('../middleware/auth');

//Login User
router.post('/login', async function (req, res, next) {
    try {
        const { email, password } = req.body;
        const user = await userController.login(email, password);
        if (user === 'Email không đúng!') {
            return res.status(200).json({
                message: user
            });
        } else {
            if (!user) {
                return res.status(200).json({
                    message: 'Mật khẩu không đúng'
                });
            } else {
                if (user.block) {
                    return res.status(200).json({
                        message: 'Tài khoản của bạn bị khóa!'
                    });
                } else {
                    const token = jwt.sign({ user: user }, 'DOANTOTNGHIEP');
                    const d = new Date();
                    d.setTime(d.getTime() + (1 * 24 * 60 * 60 * 1000));
                    let expires = "expires=" + d.toUTCString();
                    res.status(200).cookie("token", token, + expires).json({
                        "access_token": token,
                        "user": user
                    });
                }
            }
        }
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

//Register User
router.post('/register', async function (req, res, next) {
    const { body } = req;
    body.image = 'https://doantotnghiepfood.herokuapp.com/images/image-1669710148885-709896471-avatar.jpg';
    const result = await userController.register(body);
    if (result) {
        res.status(200).json({ status: true });
    } else {
        res.status(200).json({ status: false });
    }
});

//Logout User
router.get('/logout', [isAuthenticatedUser], async function (req, res, next) {
    try {
        res.clearCookie('token').status(200).json({
            success: true,
            message: 'Đăng xuất thành công'
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// //Update profile
// router.put('/update/info', isAuthenticatedUser, userController.updateProfile);

//Get user Details
router.get('/profile/:id', [isAuthenticatedUser], async function (req, res, next) {
    const { id } = req.params;
    const user = await userController.findById(id);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(400).json({ message: "Id not found" });
    }
});

//chưa hoàn thiện
router.post('/reset-password', async function (req, res, next) {
    const { body } = req;
    const user = await userController.updatePassword(body._id, body);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(200).json({ message: "Mật khẩu không đúng!" });
    }
});

module.exports = router;