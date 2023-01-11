import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/modules/user/entities/user.entity';
import { Driver } from 'src/modules/driver/entities/driver.entity';
import { Ride } from 'src/modules/ride/entities/ride.entity';
import { databaseConfig } from './database.config';

export const databaseProviders = [{
    provide: 'SEQUELIZE',
    useFactory: async () => {
        const config = databaseConfig.development.uri;
        const sequelize = new Sequelize(config);
        sequelize.addModels([User, Driver, Ride]);
        await sequelize.sync();
        return sequelize;
    } 
    
}];