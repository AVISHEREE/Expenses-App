import {
    newUser,
    existingUserCheck,
    getUser,
    updateUser,
    deleteUser
} from '../database/databaseFunctions/user.functions.js';
import jwt from 'jsonwebtoken';

let refreshTokens = [];

const GenerateAccessAndRefreshToken = (userId) => {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const jwtRefreshSecretKey = process.env.JWT_REFRESH_SECRET_KEY;
    const jwtExpiryToken = process.env.ACCESS_TOKEN_EXPIRY;
    const accessToken = jwt.sign({ userId }, jwtSecretKey, { expiresIn: jwtExpiryToken });
    const refreshToken = jwt.sign({ userId }, jwtRefreshSecretKey);
    return { accessToken, refreshToken };
};

const refreshRefreshToken = (req, res) => {
    const refreshToken = req.body.token;
    if (!refreshToken) return res.status(401).json("You are not authenticated");
    if (!refreshTokens.includes(refreshToken)) {
        return res.status(403).json("Refresh token is not valid");
    }
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json("Token is invalid");
        refreshTokens = refreshTokens.filter(t => t !== refreshToken);
        const Token = GenerateAccessAndRefreshToken(user.userId);
        refreshTokens.push(Token.refreshToken);
        res.status(200).json({
            accessToken: Token.accessToken,
            refreshToken: Token.refreshToken
        });
    });
};

const logOut = (req, res) => {
    const refreshToken = req.body.token;
    refreshTokens = refreshTokens.filter(t => t !== refreshToken);
    res.status(200).json("Logged out");
};

const userSignup = async (req, res) => {
    const { email, password, name } = req.body;

    // BUG FIX #3: Was `if((email && password && name) === "")`.
    // JS evaluates (email && password && name) as the LAST truthy value (i.e. `name`),
    // then compares that one string to "". So filling in all fields gives `name === ""`
    // which is false (correct by accident), but ANY empty field gives "" === "" which
    // is true — but the logic was backwards: it would return 400 only when ALL fields
    // were empty, never when just one was missing.
    // FIX: Use !email || !password || !name to properly catch any missing field.
    if (!email || !password || !name) {
        return res.status(400).json("Please fill all values");
    }

    try {
        const isUser = await existingUserCheck(email);
        if (isUser.length === 0) {
            await newUser(email, password, name);
            const userData = await getUser(email, password);
            const Token = GenerateAccessAndRefreshToken(userData.user_id);
            refreshTokens.push(Token.refreshToken);
            return res.status(201).json({
                userDetails: userData,
                accessToken: Token.accessToken,
                refreshToken: Token.refreshToken
            });
        } else {
            return res.status(400).json(`${email} already exists`);
        }
    } catch (err) {
        // BUG FIX #4: Was no try/catch here. If existingUserCheck() threw (DB error),
        // the whole request would crash with an unhandled rejection instead of returning
        // a proper error response.
        console.error("Signup error:", err);
        return res.status(500).json("Server error during signup. Please try again.");
    }
};

const userSignin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json("Please provide email and password");
    }

    try {
        const isUser = await existingUserCheck(email);
        if (isUser.length === 0) {
            return res.status(400).json(`${email} doesn't exist, please sign up`);
        }
        const userData = await getUser(email, password);
        if (!userData) {
            return res.status(401).json("Incorrect password");
        }
        const Token = GenerateAccessAndRefreshToken(userData.user_id);
        refreshTokens.push(Token.refreshToken);
        return res.status(200).json({
            userDetails: userData,
            accessToken: Token.accessToken,
            refreshToken: Token.refreshToken
        });
    } catch (err) {
        console.error("Signin error:", err);
        return res.status(500).json("Server error during signin. Please try again.");
    }
};

const updateUserDetails = async (req, res) => {
    const { whatFeildToUpdate, valueToUpdate, userId } = req.body;
    try {
        const result = await updateUser(whatFeildToUpdate, valueToUpdate, userId);
        return res.status(200).json({ updatedUser: result });
    } catch (err) {
        console.error("Update error:", err);
        return res.status(500).json(err.message || "Update failed");
    }
};

const deleteUserFromDb = async (req, res) => {
    const { user_id } = req.body;
    try {
        const deletedUser = await deleteUser(user_id);
        return res.status(200).json({ deletedUser });
    } catch (err) {
        console.error("Delete error:", err);
        return res.status(500).json("Delete failed");
    }
};

export {
    userSignup,
    userSignin,
    updateUserDetails,
    deleteUserFromDb,
    logOut,
    refreshRefreshToken
};