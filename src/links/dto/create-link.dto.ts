import { ApiProperty } from '@nestjs/swagger';


export class CreateLinkDto {

  
  @ApiProperty({
    default: 'Instagram',
  })
  linkName: string;

  @ApiProperty({
    default: 'https://instagram.com',
  })
  linkPath: string;

  @ApiProperty({
    default: 'https://icons8/dlsdksdls',
  })
  linkIcon: string;
}
