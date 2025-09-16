require('dotenv').config();
const User = require('../models/user');
const brcypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

const createUserService = async (name, email, password) => {
    try {
        //check user exist
        const user = await User.findOne({email});
        if (user) {
            console.log("User already exists");
            return null;
        }

        //hash password
        const hashedPassword = await brcypt.hash(password, saltRounds)
        //Save user to db
        let result = await User.create({
            name: name,
            email: email,
            password: hashedPassword,
            role: "User"
        })
        return result;
    } catch (e) {
        console.log(e);
        return null;
    }
}

const loginService = async (email,password) => {
    try {
        const user = await User.findOne({email: email});
        if(user){
            //compare password
            const isMatchPassword = await brcypt.compare(password, user.password);
            if(isMatchPassword){
                return {
                    EC:2,
                    EM: "Email/Password is invalid"
                }
            } else {
                //create and accsess token
                const playload = {
                    email: user.email,
                    name: user.name
                }

                const access_token = jwt.sign (
                    playload,
                    process.env.JWT_SECRET,
                    {expiresIn: process.env.JWT_EXPIRE}
                )
                return {
                    EC: 0,
                    access_token,
                    user: {
                        email: user.email,
                        name: user.name
                    }
                };
            }
        } else {
            return {
                EC: 1,
                EM: "Email/Password is invalid"
            }
        }
    } catch (e){
        console.log(e);
        return null;
    }
}

const getUserService = async() => {
    try{
        let result = await User.find({}).select("-password"    );
        return result;
    }catch(e){
        console.log(e);
        return null;
    }
}

const getMeService = async(req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // lấy user từ DB (để chắc chắn user còn tồn tại)
        const user = await User.findOne({ email: decoded.email }).select("email name");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.json({
            email: user.email,
            name: user.name,
        });
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

module.exports = {
    createUserService,
    loginService,
    getUserService,
    getMeService
}