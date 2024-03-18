import { Controller, Req, Post, Put, Query, UseGuards, Body } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { Request } from 'express';
import { CloseConversationDto, CreateConversationDto } from './dto';
import { AuthGuard } from '../auth/auth.guard';
import { ConversationGuard } from './conversation.guard';

@UseGuards(AuthGuard)
@Controller('conversation')
export class ConversationController {
    constructor(private conversationService: ConversationService) {}

    @Post()
    async createConversation(@Body() createConversationDto: CreateConversationDto, @Req() req: Request) {
        const conversationData = await this.conversationService.createConversation(
            createConversationDto,
            req?.user?.userNumber
        );
        return {
            conversationNumber: conversationData.conversationNumber
        };
    }

    @UseGuards(ConversationGuard)
    @Put('close')
    async closeConversation(@Query() closeConversationDto: CloseConversationDto) {
        await this.conversationService.closeConversation(closeConversationDto.conversationNumber);
    }
}
