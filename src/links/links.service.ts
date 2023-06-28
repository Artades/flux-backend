import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLinkDto } from './dto/create-link.dto';
import { LinkEntity } from './entities/link.entity';

@Injectable()
export class LinksService {
  constructor(
    @InjectRepository(LinkEntity)
    private linkRepository: Repository<LinkEntity>,
  ) {}

  async create(link: CreateLinkDto, userId: number) {
    return await this.linkRepository.save({
      linkName: link.linkName,
      linkPath: link.linkPath,
      linkIcon: link.linkIcon,
      user: { id: userId },
    });
  }

  async deleteLink(linkId: number, userId: number): Promise<void> {
    const result = await this.linkRepository.delete({
      id: linkId,
      user: { id: userId },
    });
    if (result.affected === 0) {
      throw new NotFoundException(`Link with ID ${linkId} not found.`);
    }
  }

  async getLinks(userId: number): Promise<LinkEntity[]> {
    const qb = this.linkRepository.createQueryBuilder('link');
    // const posts = this.postRepository.find();
    qb.where('link.userId = :userId', { userId });
    return qb.getMany();
  }
}
