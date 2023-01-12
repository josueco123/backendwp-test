import { Controller, Post, Res, Req, NotFoundException  } from '@nestjs/common';
import { RideController } from './ride.controller';
import { Response, Request } from 'express';

@Controller('ride')
export class RideRoutes {

    constructor(private readonly rideController: RideController) {}

    @Post('create')
    async createRide (@Req() request: Request,  @Res() resp : Response){

        const data = request.body;

        try {
            const response = await this.rideController.createRide(data);
            return resp.send({ mensaje: "new ride created successfully", data: response});
        } catch (error) {
            return resp.status(500).send({ mensaje: error})
        }
        
    }

    @Post('finish')
    async finishRide (@Req() request: Request,  @Res() resp : Response){

        const data = request.body;

        try {
            const response = await this.rideController.finishRide(data);
            if(typeof response == 'string'){
                return resp.status(401).send({ mensaje: response});
            }else{
                return resp.send({ mensaje: "ride finished successfully", data: response});
            }
            
        } catch (error) {
            return resp.status(500).send({ mensaje: error})
        }
        
    }

}