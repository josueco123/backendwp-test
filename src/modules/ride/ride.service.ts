import { Injectable, Inject } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { CreateRideDto } from './dto/create-ride.dto';
import { UpdateRideDto } from './dto/update-ride.dto';
import { Ride } from './entities/ride.entity';

@Injectable()
export class RideService {

  constructor(@Inject('RIDE_REPOSITORY') private readonly rideRepository: typeof Ride) { }

  async create(createRideDto: CreateRideDto): Promise<Ride> {
    return await this.rideRepository.create<Ride>({...createRideDto})
  }

  findAll() {
    return `This action returns all ride`;
  }

  async findOne(id: number) {
    return await this.rideRepository.findByPk(id,{
      include: [{model : User}]
    });
  }

  async update(id: number, data){
    const [numberOfAffectedRows, [updatedRide]] = await this.rideRepository.update<Ride>({...data},{
      where: {
        id: id
      },
      returning: true
    });

    return { numberOfAffectedRows, updatedRide };
  }

  remove(id: number) {
    return `This action removes a #${id} ride`;
  }
}
