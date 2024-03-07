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
    BeforeCreate,
    BeforeUpdate
} from 'sequelize-typescript';
import { common as commonHelper, date as dateHelper } from '../helpers';

@Table({
    tableName: 'Users',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
})
export class User extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

    @Unique
    @AllowNull(false)
    @Column(DataType.STRING)
    userNumber: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    firstName: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    lastName: string;

    @AllowNull(false)
    @Unique
    @Column(DataType.STRING)
    userName: string;

    @Column(DataType.STRING)
    password: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    phoneNumber: string;

    @Default(false)
    @Column(DataType.BOOLEAN)
    isActive: boolean;

    @Default(() => dateHelper.nowDateWithToDate())
    @Column(DataType.DATE)
    createdAt: Date;

    @Default(() => dateHelper.nowDateWithToDate())
    @Column(DataType.DATE)
    updatedAt: Date;

    @Column(DataType.DATE)
    deletedAt: Date;

    @BeforeCreate
    @BeforeUpdate
    static async hashPassword(instance: User) {
        if (instance.password) {
            instance.password = commonHelper.generateHashForPassword(instance.password);
        }
    }

    public async comparePasswords(candidatePassword: string, hashedPassword: string) {
        return commonHelper.checkHash(candidatePassword, hashedPassword);
    }
}
