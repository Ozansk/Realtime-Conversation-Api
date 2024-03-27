import {
    Table,
    Model,
    Column,
    PrimaryKey,
    AutoIncrement,
    DataType,
    AllowNull,
    Default,
    ForeignKey,
    BelongsTo
} from 'sequelize-typescript';
import { date as dateHelper } from '../../helpers';
import { User } from '../users/user.entity';

@Table({
    tableName: 'Messages',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
})
export class Message extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataType.STRING)
    userNumber: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    conversationNumber: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    text: string;

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
