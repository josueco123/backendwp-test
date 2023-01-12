import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PaymentRoutes } from './payment.routes';
import { HttpModule } from '@nestjs/axios'
import { paymentProviders } from './payment.provider';
import { RideService } from '../ride/ride.service';
import { rideProviders } from '../ride/ride.providers';


@Module({
    imports: [HttpModule],
    controllers: [PaymentRoutes],
    providers: [PaymentService, PaymentController, RideService,
       ...paymentProviders, ...rideProviders]
  })

export class PaymentModule {}