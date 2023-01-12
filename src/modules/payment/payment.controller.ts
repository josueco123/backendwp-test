import { Injectable } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { RideService } from '../ride/ride.service';

@Injectable()
export class PaymentController {

  constructor(
    private readonly paymentService: PaymentService,
    private readonly rideService: RideService
    ) {}
    
    async createSourceNequi (dataReq){

      const acceptance_token = await this.paymentService.getAceptedToken();

      const token = await this.paymentService.getTokenNequi({phone_number: dataReq.phone_number });
        
        const data = { 
            type: 'NEQUI', 
            token: token,
            acceptance_token: acceptance_token,
            customer_email: dataReq.email,
            userId: dataReq.user_id,
            
          };

      return this.savePaymentSource(data);

    }
    
    async createSourceCard (dataReq){

      const acceptance_token = await this.paymentService.getAceptedToken();

      const dataCard = {
        number: dataReq.number,
        cvc: dataReq.cvc,
        exp_month: dataReq.exp_month,
        exp_year: dataReq.exp_year,
        card_holder: dataReq.name,
        
      }

      const token = await this.paymentService.getTokenCard(dataCard);
        
        const data = { 
            type: 'CARD', 
            token: token,
            acceptance_token: acceptance_token,
            customer_email: dataReq.email,
            userId: dataReq.user_id,
          };

        return this.savePaymentSource(data);
    }

  
    async savePaymentSource(data){

      const response = await this.paymentService.setPaymentSource(data);

      const dataSource = {
        userId: data.userId,
        token_wp: response.data.token,
        type: response.data.type,
        sourceId: response.data.id
      }

      return await this.paymentService.createSourcePayment(dataSource);
    }

    async listPaymets(){
      return this.paymentService.findAllPaymentSoruces();
    }

    generatedReference(){
      const charts = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let reference ="";
      for (let i = 0; i < 15; i++) {
        reference += charts.charAt(Math.floor(Math.random() * charts.length));
      }

     return reference;
    }

    async dataTransaction(id){

      const reference = this.generatedReference();
      const ride = await this.rideService.findOne(id);
      const sourcePayment = await this.paymentService.findPaymentSourceByUserId(ride.userId);
      const acceptance_token = await this.paymentService.getAceptedToken();
      const payment_method = {
        type: sourcePayment.type,
        token: sourcePayment.token_wp,
        installments: 1
      }
      const customer_data = {
        phone_number: ride.user.phone_number,
        full_name: ride.user.name,
        legal_id: ride.user.document_number,
        legal_id_type: ride.user.document_type
      }
      const shipping_address = {
        address_line_1: "Calle 34 # 56 - 78",
        address_line_2: "Apartamento 502, Torre I",
        country: "CO",
        region: "Cundinamarca",
        city: "Bogotá",
        name: ride.user.phone_number,
        phone_number: ride.user.phone_number,
        postal_code: "111111"
      }
      const dataTransaction = {
        acceptance_token: acceptance_token,
        amount_in_cents: ride.price,
        currency: "COP",
        payment_method: payment_method,
        payment_source_id: parseInt(sourcePayment.sourceId),
        redirect_url: "https://mitienda.com.co/pago/resultado",
        reference: reference,
        customer_data: customer_data,
        shipping_address: shipping_address
      }

      return dataTransaction;

    }

    async createTransaction(id){

      const dataTransaction = await this.dataTransaction(id);

      return await this.paymentService.setTransaction(dataTransaction);
      //return dataTransaction;
    }

}