import { Module } from '@nestjs/common';
import { DriverService } from './driver.service';
import { DriverController } from './driver.controller';
import { driverProviders } from './driver.providers';

@Module({
  controllers: [DriverController],
  providers: [DriverService, ...driverProviders]
})
export class DriverModule {}
