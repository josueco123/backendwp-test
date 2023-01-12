import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Driver extends Model<Driver>{

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true
    })
    id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    avalible: boolean;

}
