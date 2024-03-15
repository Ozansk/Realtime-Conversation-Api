export interface Conversation {
    id?: number;
    owner: string;
    conversationNumber: string;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
