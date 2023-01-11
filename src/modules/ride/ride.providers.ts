import { Ride } from "./entities/ride.entity";

export const rideProviders = [{
    provide: 'RIDE_REPOSITORY',
    useValue: Ride,
}];