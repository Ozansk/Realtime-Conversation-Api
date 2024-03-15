import {
    Table,
    Model,
    Column,
    PrimaryKey,
    AutoIncrement,
    DataType,
    Unique,
    AllowNull,
    Default,
    BelongsTo,
    ForeignKey
} from 'sequelize-typescript';
import { date as dateHelper } from '../helpers';
import { User } from '../users/user.entity';

@Table({
    tableName: 'Conversation',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
})
export class Conversation extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataType.STRING)
    owner: string;

    @Unique
    @AllowNull(false)
    @Column(DataType.STRING)
    conversationNumber: string;

    @Default(false)
    @Column(DataType.BOOLEAN)
    isActive: boolean;

    @Default(() => dateHelper.nowDateWithToDate())
    @Column(DataType.DATE)
    createdAt: Date;

    @Default(() => dateHelper.nowDateWithToDate())
    @Column(DataType.DATE)
    updatedAt: Date;

    @BelongsTo(() => User, {
        targetKey: 'userNumber'
    })
    user?: User;
}
