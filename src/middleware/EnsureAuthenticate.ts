import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"

interface IPayload {
    sub: string
}

export function ensureAuthenticate(
    request: Request,
    response: Response, 
    next: NextFunction
){
    const authToken = request.headers.authorization

    if (!authToken) {
        return response.status(401).json({
            errorCode: "token.invalid"
        })
    }

    //Bearer 8561567845245489412465465"
    //[0] Bearer"
    //[1] 8561567845245489412465465
    const[,token] = authToken.split(" ")

    try{
        const {sub} = verify(token, process.env.JWT_SECRET) as IPayload //retorn id do usuário - se for inválido ele gera uma exceção
        request.user_id = sub
        return next() 
    } catch(err) {
        return response.status(401).json({
            errorCode: "token.expired"
        })
    }
    
}