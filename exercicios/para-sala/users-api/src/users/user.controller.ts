import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(
    @Body()
    createUserDto: CreateUserDto,
  ) {
    return this.userService.createUser(
      createUserDto.name,
      createUserDto.email,
      createUserDto.password,
      createUserDto.cpf,
      createUserDto.userType,
      createUserDto.superPassword,
    );
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Get()
  listUsers() {
    return this.userService.listUsers();
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(
      id,
      updateUserDto.name,
      updateUserDto.email,
      updateUserDto.password,
      updateUserDto.cpf,
      updateUserDto.userType,
      updateUserDto.superPassword,
    );
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
