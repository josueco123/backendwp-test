
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';


export class DriverController {
  constructor(private readonly driverService: DriverService) {}

 
  create(createDriverDto: CreateDriverDto) {
    return this.driverService.create(createDriverDto);
  }

  findAll() {
    return this.driverService.findAll();
  }

  findAvalibles() {
    return "test";
  }


  findOne(id: string) {
    return this.driverService.findOne(+id);
  }

  update( id: string, updateDriverDto: UpdateDriverDto) {
    return this.driverService.update(+id, updateDriverDto);
  }

  remove(id: string) {
    return this.driverService.remove(+id);
  }
}
