import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';



@Entity('links')
export class LinkEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  linkName: string;
  @Column()
  linkPath: string;
  @Column()
  linkIcon: string;

  @ManyToOne(() => UserEntity, (user) => user.links)
  user: UserEntity;

 
}
