const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const generateToken = (userId)=>{
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
}

const registerUser = async (req, res) => {
    try{
    const{name,email,password,profileImgUrl} =req.body
    const userExists = await User.findOne({email})
    if(userExists){
        return res.status(400).json({message: "User already exists"});
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        profileImgUrl
    });
    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        profileImgUrl: user.profileImgUrl,
        token: generateToken(user._id)
    });

    if(!name || !email || !password){
        return res.status(400).json({message: "Please fill all the fields"});
    }

}catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImgUrl: user.profileImgUrl,
            token: generateToken(user._id)
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    generateToken
};