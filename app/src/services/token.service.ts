import { JwtPayload } from "jsonwebtoken";

export default interface TokenService {
    signAccessToken(payload: JwtPayload): string;
    
    verifyAccessToken(token: string): string | JwtPayload;
} 