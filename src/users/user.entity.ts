import { Table, Model, Column, PrimaryKey, AutoIncrement, DataType, Unique, AllowNull } from 'sequelize-typescript';

@Table({
    tableName: 'User',
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
}
