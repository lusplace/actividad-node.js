import { hashPassword, verifyPassword } from "./password.service";
import { AppError } from "../errors/AppError";
import * as userRepository from "../repositories/user.repository";
import { User } from "../models/User.model";
import TokenService from "./token.service";

//import * as refreshTokenService from "./refreshToken.service.js";

export default class AuthService{
    private tokenService: TokenService;

    constructor(tokenService: TokenService){
        this.tokenService = tokenService;
    }

    async register({ firstName, lastName, email, password, username, role}: {
        firstName: string, 
        lastName: string, 
        email: string,
        password: string,
        username: string,
        role: string}) {

        const existing = await userRepository.getUserByEmail(email);
        if (existing) {
            throw new AppError("El email ya está registrado", 409);
        }

        const passwordHash = await hashPassword(password);
        const user = await userRepository.insertUser(
            firstName, 
            lastName,
            email, 
            passwordHash,
            username,
            role) as unknown as User;

        const accessToken = await this.tokenService.signAccessToken({ sub: String(user?.id), role: user?.role });
        //const refreshToken = await refreshTokenService.issueRefreshToken(user.id);

        return {
            user
            , accessToken
            //, refreshToken
        };
    }

    async login({ email, password }: {email: string, password: string}) {
        const user = (await userRepository.getUserByEmail(email));
        if(!user || !(await verifyPassword(password, user.password))) {
            throw new AppError("Credenciales inválidas", 401);
        }
        
        const accessToken = await this.tokenService.signAccessToken({ sub: String(user.id) , role: user.role });
        //const refreshToken = await refreshTokenService.issueRefreshToken(user.id);
        return {
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username
            },
            accessToken
            //, refreshToken
        };
    }
}
