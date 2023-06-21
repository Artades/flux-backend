import { Controller, Get, Patch, UseGuards, Body, Param, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guards';
import { UserId } from '../decorators/user-id.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserBioDto } from './dto/update-user-bio.dto';

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
}
