import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { User } from 'src/modules/user/entities/user.entity';
import { Driver } from 'src/modules/driver/entities/driver.entity';

@Table
export class Ride extends Model<Ride> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId: number;

    @ForeignKey(() => Driver)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    driverId: number;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    method_payment: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    price: number;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    time: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    finished: boolean;
}
