const delay = (req, res, next) => {
    setTimeout(() => {
        if(req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            console.log("Token:", token);
        }
        next();
    }, 2000); // Delay of 2 seconds
}

module.exports = delay;