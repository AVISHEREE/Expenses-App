import {newUser , 
        existingUserCheck , 
        getUser , 
        updateUser , 
        deleteUser} from '../database/databaseFunctions/user.functions.js'
import jwt from 'jsonwebtoken'

const userSignup = async (req,res) =>{
    const {email,password,name} = req.body;
    if((email && password && name) === ""){
        res
        .status(400)
        .send("please fill all values")
    }
    else{
        const isUser = await existingUserCheck(email);
        if(isUser.length === 0){
            await newUser(email,password,name);
            const userData = await getUser(email,password);
            res
            .status(201)
            .json({
                userDetails:userData
            });
        }
        else{
            res
            .status(400)
            .json(`${email} already exists`);
        }
    }
}

const userSignin = async (req,res)=>{
    const {email,password} = req.body;
    const isUser = await existingUserCheck(email);
    if(isUser.length === 0){
        res
        .status(400)
        .json(`${email} don't exists please signUp`);
    }
    else{
        const userData = await getUser(email,password);
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        let jwtExpiryToken = process.env.ACCESS_TOKEN_EXPIRY;
        console.log(userData);
        
        const token = jwt.sign(userData,jwtSecretKey,{expiresIn:jwtExpiryToken});
        res
        .status(201)
        .json({
            accessToken:token,
            userDetails:userData
        });
    }
}

const updateUserDetails = async (req,res)=>{
    const {whatFeildToUpdate,valueToUpdate,userId} = req.body;
    const result = await updateUser(whatFeildToUpdate,valueToUpdate,userId);
    res
    .status(201)
    .json({
        updatedUser:result
    })
}

const deleteUserFromDb = async (req,res)=>{
    const {user_id} = req.body;
    const deletedUser = await deleteUser(user_id);
    res
    .status(201)
    .json({
        deletedUser
    })
}

export {
    userSignup,
    userSignin,
    updateUserDetails,
    deleteUserFromDb
}