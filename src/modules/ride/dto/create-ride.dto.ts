import { IsNotEmpty } from "class-validator";

export class CreateRideDto {

    @IsNotEmpty()
    readonly userId: number;

    @IsNotEmpty()
    readonly driverId: number;

    @IsNotEmpty()
    readonly finished: boolean;

    @IsNotEmpty()
    readonly latitud_start: string;

    @IsNotEmpty()
    readonly longitud_start: string;


}
