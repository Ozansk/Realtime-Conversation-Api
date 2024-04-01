import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, HydratedDocument } from 'mongoose';

export type EditedMessageHistoryDocument = HydratedDocument<EditedMessageHistory>;

@Schema()
export class EditedMessageHistory {
    @Prop()
    messageId: number;

    @Prop()
    userNumber: string;

    @Prop()
    oldText: string;

    @Prop()
    newText: string;

    @Prop({ default: now() })
    createdAt: Date;

    @Prop({ default: now() })
    updatedAt: Date;
}

export const EditedMessageHistorySchema = SchemaFactory.createForClass(EditedMessageHistory);
