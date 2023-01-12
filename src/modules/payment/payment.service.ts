import { Injectable,Inject } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, lastValueFrom } from 'rxjs'
import { SourcePayment } from './entities/sourcePayments.entity';
import { CreateSourcePaymentDto } from './dto/create-sourcepayment.dto';

@Injectable()
export class PaymentService {

    constructor(
      private readonly httpService: HttpService,
      @Inject('PAYMENT_REPOSITORY') private readonly paymentRepository :typeof SourcePayment
      ) {}

      async getTokenCard(data) {

        const response = lastValueFrom(
          await this.httpService.post(process.env.PAYMENT_API+'tokens/cards', data,{
            headers: { 
              "Authorization": "Bearer "+process.env.WPAPI_PUBLIC_KEY 
            }
          }).pipe(map((resp) => {
            return resp.data.data.id
          })));

          return response;
      }

      async getTokenNequi (data){

        const response = lastValueFrom(
              await this.httpService.post(process.env.PAYMENT_API+'tokens/nequi', data,{
              headers: { 
                "Authorization": "Bearer "+process.env.WPAPI_PUBLIC_KEY 
              }
            }).pipe(map((resp) =>{ 
              return resp.data.data.id
            })));

        return response;
      }

      async setPaymentSource(data){

        const response = lastValueFrom(
          await this.httpService.post(process.env.PAYMENT_API+'payment_sources', data,{
          headers: { 
            "Authorization": "Bearer "+process.env.WPAPI_PRIVATE_KEY 
          }
        }).pipe(map((resp) => { return resp.data})));

        return response;

      }

      async getAceptedToken(){           

        const response = lastValueFrom(
            await this.httpService.get(process.env.PAYMENT_API+'merchants/'+ process.env.WPAPI_PUBLIC_KEY,{
              headers: { 
                "Authorization": "Bearer "+process.env.WPAPI_PUBLIC_KEY 
              }
            }).pipe(map((resp) =>{
              return resp.data.data.presigned_acceptance.acceptance_token
            })));

        return response;
      }

      async setTransaction(data){
        const response = lastValueFrom(
          await this.httpService.post(process.env.PAYMENT_API+'transactions', data,{
            headers: { 
              "Authorization": "Bearer "+process.env.WPAPI_PRIVATE_KEY 
            }
          }).pipe(map((resp) => { return resp.data}))
        );

        return response;
      }

      async findAllPaymentSoruces() : Promise<SourcePayment[]> {
        return await this.paymentRepository.findAll();
      }

      async createSourcePayment (createSourcePaymentDto: CreateSourcePaymentDto) : Promise<SourcePayment>{
        return await this.paymentRepository.create<SourcePayment>({...createSourcePaymentDto});
      }

      async findPaymentSourceByUserId(id) {
        return await this.paymentRepository.findOne({
          where: {userId: id }
        });
      }
}

 