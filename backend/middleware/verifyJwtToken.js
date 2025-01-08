import jwt from 'jsonwebtoken'
const verifyJwtToken = (req,res,next)=>{
    const seceretKey = process.env.JWT_SECRET_KEY;
    try {
        const autHeader = req.headers.authorization;
        if(autHeader){
            const token = autHeader.split(' ')[1];
            jwt.verify(token,seceretKey,(err,payload)=>{
                if (err) {
                    return res
                             .status(403)
                             .json("Token is not valid")
                }
                req.payload = payload;
                next();
            });
        }
        else{
            res
            .status(401)
            .json("You are not authorized")
        }
    } catch (err) {
        return err
    }
}

export {
    verifyJwtToken
}