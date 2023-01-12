import { Controller, Post, Req, Get, Res, Param } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { Request, Response } from 'express';

@Controller('payment')
export class PaymentRoutes {
    constructor(private readonly paymentController: PaymentController) {}

    @Post('source-nequi')
    async createSourceNequi (@Req() request: Request, @Res() resp : Response){
        const data = request.body;

        try {
            const response = await this.paymentController.createSourceNequi(data);
            return resp.send({ mensaje: "Payment Source created successfully", data: response});
        } catch (error) {
            return resp.status(500).send({ mensaje: error})
        }
        
    }

    @Post('source-card')
    async createSourceCard (@Req() request: Request, @Res() resp : Response){
        const data = request.body;

        try {
            const response = await this.paymentController.createSourceCard(data);
            return resp.send({ mensaje: "Guardado con exito", data: response});
        } catch (error) {
            return resp.status(500).send({ mensaje: error})
        }
        
    }

    @Get('Source')
    async getPaymentSource(){
        return await this.paymentController.listPaymets();
    }

    @Get('transaction/:id')
    async setTransaction(@Param('id') id: string,  @Res() resp : Response){
        try {
            const response = await this.paymentController.createTransaction(id);
            return resp.send({ mensaje: "Payment Source created successfully", data: response});
        } catch (error) {
            
        }
       
    }

}