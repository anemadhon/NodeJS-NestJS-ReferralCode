import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller({ path: 'users', version: '1' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  create(@Body() body: UserDto) {
    return this.userService.create(body);
  }

  @Get('me')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
}
