import { IsNotEmpty } from "class-validator";

export class CreateRideDto {

    @IsNotEmpty()
    readonly userId: number;

    @IsNotEmpty()
    readonly driverId: number;

    readonly distance: number;
    
    readonly price: number;
  
    readonly time: number;

    @IsNotEmpty()
    readonly finished: boolean;

    @IsNotEmpty()
    readonly latitud_start: string;

    @IsNotEmpty()
    readonly longitud_start: string;

    readonly latitud_end: string;

    readonly longitud_end: string;

}
