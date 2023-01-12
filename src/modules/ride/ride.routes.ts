import { Controller, Post, Res, Req  } from '@nestjs/common';
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

}