import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    default: 'artemtest@gmail.com',
  })
  email: string;

  @ApiProperty({
    default: 'Артем Галай',
  })
  fullName: string;

  @ApiProperty({
    default: '12345',
  })
  password: string;

  @ApiProperty({
    default: 'ivgam',
  })
  nickName: string;

  @ApiProperty({
    default: 'Developer',
  })
  activity: string;

  @ApiProperty({
    default: false,
  })
  isPrime: boolean;

  @ApiProperty({
    default: 'There is no bio yet',
  })
  bio: string;
  @ApiProperty({
    default: 'male',
  })
  gender: string;
  @ApiProperty({
    default: '01.04.2002',
  })
  dateOfBirth: Date;
}
