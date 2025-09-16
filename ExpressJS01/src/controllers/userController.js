const { get } = require("mongoose");
const {createUserService, loginService, getUserService, getMeService} = require("../services/userService");

const creatUser = async (req, res) => {
    const {name, email, password} = req.body;
    const data = await createUserService(name, email, password);
    return res.status(200).json(data);
}

const handleLogin = async (req, res) => {
    const {email, password} = req.body;
    const data = await loginService(email, password);

    return res.status(200).json(data);
}

const getUser = async (req, res) => {
    const data = await getUserService();
    return res.status(200).json(data);
}

const getAccount = async (req, res) => {
    return res.status(200).json(req.user);
}

const getMe = async (req, res) => {
    return getMeService(req, res);
}

module.exports = {
    creatUser,
    handleLogin,
    getUser,
    getAccount,
    getMe
}