import { Body, Controller, Post, UseGuards, Req, Query, Get, Param, Put } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto, GetMessagesByConversationNumberDto, EditMessageParamDto, EditMessageBodyDto } from './dto';
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

    @Put('edit/:id')
    async editMessageById(
        @Param() editMessageParamDto: EditMessageParamDto,
        @Body() editMessageBodyDto: EditMessageBodyDto,
        @Req() req: Request
    ) {
        return this.messagesService.editMessageById({
            id: editMessageParamDto.id,
            text: editMessageBodyDto.text,
            userNumber: req?.user?.userNumber
        });
    }
}
