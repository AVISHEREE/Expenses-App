import { Router } from "express";
import { userSignup , userSignin , updateUserDetails , deleteUserFromDb , logOut } from "../controller/user.controller.js";
import { verifyJwtToken } from "../middleware/verifyJwtToken.js";
const router = Router();

router.get('/dashboard',verifyJwtToken,(req,res)=>{
    res.send("user page")
});

router.route('/signup').post(userSignup);
router.route('/signin').get(userSignin);
router.route('/update-user').put(verifyJwtToken,updateUserDetails);
router.route('/delete-user').delete(verifyJwtToken,deleteUserFromDb);
router.route('/logout').post(verifyJwtToken,logOut);


export {router as userRoutes};