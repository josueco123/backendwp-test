import { SourcePayment } from "./entities/sourcePayments.entity";

export const paymentProviders = [{
    provide: 'PAYMENT_REPOSITORY',
    useValue: SourcePayment,
}];