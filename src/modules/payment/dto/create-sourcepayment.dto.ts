import { IsNotEmpty } from "class-validator";

export class CreateSourcePaymentDto {

    @IsNotEmpty()
    readonly userId: number;
    @IsNotEmpty()
    readonly token_wp: string;
    @IsNotEmpty()
    readonly type: string;
    @IsNotEmpty()
    readonly sourceId: string;
  
}
