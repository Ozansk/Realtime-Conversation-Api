import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { ConversationService } from './conversation.service';

@Injectable()
export class ConversationGuard implements CanActivate {
    constructor(private readonly conversationService: ConversationService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const request = context.switchToHttp().getRequest();
            const conversationData = await this.conversationService.getConversationByNumber(
                request?.query?.conversationNumber
            );
            if (conversationData.owner !== request?.user?.userNumber) {
                throw new UnauthorizedException('The conversation can only be closed by the owner!');
            }
            return true;
        } catch (error) {
            throw new ForbiddenException(error.message || 'session expired! Please sign In');
        }
    }
}
