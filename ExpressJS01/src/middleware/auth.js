require("dotenv").config();
const jwt = require('jsonwebtoken');
const { emit } = require("../models/user");

const auth = (req, res, next) => {
    const white_lists = ["/","/register","/login"];
    if (white_lists.find(item => '/v1/api' + item === req.originalUrl)) {
        next();
    } else {
        if (req?.headers?.authorization?.split(' ')[1]) {
            const token = req.headers.authorization.split(' ')[1];
            try {
                const decode = jwt.verify(token, process.env.JWT_SECRET);
                req.user = {
                    email: decode.email,
                    name: decode.name,
                    createBy: "hoidanit"
                }
                console.log("Token:", decode);
                next();
            } catch (e) {
                return res.status(401).json({
                    message:"Token het han hoac ko hop le"
                });
            }
        } else {
            return res.status(401).json({
                message:"Khong co quyen truy cap hoac token het han"
            });
        }
    }
    if (!token) {
        return res.status(401).json({
            EC: 1,
            EM: "No token provided"
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({
                EC: 1,
                EM: "Invalid token"
            });
        }
        req.user = user;
        next();
    });
}