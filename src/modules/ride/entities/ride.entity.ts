import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
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
        type: DataType.INTEGER,
        allowNull: true,
    })
    price: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    distance: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    time: number;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    finished: boolean;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    latitud_start: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    longitud_start: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    latitud_end: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    longitud_end: string;

    @BelongsTo(() => User)
    user: User;
}
