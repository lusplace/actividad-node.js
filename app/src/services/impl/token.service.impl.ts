import jwt, { JwtPayload } from 'jsonwebtoken';
import TokenService from '../token.service';

export default class TokenServiceImpl implements TokenService{

    private options: jwt.SignOptions;
    constructor(private jwtSecret : string,
        jwtExpiration: number){
            if(!jwtSecret) {
                throw new Error("JWT_SECRET is not defined");
            }
            this.jwtSecret = jwtSecret;
            this.options = { expiresIn: jwtExpiration} as jwt.SignOptions;
        }

    signAccessToken(payload: JwtPayload) {
        return jwt.sign(payload, this.jwtSecret, this.options);
    }

    verifyAccessToken(token: string) {
        try {
            return jwt.verify(token, this.jwtSecret);
        } catch (err) {
            throw new Error("Invalid token");
        }
    }
}
