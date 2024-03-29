import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import baseConfig from '../../baseConfig';
import { Cache } from 'cache-manager';
interface UserPayload {
    userNumber: string;
    userName: string;
    exp?: number;
}

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        @Inject(CACHE_MANAGER)
        private cacheManager: Cache
    ) {}

    login = async (loginData: LoginDto) => {
        const user = await this.checkUserWithPassword(loginData.userName, loginData.password);
        if (!user) {
            throw new Error('User not found!');
        }
        return this.createTokenAndSession({ userName: user.userName, userNumber: user.userNumber });
    };

    checkUserWithPassword = async (userName: string, password: string) => {
        const user = await this.usersService.findUserByUserName(userName);
        if (!user) {
            throw new Error('Username or password is wrong.');
        }
        const passwordCheck = await user.comparePasswords(password, user.password);
        if (!passwordCheck) {
            throw new Error('Username or password is wrong.');
        }
        return user;
    };

    createTokenAndSession = async (data: UserPayload) => {
        const token = this.signToken({
            userName: data.userName,
            userNumber: data.userNumber
        } as UserPayload);
        const expireDate = new Date(1000 * this.jwtService.verify<UserPayload>(token)!.exp!);
        await this.setTokenToRedis(data.userNumber, token);
        return { token, expireDate };
    };

    getTokenFromRedis = async (userNumber: string) => this.cacheManager.get(`authentication:${userNumber}:token`);

    setTokenToRedis = async (userNumber: string, token: string) =>
        this.cacheManager.set(`authentication:${userNumber}:token`, token, 3600);

    signToken = (data: UserPayload) =>
        this.jwtService.sign(data, {
            expiresIn: baseConfig.JWT_EXPIRE_TIME
        });

    verifyJwtAndCheckSessionFromRedis = async (token: string) => {
        const verifyResult = this.jwtService.verify<UserPayload>(token);
        if (!verifyResult) {
            throw new Error('Token is not verify!');
        }
        const userTokenFromRedis = await this.getTokenFromRedis(verifyResult.userNumber);
        if (userTokenFromRedis !== token) {
            throw new Error('Not current session!');
        }
        return verifyResult;
    };

    getAndSetUserData = async (userNumber: string): Promise<any> => {
        const userData = await this.cacheManager.get(`authentication:${userNumber}:data`);
        if (userData) {
            return userData;
        }
        const userInfo = await this.usersService.findUserByUserNumber(userNumber);
        if (!userInfo) {
            throw new Error('User info not found!');
        }
        await this.cacheManager.set(`authentication:${userNumber}:data`, userInfo, 3600);
        return userInfo;
    };
}
