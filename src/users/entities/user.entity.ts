import { LinkEntity } from 'src/links/entities/link.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  fullName: string;
  @Column()
  nickName: string;
  @Column()
  activity: string;
  @Column()
  isPrime: boolean;
  @Column()
  bio: string;

  @OneToMany(() => LinkEntity, (link) => link.user)
  links: LinkEntity[];
}
