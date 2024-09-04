////server/middlewares/mauth.js
import jwt from 'jsonwebtoken';

const mauth=async (req,res,next)=>{
    try{
    ////console.log(req.headers.authorization)    
    const token = req?.headers?.authorization?.split(" ")[1];

    const customAuth = token?.length<500;

    let decodedData;

    if (customAuth&&token){

        let decodedData = jwt.verify(token, 'vr46vr46')
        req.userId = decodedData?.id

    }
    else{
        let decodedData = jwt.decode(token)
        req.userId = decodedData?.sub
    }
next();
}
    catch(error){
        console.log(error)
    }
}

export default mauth;