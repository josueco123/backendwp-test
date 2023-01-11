import { Controller, Get } from '@nestjs/common';
import { PaymentService } from './payment.service';


@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

    @Get('payment_method')
    paymentMethod (){
    return this.paymentService.createPaymentMethod();
    }

}