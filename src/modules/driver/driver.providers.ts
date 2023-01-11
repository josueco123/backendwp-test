import { Driver } from "./entities/driver.entity";

export const driverProviders = [{
    provide: 'DRIVER_REPOSITORY',
    useValue: Driver,
}];