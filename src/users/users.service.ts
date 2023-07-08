import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { createReadStream, createWriteStream } from 'fs';
import { join } from 'path';

@Injectable()
export class UsersService {
  findAll() {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  async findByEmail(email: string) {
    return this.repository.findOneBy({
      email,
    });
  }

  async findById(id: number) {
    return this.repository.findOneBy({
      id,
    });
  }

  async getUserByNickName(nickName: string) {
    return this.repository.findOneBy({ nickName });
  }

  async getLinksByNickName(nickName: string) {
    const user = await this.repository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.links', 'link')
      .where('user.nickName = :nickName', { nickName })
      .getOne();

    if (!user) {
      throw new Error('User not found');
    }

    return user.links || [];
  }

  create(dto: CreateUserDto) {
    return this.repository.save(dto);
  }

  async updateBio(userId: number, newBio: string) {
    const user = await this.repository.findOneBy({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }
    user.bio = newBio;
    return this.repository.save(user);
  }

  async updateAvatar(userId: number, avatar: Express.Multer.File) {
    const user = await this.repository.findOneBy({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }
    const avatarPath = `${avatar.filename}`;
    user.avatar = avatarPath;
    return this.repository.save(user);
  }
}
