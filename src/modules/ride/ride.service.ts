import { Injectable, Inject } from '@nestjs/common';
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

  findOne(id: number) {
    return `This action returns a #${id} ride`;
  }

  update(id: number, updateRideDto: UpdateRideDto) {
    return `This action updates a #${id} ride`;
  }

  remove(id: number) {
    return `This action removes a #${id} ride`;
  }
}
