import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


export class UserController {
  constructor(private readonly userService: UserService) {}

  create(createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  findAll() {
    return this.userService.findAll();
  }


  findOne( id: string) {
    return this.userService.findOne(+id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  remove(id: string) {
    return this.userService.remove(+id);
  }

}
