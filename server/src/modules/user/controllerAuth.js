const router = require('express').Router();
const {name: modelName} = require('./model');
const jwt = require('jsonwebtoken');
const {
    checkUser,
    searchOne,
    changePassword,
    tryCreateUser,
    searchPermissions,
  } = require("./service");
const { handleValidation } = require("../../core/middlewares");
const { validateRegistration, validateUsername } = require("./request");

const register = async (req, res, next) => {
    try {
        const user = req.body;
        const savedUser = await tryCreateUser(user);
        if (!savedUser) {
            return res.status(400).json({
                status: "error",
                message: "User already exists by username or email or phone number.",
            }).send();
        }
        // log the user in
        const token = jwt.sign({
            user: savedUser?._id
        }, process.env.JWT_SECRET);
        
        return res
            .status(201).json({
                token,
                user: savedUser
            }).send();
        } catch (error) {
            return next(error);
    }
}

const login = async(req, res) => {
    if (req.body.email && req.body.password) {
        const user = await checkUser(req.body.email, req.body.password);
        if (user) {
        //   const permissions = await searchPermissions(user.roleId);
          const token = jwt.sign(
            {
              id: user._id,
              email: req.body.email,
              roleId: user.roleId,
              exp:
                Math.floor(Date.now() / 1000) +
                parseInt(process.env.JWT_EXPIRES_IN, 10),
            },
            process.env.JWT_SECRET
          );
          const { passwordHash, ...rest } = user;
            res.json({
                token,
                user: {
                    ...rest,
                    // permissions
                }
            }).send();
            return;   
        }
    }
    res.status(400).json({
        status: "error",
        message: "Invalid email or password.",
    }).send();
};

const loggedIn = (req, res) => {
    try {
        const token = getTokenFromBearer(req);
        req.token = token;
        if(!token) return res.json(false);

        jwt.verify(token, process.env.JWT_SECRET);
        
        res.send(true);
    }catch(err){
        res.json(false)
    }
};

const forgotPasswordHandler = async (req, res) => {
    if (req.body.email) {
      const user = await searchOne({ email: req.body.email }, modelName);
      if (user) {
        const newPassword = req.body.password ?? "a123"; // we will replace this and set from random string when we have the email service
        await changePassword(user, newPassword);
        res.status(200).json({
            message: "Password changed successfully.",
            }).send();
        return;
      }
    }
  
    res.status(400).json({
        status: "error",
        message: "Invalid email.",
    }).send();
  };
  
const checkUsernameHandler = async (req, res) => {
    const user = await searchOne(
        { username: req.body.username.toLowerCase() },
        modelName
    );
    if (user) {
        return res
        .status(400)
        .json({ status: "unavailable", message: "Username is taken" }).send();
    }
    return res
        .status(200)
        .json({ status: "available", message: "Username is available" }).send();
};
  
// Register
router.post('/register',  handleValidation(validateRegistration), register);

// Log in
router.post('/login', login);

router.get('/loggedIn', loggedIn);
router.post("/forgotPassword", forgotPasswordHandler);
router.post(
    "/checkUsername",
    handleValidation(validateUsername),
    checkUsernameHandler
);
  
module.exports = router;
