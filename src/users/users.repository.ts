import { User } from './user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { User as UserModel } from './user.model';

export class UsersRepository {
    constructor(
        @InjectModel(User)
        private usersEntity: typeof User
    ) {}

    getAllUsers = async () => this.usersEntity.findAll();

    createUser = async (userData: UserModel) => this.usersEntity.create({ ...userData });

    findUserByUserName = async (userName: string) =>
        this.usersEntity.findOne({
            where: {
                userName,
                deletedAt: null,
                isActive: true
            }
        });
}
