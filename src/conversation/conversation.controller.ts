import { Controller, Req, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { Request } from 'express';
import { CloseConversationDto } from './dto';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('conversation')
export class ConversationController {
    constructor(private conversationService: ConversationService) {}

    @Post()
    async createConversation(@Req() req: Request) {
        const conversationData = await this.conversationService.createConversation(req?.user?.userNumber);
        return {
            conversationNumber: conversationData.conversationNumber
        };
    }

    @Put('close')
    async closeConversation(@Query() closeConversationDto: CloseConversationDto) {
        await this.conversationService.closeConversation(closeConversationDto.conversationNumber);
    }
}
