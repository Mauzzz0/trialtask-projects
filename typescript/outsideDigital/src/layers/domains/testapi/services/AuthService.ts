import { Injectable } from '@nestjs/common';
import { UsersService } from './UsersService';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../constants/jwtConstants';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByFilter({ username }, null, true);

    if (user && (await compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.uid };
    return {
      token: this.jwtService.sign(payload),
      expire: jwtConstants.ttl,
    };
  }
}
