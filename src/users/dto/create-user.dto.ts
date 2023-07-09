import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    default: 'test@gmail.com',
  })
  email: string;

  @ApiProperty({
    default: 'Test Galay',
  })
  fullName: string;

  @ApiProperty({
    default: '12345',
  })
  password: string;

  @ApiProperty({
    default: 'test',
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
