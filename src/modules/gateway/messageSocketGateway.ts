import { OnModuleInit } from '@nestjs/common';
import { MessageBody, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ namespace: 'messages' })
export class MessageSocketGateway implements OnModuleInit {
    @WebSocketServer()
    server: Server;

    onModuleInit() {
        this.server.on('connection', (socket) => {
            console.log(socket.id);
            console.log('Socket connected!');
        });
    }

    newUserMessage(
        @MessageBody() messageData: { userNumber: string; conversationNumber: string; text: string; createdAt: Date }
    ) {
        this.server.emit(`conversation:${messageData.conversationNumber}`, {
            userNumber: messageData.userNumber,
            text: messageData.text,
            createdAt: messageData.createdAt
        });
    }
}
