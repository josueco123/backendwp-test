import { Injectable } from '@nestjs/common';
import { RideService } from './ride.service';
import { DriverService } from '../driver/driver.service';

interface NewRide {
  userId: number,
  latitud: string,
  longitud:string
}

interface Coodinates {
  latitude: number,
  longitude:number
}

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

 
  async createRide(data: NewRide) {
    const driverId = parseInt(await this.getDriverAvalible());
    const ride = {
      userId: data.userId,
      driverId: driverId,
      finished: false,
      latitud_start: data.latitud,
      longitud_start: data.longitud
    };
    return this.rideService.create(ride);
  }

  private calculatePrice(distance: number, time : number) : number {
    const price = (distance*1000) + (time*200) > 3500 ? (distance * 1000) + (time*200) : 3500;
    return price;
  }

  private degreesToRadians(degrees: number)  {
    var radians = (degrees * Math.PI)/180;
    return radians;
  }

  private calculateDistance(starting: Coodinates, destination:Coodinates){
    const startingLat = this.degreesToRadians(starting.latitude);
    const startingLong = this.degreesToRadians(starting.longitude);
    const destinationLat = this.degreesToRadians(destination.latitude);
    const destinationLong = this.degreesToRadians(destination.longitude);

    const radius: number = 6571;

    const distanceInKilometers: number = Math.acos(Math.sin(startingLat) * Math.sin(destinationLat) +
    Math.cos(startingLat) * Math.cos(destinationLat) *
    Math.cos(startingLong - destinationLong)) * radius;

    return Math.trunc(Math.floor(distanceInKilometers * 100) / 100);
  }

  async createUpdateObject(data){
    const ride = await this.rideService.findOne(data.ride_id);

    const destination : Coodinates = { latitude: parseInt(data.latitud), longitude: parseInt(data.longitud)}
    const start : Coodinates = { latitude: parseInt(ride.latitud_start), longitude: parseInt(ride.longitud_start)}

    const distance = this.calculateDistance(start,destination);
    const time = Math.floor(Math.random()*(100+21)+20);
    const price = this.calculatePrice(distance, time);

    const dataUpdate = {
      longitud_end: data.latitud,
      latitud_end: data.longitud,
      finished: true,
      distance: distance,
      price: price,
      time: time,

    }
    return dataUpdate;

  }
  async finishRide(data){

    const dataUpdate = await this.createUpdateObject(data);
   
    const { numberOfAffectedRows, updatedRide } = await this.rideService.update(data.ride_id, dataUpdate);

    if (numberOfAffectedRows === 0){
      return "ride not found";
    }else{
      return updatedRide;
    }

  }


 
}
