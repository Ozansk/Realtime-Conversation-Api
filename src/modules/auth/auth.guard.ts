import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly authService: AuthService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const request = context.switchToHttp().getRequest();
            const token = <string | undefined>(request.headers.authorization || request.headers?.Authorization);
            if (!token) {
                throw new UnauthorizedException('Token is not found!');
            }
            const pureToken = token.split(' ')[1]?.trim();
            const jwtResult = await this.authService.verifyJwtAndCheckSessionFromRedis(pureToken);
            request.user = await this.authService.getAndSetUserData(jwtResult.userNumber);
            return true;
        } catch (error) {
            throw new ForbiddenException(error.message || 'session expired! Please sign In');
        }
    }
}
