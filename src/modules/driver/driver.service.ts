import { Injectable, Inject } from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Driver } from './entities/driver.entity';

@Injectable()
export class DriverService {

  constructor(@Inject('DRIVER_REPOSITORY') private readonly driverRepository: typeof Driver) { }

  create(createDriverDto: CreateDriverDto) {
    return 'This action adds a new driver';
  }

  async findDriverAvalible() : Promise<Driver>{
    return await this.driverRepository.findOne({
      where:{ avalible: true }
    })
  }

  async findAll() : Promise<Driver[]> {
    return await this.driverRepository.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} driver`;
  }

  update(id: number, updateDriverDto: UpdateDriverDto) {
    return `This action updates a #${id} driver`;
  }

  remove(id: number) {
    return `This action removes a #${id} driver`;
  }
}
