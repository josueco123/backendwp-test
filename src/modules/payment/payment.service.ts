import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs'

@Injectable()
export class PaymentService {

    constructor(private readonly httpService: HttpService) {}

    async createPaymentMethod(){           

        return this.httpService.get(process.env.PAYMENT_API+'merchants/pub_test_ob8KAtd1mIU7VIF44eTkdLVz2pel8KUa',{
          headers: { 
            "Authorization": "Bearer pub_test_ob8KAtd1mIU7VIF44eTkdLVz2pel8KUa" 
          }
        }).pipe(map((resp) => resp.data))
       
      }
}

 