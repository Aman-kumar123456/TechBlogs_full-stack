const jwt = require('jsonwebtoken');
const User = require('../models/user.model')

const authmiddleware = {
    verifyToken: async (req, res, next) => {
        const token = req.cookies.Amanblogs;
        if (!token) {
            return res.status(401).json({
                message: "Access Denied.. Provide token"
            })
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);



            // req.user=decoded;




            // fetch userdetails
            const user = await User.findById(decoded.id);
            if (!user) {
                return res.status(400).json({
                    message: "User not found ",

                });
            }
            req.user = user;
            next();
        } catch (error) {
            return res.status(400).json({
                message: "Invalid Token"
            })
        }
    },





    authorization: (role) => {
        return (req, res, next) => {
            if (req.user.role !== role) {
                return res.status(403).json({
                    message: "Access denied",
                })
            }
            next();
        }
    }
}
module.exports = authmiddleware;