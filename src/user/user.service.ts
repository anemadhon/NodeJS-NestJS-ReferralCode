import { Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  create(body: UserDto) {
    const data = {
      ...body,
      id: `user-${nanoid(16)}`,
    };

    return { data };
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }
}
