const User = require("../model/userModel");
const bcrypt = require("bcrypt");

module.exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: "Incorrect Username or Password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Incorrect Username or Password" });
        }

        // Remove sensitive data from the user object before sending the response
        const { password: userPassword, ...userData } = user.toObject();

        return res.status(200).json({ status: true, user: userData });
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
};

module.exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const usernameCheck = await User.findOne({ username });
        if (usernameCheck)
            return res.status(400).json({ message: "Username already in use" });

        const emailCheck = await User.findOne({ email });
        if (emailCheck)
            return res.status(400).json({ message: "Email already in use" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email,
            username,
            password: hashedPassword,
        });

        // Remove sensitive data from the user object before sending the response
        const { password: userPassword, ...userData } = user.toObject();
        
        return res.status(201).json({ status: true, user: userData });
    } catch (error) {
        next(error);
    }
};

module.exports.getAllUsers = async (req,res,next)=>{
    try {
        const users = await User.find({_id: {$ne : req.params.id}}).select([
            "email",
            "username",
            "avatarImage",
            "_id",
        ]);

        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

module.exports.setAvatar = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const avatarImage = req.body.image; 
        const userData = await User.findByIdAndUpdate(
            userId,
            {
                isAvatarImageSet: true,
                avatarImage,
            },
            { new: true }
        );

        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            isSet: userData.isAvatarImageSet,
            image: userData.avatarImage,
        });
    } catch (error) {
        next(error);
    }
};

module.exports.logOut = (req, res, next) => {
    try {
        // Check if user id is provided in the request parameters
        if (!req.params.id) {
            return res.status(400).json({ msg: "User id is required" });
        }
        // Remove user from online users (assuming onlineUsers is defined elsewhere)
        onlineUsers.delete(req.params.id);
        // Send a success response with status code 200
        return res.status(200).send();
    } catch (error) {
        // Pass any errors to the error handling middleware
        next(error);
    }
};
