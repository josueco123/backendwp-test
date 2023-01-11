import { Injectable, Inject } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Driver } from './entities/driver.entity';

@Injectable()
export class DriverService {

  constructor(@Inject('DRIVER_REPOSITORY') private readonly driverRepository: typeof Driver) { }

  create(createDriverDto: CreateDriverDto) {
    return 'This action adds a new driver';
  }

  async findDriversAvalibles() : Promise<Driver[]>{
    return await this.driverRepository.findAll({
      where:{ avalible: true },
      include: [{ model: User, attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }}]
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
