import { Injectable } from '@nestjs/common';
import { RideService } from './ride.service';
import { DriverService } from '../driver/driver.service';

@Injectable()
export class RideController {
  constructor(
    private readonly rideService: RideService,
    private readonly driverService: DriverService
    ) {}

  async getDriverAvalible(){
    const driver = await this.driverService.findDriverAvalible();
    return driver.id;
  }

  async createRide(data) {
    const driverId = parseInt(await this.getDriverAvalible());
    const ride = {
      userId: data.userId,
      driverId: driverId,
      finished: false,
      distance: null,
      price: null,
      time: null,
      latitud_start: data.latitud,
      longitud_start: data.longitud,
      latitud_end: null,
      longitud_end: null
    };
    return this.rideService.create(ride);
  }

  calculatePrice(distance: number, time : number) : number {
    const price = (distance*1000) + (time*200) > 3500 ? (distance * 1000) + (time*200) : 3500;
    return price;
  }


 
}
