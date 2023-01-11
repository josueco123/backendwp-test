import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from 'src/modules/user/entities/user.entity';

@Table
export class Driver extends Model<Driver>{

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true
    })
    id: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId: number;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    avalible: boolean;

    @BelongsTo(() => User)
    user: User;
}
