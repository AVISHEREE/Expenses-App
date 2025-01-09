import {newUser , 
        existingUserCheck , 
        getUser , 
        updateUser , 
        deleteUser} from '../database/databaseFunctions/user.functions.js'
import jwt from 'jsonwebtoken'


let refreshTokens = [];
const GenerateAccessAndRefreshToken = (user) =>{
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let jwtRefreshSeretKey = process.env.JWT_REFRESH_SECRET_KEY;
    let jwtExpiryToken = process.env.ACCESS_TOKEN_EXPIRY;
    let accessToken = jwt.sign({user},jwtSecretKey,{expiresIn:jwtExpiryToken});
    let refershToken = jwt.sign({user},jwtRefreshSeretKey);
    return {accessToken,refershToken};

}

const refreshRefreshToken = (req,res)=>{
    const refreshToken = req.body.token;
    if(!refreshToken) return res.status(401).json("You are not authenticated");
    if(!refreshTokens.includes(refreshToken)){
        return res.status(403).json("refersh token is not verified");
    }
    jwt.verify(refreshToken,process.env.JWT_REFRESH_SECRET_KEY,(err,user)=>{
        if (err) return res.status(403).json("Token is invalid");
        refreshTokens = refreshTokens.filter(token=>token !== refreshToken);
        const Token = GenerateAccessAndRefreshToken(user)
        refreshTokens.push(Token.refershToken);
        res
        .status(200)
        .json({
            accessToken:Token.accessToken,
            refreshToken:Token.refershToken
        })
    })
}

const logOut = (req,res)=>{
    const refreshToken = req.body.token
    refreshTokens = refreshTokens.filter(token => token !== refreshToken);
    res
    .status(200)
    .json("logged out");
}

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
        const Token = GenerateAccessAndRefreshToken(userData.user_id);
        refreshTokens.push(Token.refershToken);
        res
        .status(201)
        .json({
            userDetails:userData,
            accessToken:Token.accessToken,
            refreshToken:Token.refershToken
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
    deleteUserFromDb,
    logOut,
    refreshRefreshToken
}