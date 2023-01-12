import { Module } from '@nestjs/common';
import { RideService } from './ride.service';
import { RideController } from './ride.controller';
import { rideProviders } from './ride.providers';
import { RideRoutes } from './ride.routes';
import { DriverService } from '../driver/driver.service';
import { driverProviders } from '../driver/driver.providers';

@Module({
  controllers: [RideRoutes],
  providers: [RideService, DriverService, RideController,...rideProviders,...driverProviders]
})
export class RideModule {}
