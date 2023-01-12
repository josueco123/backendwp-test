import { Injectable } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Injectable()
export class PaymentController {

  constructor(private readonly paymentService: PaymentService) {}
    
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

}