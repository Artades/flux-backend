import { Controller, Post, Body, Param, Get, Delete, UseGuards } from '@nestjs/common';
import { LinksService } from './links.service';
import { LinkEntity } from './entities/link.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateLinkDto } from './dto/create-link.dto';
import { UserId } from 'src/decorators/user-id.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guards';

@Controller('links')
@ApiTags('links')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class LinksController {
  constructor(private linksService: LinksService) {}

  @Post()
  async create(@Body() link: CreateLinkDto, @UserId() userId: number) {
    return await this.linksService.create(link, userId);
  }

  @Get()
  async findAll(@UserId() userId: number): Promise<LinkEntity[]> {
    return this.linksService.getLinks(userId);
  }
}
