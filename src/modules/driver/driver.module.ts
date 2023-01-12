import { Module } from '@nestjs/common';
import { DriverService } from './driver.service';
import { driverProviders } from './driver.providers';

@Module({
  providers: [DriverService, ...driverProviders]
})
export class DriverModule {}
