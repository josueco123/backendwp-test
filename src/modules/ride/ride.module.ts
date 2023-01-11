import { Module } from '@nestjs/common';
import { RideService } from './ride.service';
import { RideController } from './ride.controller';
import { rideProviders } from './ride.providers';

@Module({
  controllers: [RideController],
  providers: [RideService, ...rideProviders]
})
export class RideModule {}
