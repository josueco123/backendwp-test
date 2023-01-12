import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PaymentRoutes } from './payment.routes';
import { HttpModule } from '@nestjs/axios'
import { paymentProviders } from './payment.provider';

@Module({
    imports: [HttpModule],
    controllers: [PaymentRoutes],
    providers: [PaymentService, PaymentController, ...paymentProviders]
  })

export class PaymentModule {}