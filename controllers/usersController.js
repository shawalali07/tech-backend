import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'


//@desc  Register user
//@route  POST /api/users
//@access  Public
export const registerUser = asyncHandler(async (req, res) => {
    //it will give us the data that we sent from the body in postman
    console.log(req.body)
    const { name, email, password } = req.body
    //res.send({email, password})\
    const userExists = await User.findOne({ email })//get the email from db
    
    if(userExists) {
        res.status(400) //bad request
        throw new Error('User already exists')
    }
    //create new user and will trigger save method of mongoose that is defined in userModel
    const user = await User.create({
        name,
        email,
        password
    })

    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        }) //means something is created

        console.log(user);
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
}) 

