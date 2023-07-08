import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { UsersService } from "../users/users.service";

@ApiTags('Avatars')
@Controller('avatars')
export class AvatarsController {
  constructor(private readonly userService: UsersService) {}

  @Get(':userId')
  async getAvatar(@Param('userId') userId: number, @Res() res: Response) {
    try {
      const user = await this.userService.findById(userId);
      if (!user || !user.avatar) {
        throw new Error('Avatar not found');
      }

      const avatarPath = path.join( 'uploads', user.avatar);
      const stream = fs.createReadStream(avatarPath);
      stream.pipe(res);
    } catch (error) {
      res.status(404).send('Avatar not found');
    }
  }
}