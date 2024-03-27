export interface Message {
    id?: number;
    userNumber: string;
    conversationNumber: string;
    text: string;
    createdAt?: Date;
    updatedAt?: Date;
}
