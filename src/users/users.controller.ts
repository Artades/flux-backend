import {
  Controller,
  Get,
  Patch,
  UseGuards,
  Body,
  Param,
  Query,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guards';
import { UserId } from '../decorators/user-id.decorator';

import { UpdateUserBioDto } from './dto/update-user-bio.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileStorage } from './storage';

@Controller('users')
@ApiTags('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  getMe(@UserId() id: number) {
    return this.usersService.findById(id);
  }

  @Get('/')
  getUserByNickName(@Query('nickName') nickName: string) {
    return this.usersService.getUserByNickName(nickName);
  }

  @Get('/:nickName/links')
  getUserLinksByNickName(@Param('nickName') nickName: string) {
    return this.usersService.getLinksByNickName(nickName);
  }

  @Patch('/:userId/bio')
  updateBio(
    @Param('userId') userId: number,
    @Body() updateUserDto: UpdateUserBioDto,
  ) {
    const { bio } = updateUserDto;
    return this.usersService.updateBio(userId, bio);
  }

  @Patch('/:userId/avatar')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: fileStorage,
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        avatar: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  updateAvatar(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 })],
      }),
    )
    avatar: Express.Multer.File,
    @Param('userId') userId: number,
  ) {
    return this.usersService.updateAvatar(userId, avatar);
  }
}
