import { IsNotEmpty } from "class-validator";

export class CreateRideDto {

    @IsNotEmpty()
    readonly userId: number;

    @IsNotEmpty()
    readonly driverId: number;

    @IsNotEmpty()
    readonly method_payment: string;

    @IsNotEmpty()
    readonly price: number;

    readonly time: string;

    @IsNotEmpty()
    readonly finished: boolean;
}
