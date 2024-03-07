import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { UsersRepository } from 'users/users.repository';
import { LoginDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import baseConfig from '../baseConfig';
import { Cache } from 'cache-manager';
interface UserPayload {
    userNumber: string;
    userName: string;
    exp?: number;
}

@Injectable()
export class AuthService {
    constructor(
        private usersRepository: UsersRepository,
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
        const user = await this.usersRepository.findUserByUserName(userName);
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
}
