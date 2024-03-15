import { Body, Controller, Post, UseGuards, Req, Query, Get } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto, GetMessagesByConversationNumberDto } from './dto';
import { AuthGuard } from '../auth/auth.guard';
import { Request } from 'express';

@UseGuards(AuthGuard)
@Controller('messages')
export class MessagesController {
    constructor(private messagesService: MessagesService) {}

    @Post()
    async createMessage(@Body() createMessageDto: CreateMessageDto, @Req() req: Request) {
        await this.messagesService.createMessage(createMessageDto, req?.user?.userNumber);
    }

    @Get()
    async getMessagesByConversationNumber(
        @Query() getMessagesByConversationNumberDto: GetMessagesByConversationNumberDto
    ) {
        return this.messagesService.getMessagesByConversationNumber(getMessagesByConversationNumberDto);
    }
}
